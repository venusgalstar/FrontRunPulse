/**
 * Perform a front-running attack on PULSEX
 */
const fs = require('fs');
var Web3 = require("web3");
var abiDecoder = require("abi-decoder");
var colors = require("colors");
var Tx = require("ethereumjs-tx").Transaction;
var axios = require("axios");
var BigNumber = require("big-number");
const ERC20ABI = require("./abi/ERC20.json");

var totalEearned = 0, totalTranscation = 0;

const {
  PULSEX_ROUTER_ADDRESS,
  PULSEX_FACTORY_ADDRESS,
  PULSEX_ROUTER_ABI,
  PULSEX_FACTORY_ABI,
  PULSEX_POOL_ABI,
  HTTP_PROVIDER_LINK,
  WEBSOCKET_PROVIDER_LINK,
  PULSEX_WPLS_ADDRESS,
  HTTP_PROVIDER_LINK_TEST,
  GAS_STATION,
  UPDATE_TIME_INTERVAL,
} = require("./abi/constants.js");
const { PR_K, TOKEN_ADDRESS, AMOUNT, LEVEL, LEVEL_DECIMAL, EXPLORER_API} = require("./env.js");
const { lookup } = require('dns');

const INPUT_TOKEN_ABI_REQ = ERC20ABI;
const OUT_TOKEN_ABI_REQ = ERC20ABI;

var DST_TOKEN_ADDRESS = TOKEN_ADDRESS;
var ATTACK_AMOUNT = AMOUNT;
var POOL_ADDRESS = "";

var input_token_info;
var out_token_info;
var pool_info;
var gas_price_info;

var web3;
var web3Ws;
var PULSEXRouter;
var PULSEXFactory;
var USER_WALLET;
var native_info;

var nonceNum = 200;

// one gwei
const ONE_GWEI = 1e9;

var buy_finished = false;
var sell_finished = false;
var buy_failed = false;
var sell_failed = false;
var attack_started = false;

var succeed = false;
var subscription;

async function createWeb3() {
  try 
  {
    web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER_LINK));

    web3Ws = new Web3(
      new Web3.providers.WebsocketProvider(WEBSOCKET_PROVIDER_LINK)
    );

    PULSEXRouter = new web3.eth.Contract(
      PULSEX_ROUTER_ABI,
      PULSEX_ROUTER_ADDRESS
    );

    PULSEXFactory = new web3.eth.Contract(
      PULSEX_FACTORY_ABI,
      PULSEX_FACTORY_ADDRESS
    );

    abiDecoder.addABI(PULSEX_ROUTER_ABI);

    return true;
  } 
  catch (error) {
    console.log("create web3 : ", error);
  }
}

async function loop(){
  try{

    // get pending transactions
    subscription = web3Ws.eth
    .subscribe("pendingTransactions", function (error, result) {
    })
    .on("data", async function (transactionHash) {
      try{
        let transaction = await web3.eth.getTransaction(transactionHash);
        if (
          transaction != null &&
          transaction["to"] && transaction["to"].toString().toLowerCase() == PULSEX_ROUTER_ADDRESS.toString().toLowerCase()
        ) {
          await handleTransaction(
            transaction,
            DST_TOKEN_ADDRESS,
            ATTACK_AMOUNT,
            LEVEL
          );
        }
        if (succeed) {
          console.log("The bot finished the attack.");
        }
      }catch(err){
        // console.log("Error on pendingTransactions");
      }
    });
  }catch(error){
    console.log("loop : ", error);
    loop();
  }
}

async function main() {
  try {

    console.log("DST_TOKEN_ADDRESS", DST_TOKEN_ADDRESS);
    console.log("ATTACK_AMOUNT", ATTACK_AMOUNT);

    await createWeb3();

    console.log("created web3 object");

    try {
      USER_WALLET = web3.eth.accounts.privateKeyToAccount(PR_K);
    } catch (error) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "Your private key is invalid. Update env.js with correct PR_K"
      );
    }

    await preparedAttack();

    console.log("prepared");
    await approve(gas_price_info, 2);

    web3Ws.on = function (evt) {
      console.log('evt : ', evt);
      web3Ws.send(
        JSON.stringify({
          method: "subscribe",
          topic: "transfers",
          address: user_wallet.address,l
        })
      );
      console.log("connected");
    };

    loop();
  } catch (error) {
    console.log("main : ", error);
  }
}

async function handleTransaction(
  transaction,
  out_DST_TOKEN_ADDRESS,
  amount,
  level
) {
  try {
    if (await triggersFrontRun(transaction, out_DST_TOKEN_ADDRESS, amount, level)) 
    {
      subscription.unsubscribe();
      console.log("Perform front running attack...");

      let gasPrice = await web3.eth.getGasPrice();
      gasPrice = parseInt( gasPrice / 1000000000 );

      let newGasPrice = gasPrice + 5;

      console.log("native_info", native_info);
      console.log("amount", web3.utils.toWei(amount.toString(), 'ether'));

      var realInput =
        native_info.balance > web3.utils.toWei(amount.toString(), 'ether')
          ? web3.utils.toWei(amount.toString(), 'ether')
          : native_info.balance;

      var gasLimit = (3000000).toString();

      console.log("realInput", realInput);
      console.log("gasLimit", gasLimit);
      console.log("gasPrice", gasPrice);
      console.log("newGasPrice", newGasPrice);

      await swap(
        newGasPrice,
        gasLimit,
        realInput,
        0,  //buy
        out_DST_TOKEN_ADDRESS,
        transaction
      );

      console.log(
        "Wait until the large volumn transaction is done...",
        transaction["hash"]
      );

      if (buy_failed) {
        succeed = false;
        attack_started = false;
        return;
      }

      console.log("Buy succeed:");

      await swap(
        gasPrice,
        gasLimit,
        out_token_info.balance,
        1,
        out_DST_TOKEN_ADDRESS,
        transaction
      );

      console.log("Sell succeed");
      succeed = true;
      attack_started = false;
      totalTranscation++;
    }
  } catch (error) {
    console.log("Error on handleTransaction", error);
    attack_started = false;
  }
}

async function approve(gasPrice, token_type) {
  try {
    var token_contract_info;

    if( token_type == 1 )
      token_contract_info = input_token_info;
    else 
      token_contract_info = out_token_info;

    var allowance = await token_contract_info.token_contract.methods
      .allowance(USER_WALLET.address, PULSEX_ROUTER_ADDRESS)
      .call();

    var decimals = BigNumber(10).power(token_contract_info.decimals);
    var max_allowance = BigNumber(10000000).multiply(decimals);

    allowance = BigNumber(Math.floor(Number(allowance)).toString());
    amountToSpend = max_allowance;    

    if (allowance - amountToSpend < 0) 
    {
      console.log("allowance : ", allowance.toString());
      console.log("decimals : ", decimals.toString());
      console.log("max_allowance : ", max_allowance.toString());
      var approveTX = {
        from: USER_WALLET.address,
        to: DST_TOKEN_ADDRESS,
        gas: 500000,
        gasPrice: gasPrice * ONE_GWEI,
        data: token_contract_info.token_contract.methods
          .approve(PULSEX_ROUTER_ADDRESS, max_allowance)
          .encodeABI(),
      };

      var signedTX = await USER_WALLET.signTransaction(approveTX);
      var result = await web3.eth.sendSignedTransaction(
        signedTX.rawTransaction
      );

      console.log("Sucessfully approved ", DST_TOKEN_ADDRESS);
    }
  } catch (error) {
    console.log("Error on approve ", error);
  }
}

async function updatePoolInfo() {
  try{
      var reserves = await pool_info.contract.methods.getReserves().call();
      var eth_balance;
      var token_balance;

      if(pool_info.forward) {
          eth_balance = reserves[0];
          token_balance = reserves[1];
      } else {
          eth_balance = reserves[1];
          token_balance = reserves[0];
      }

      pool_info.input_volumn = eth_balance;
      pool_info.output_volumn = token_balance;
  }catch (error) {

      console.log('Failed To Get Pair Info'.yellow);

      throw error;
  }
}

//select attacking transaction
async function triggersFrontRun(transaction, out_DST_TOKEN_ADDRESS, amount, level) {
  try {

    if (attack_started) return false;    

    let data = parseTx(transaction["input"]);
    let method = data[0];
    let params = data[1];
    
    if (method == "swapExactETHForTokens") {

      let out_min = params[0].value;
      let in_amount = transaction["value"];

      let path = params[1].value;
      let in_token_addr = path[path.length - 2];
      let out_token_addr = path[path.length - 1];

      if (out_token_addr.toString().toLowerCase() != out_DST_TOKEN_ADDRESS.toString().toLowerCase()) {
        return false;
      }

      if (in_token_addr.toString().toLowerCase() != PULSEX_WPLS_ADDRESS.toString().toLowerCase()) {
        return false;
      }

      console.log("catched transaction");

      await updatePoolInfo();

      //calculate eth amount
      var calc_eth = calc_profit(in_amount);

      if (calc_eth >= 0.0005) {
        attack_started = true;

        let log_str =
        "Attack "+input_token_info.symbol+" Volumn : Pool "+input_token_info.symbol+" Volumn" +
          "\t\t" +
          " " +
          input_token_info.symbol +
          "\t" +
          (pool_info.input_volumn / 10 ** input_token_info.decimals).toFixed(3) +
          " " +
          input_token_info.symbol;
        console.log(log_str);

        return true;
      } else {
        return false;
      }
    }
    return false;
  } catch (error) {
    console.log("Error on triggersFrontRun", error);
  }
}

async function swap(
  gasPrice,
  gasLimit,
  realInput,
  trade,
  out_DST_TOKEN_ADDRESS,
  transaction
) {
  try 
  {
    // Get a wallet address from a private key
    var from = USER_WALLET;
    var deadline;

    var swapTransaction;

    nonceNum++;
    var nonce = web3.utils.toHex(nonceNum);
    deadline = Date.now() + 100000 * 60 * 10;

    if (trade == 0) {
      //buy
      swapTransaction = PULSEXRouter.methods.swapExactETHForTokens(
        "0",
        [PULSEX_WPLS_ADDRESS, out_DST_TOKEN_ADDRESS],
        from.address,
        deadline
      );
      var encodedABI = swapTransaction.encodeABI();

      var tx = {
        value: realInput,
        // from: from.address,
        to: swapTransaction._parent._address,
        gas: gasLimit,
        gasPrice: gasPrice * ONE_GWEI,
        data: encodedABI,
        nonce: nonce,
      };

      console.log("made buy transaction");
    } 
    else {
      //sell
      console.log("swapExactTokensForETH");

      swapTransaction = PULSEXRouter.methods.swapExactTokensForETH(
        realInput.toString(),
        "0",
        [out_DST_TOKEN_ADDRESS, PULSEX_WPLS_ADDRESS],
        from.address,
        deadline
      );
      var encodedABI = swapTransaction.encodeABI();

      var tx = {
        // value: realInput,
        // from: from.address,
        to: swapTransaction._parent._address,
        gas: gasLimit,
        gasPrice: gasPrice * ONE_GWEI,
        data: encodedABI,
        nonce: nonce,
      };
    }

    var signedTx = await web3.eth.accounts.signTransaction(tx, from.privateKey);

    // console.log("made signedTx", signedTx);

    if (trade == 0) {
      let is_pending = await isPending(transaction["hash"]);
      if (!is_pending) {
        console.log(
          "The transaction you want to attack has already been completed!!!"
        );
      }
    }

    console.log("====signed transaction=====", gasLimit, gasPrice);
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    .on("transactionHash", function (hash) {
      console.log("swap : ", hash);
    })
    .on("error", function (error, receipt) {
      // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
      // console.log(error);
      // console.log(receipt);
      if (trade == 0) {
        buy_failed = true;
        console.log("Attack failed(buy)");
      } else {
        sell_failed = true;
        console.log("Attack failed(sell)");
      }
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      // console.log(confirmationNumber);
      // console.log(receipt);
      if (trade == 0) {
        buy_finished = true;
      } else {
        sell_finished = true;
      }
    });
    
  } catch (error) {
    console.log("Error on swap ", error);
  }
}

function parseTx(input) {
  if (input == "0x") return ["0x", []];
  let decodedData = abiDecoder.decodeMethod(input);
  let method = decodedData["name"];
  let params = decodedData["params"];

  return [method, params];
}

async function isPending(transactionHash) {
	try{
		return (await web3.eth.getTransactionReceipt(transactionHash)) == null;
	}
	catch(error){
    console.log("Error on isPending", error);
	}
}

async function getPoolInfo(in_DST_TOKEN_ADDRESS, out_DST_TOKEN_ADDRESS, level) {
  var log_str =
    "*****\t" +
    input_token_info.symbol +
    "-" +
    out_token_info.symbol +
    " Pair Pool Info\t*****";
  if(!attack_started) console.log(log_str.green);

  try {
    POOL_ADDRESS = await PULSEXFactory.methods
      .getPair(in_DST_TOKEN_ADDRESS, out_DST_TOKEN_ADDRESS)
      .call();
    
      console.log(POOL_ADDRESS);
    if (POOL_ADDRESS == "0x0000000000000000000000000000000000000000") {
      log_str =
        "PULSEX has no " +
        out_token_info.symbol +
        "-" +
        input_token_info.symbol +
        " pair";
        if(!attack_started)  console.log(log_str.yellow);
      return false;
    }

    var log_str = "Address:\t" + POOL_ADDRESS;
    if(!attack_started) console.log(log_str.white);

    var pool_contract = new web3.eth.Contract(PULSEX_POOL_ABI, POOL_ADDRESS);
    var reserves = await pool_contract.methods.getReserves().call();

    var token0_address = await pool_contract.methods.token0().call();

    if (token0_address === PULSEX_WPLS_ADDRESS) {
      var forward = true;
      var eth_balance = reserves[0];
      var token_balance = reserves[1];
    } else {
      var forward = false;
      var eth_balance = reserves[1];
      var token_balance = reserves[0];
    }
    
    var log_str =
      (eth_balance / 10 ** input_token_info.decimals).toFixed(5) +
      "\t" +
      input_token_info.symbol;

    if(!attack_started) console.log(log_str.white);

    var log_str =
      (token_balance / 10 ** out_token_info.decimals).toFixed(5) +
      "\t" +
      out_token_info.symbol;

    if(!attack_started) console.log(log_str.white);

    pool_info = {
      contract: pool_contract,
      forward: forward,
      input_volumn: eth_balance,
      output_volumn: token_balance,
      attack_level: level,
    };

    return true;
  } catch (error) {
    console.log("Error: Get Pair Info", error);
  }
}

async function getNonce() {
  try {
    var nonceNumV = await web3.eth.getTransactionCount(USER_WALLET.address, 'pending');
    console.log("current nonce ", nonceNumV);
    return nonceNumV;
  } catch (error) {
    console.log("get nonce num", error);
  }
}

async function getETHInfo() {
  try {
    var balance = await web3.eth.getBalance(USER_WALLET.address);
    var decimals = 18;
    var symbol = "WETH";
    totalEearned = balance;

    return {
      address: PULSEX_WPLS_ADDRESS,
      balance: balance,
      symbol: symbol,
      decimals: decimals,
    };
  } catch (error) {
    console.log("get WETH balance error", error);
  }
}

async function getTokenInfo(tokenAddr, token_abi_ask) {
  try {

    //get token info
    var token_contract = new web3.eth.Contract(ERC20ABI, tokenAddr);

    var balance = await token_contract.methods.balanceOf(USER_WALLET.address).call();
    var decimals = await token_contract.methods.decimals().call();
    var symbol = await token_contract.methods.symbol().call();

    return {
      address: tokenAddr,
      balance: balance,
      symbol: symbol,
      decimals: decimals,
      token_contract,
    };
  } catch (error) {
    console.log("Failed Token Info : ", error);
  }
}

async function preparedAttack() {
  amount = ATTACK_AMOUNT;
  level = LEVEL;

  try {

    gas_price_info = await web3.eth.getGasPrice();
    gas_price_info = parseInt(gas_price_info/1000000000);

    var log_str = "***** Your Wallet Balance *****";

    log_str = "wallet address:\t" + USER_WALLET.address;

    if(!attack_started) console.log(log_str.green);

    native_info = await getETHInfo();

    nonceNum = await getNonce();

    log_str =
      "ETH balance:\t" + web3.utils.fromWei(native_info.balance, "ether");

    if(!attack_started) console.log(log_str.green);

    if (native_info.balance < 0.0005 * 10 ** 18) {

      console.log("INSUFFICIENT NATIVE BALANCE!".yellow);

      log_str =
        "Your wallet native balance must be more 0.0005 " +
        native_info.symbol +
        "(+0.05 ETH:GasFee) ";

      if(!attack_started) console.log(log_str.red);

      return false;
    }

    input_token_info = await getTokenInfo(
      PULSEX_WPLS_ADDRESS,
      INPUT_TOKEN_ABI_REQ
    );

    out_token_info = await getTokenInfo(
      DST_TOKEN_ADDRESS,
      OUT_TOKEN_ABI_REQ
    );

    if (out_token_info === null) {
      return false;
    }

    log_str =
      (
        Number(out_token_info.balance) /
        10 ** Number(out_token_info.decimals)
      ).toFixed(5) +
      "\t" +
      out_token_info.symbol;
    if(!attack_started) console.log(log_str.white);

    //check pool info
    if (
      (await getPoolInfo(
        input_token_info.address,
        out_token_info.address,
        level
      )) == false
    )
      return false;

    console.log("input_volumn", pool_info.input_volumn);
    console.log("output_volumn", pool_info.output_volumn);

    log_str =
      "=================== Prepared to attack " +
      input_token_info.symbol +
      "-" +
      out_token_info.symbol +
      " pair ===================";
    if(!attack_started) console.log(log_str.red);
    
    log_str =
      "***** Tracking more " 
      " " +
      input_token_info.symbol +
      "  Exchange on PULSEX *****";
    if(!attack_started) console.log(log_str.green);

    setTimeout(() => {
      preparedAttack();
    }, 150000);

    return true;
  } catch (error) {
    console.log("Error on preparedAttack", error);
  }
}


function calc_profit(in_amount){

  var test_input_volume = parseFloat(web3.utils.fromWei(pool_info.input_volumn, 'ether')); 
  var test_output_volume = parseFloat(BigNumber(pool_info.output_volumn).divide(10 ** out_token_info.decimals).toString()); 
  var test_attack_amount = parseFloat(ATTACK_AMOUNT);
  var test_in_amount = parseFloat(web3.utils.fromWei(in_amount, 'ether'));

  var cap = test_input_volume * test_output_volume;
  var fee = parseFloat(0.9971);

  console.log("cap", cap);
  console.log("test_input_volume", test_input_volume);
  console.log("test_output_volume", test_output_volume);
  console.log("test_attack_amount", test_attack_amount);
  console.log("test_in_amount", test_in_amount);
  
  var x1 = test_input_volume + test_attack_amount * fee;

  console.log("x1",x1);
  
  var y1 = test_output_volume - cap / x1;

  console.log("y1",y1);
  
  var x = test_input_volume + test_attack_amount * fee + test_in_amount * fee;

  console.log("x",x);
  
  var y = cap / x1 - cap / x;

  console.log("y",y);
  
  var xf = cap / (test_output_volume - y1 - y + y1 * fee);

  console.log("xf",xf);
  
  var input_profit = test_input_volume + test_attack_amount * fee + test_in_amount * fee - xf - test_attack_amount;

  console.log("input_profit",input_profit);
  
  return input_profit;
}

function restart(dstTokenAddress, plsAttackingAmount){
  console.log("\nparameter updated\n");

  DST_TOKEN_ADDRESS = dstTokenAddress;
  ATTACK_AMOUNT = plsAttackingAmount;
  subscription.unsubscribe();
  main();
}

function getUser(){
  return USER_WALLET.address;
}

function getSourceTokenAmount()
{
  return parseFloat(web3.utils.fromWei(pool_info.input_volumn, 'ether')); 
}

function getDstTokenAmount()
{
  return parseFloat(BigNumber(pool_info.output_volumn).divide(10 ** out_token_info.decimals).toString());
}

function getOriginalAmount()
{
  return totalEearned;
}

function getSucceedTransaction()
{
  return totalTranscation;
}

module.exports = {
  main,
  restart,
  getUser,
  getSourceTokenAmount,
  getDstTokenAmount,
  getOriginalAmount,
  getSucceedTransaction,
  DST_TOKEN_ADDRESS,
  ATTACK_AMOUNT,
  POOL_ADDRESS
};

