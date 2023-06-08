
/* For TestnetV4 */
// const PULSEX_ROUTER_ADDRESS = '0xDaE9dd3d1A52CfCe9d5F2fAC7fDe164D500E50f7';
// const PULSEX_FACTORY_ADDRESS = '0xFf0538782D122d3112F75dc7121F61562261c0f7';
// const PULSEX_WPLS_ADDRESS = '0x70499adEBB11Efd915E3b69E700c331778628707';

/* For Mainnet */
const PULSEX_ROUTER_ADDRESS = '0x98bf93ebf5c380C0e6Ae8e192A7e2AE08edAcc02';
const PULSEX_FACTORY_ADDRESS = '0x1715a3e4a142d8b698131108995174f37aeba10d';
const PULSEX_WPLS_ADDRESS = '0xA1077a294dDE1B09bB078844df40758a5D0f9a27';

// Preconfigured for Etherum and PULSEX

// To use with PULSEX use infura endpoint and configure PULSEX ABIs above. Testnet
// const HTTP_PROVIDER_LINK = "https://rpc.v4.testnet.pulsechain.com";

// const WEBSOCKET_PROVIDER_LINK = "wss://rpc.v4.testnet.pulsechain.com";

// const GAS_STATION = 'https://api.debank.com/chain/gas_price_dict_v2?chain=bsc';

// Mainnet
const HTTP_PROVIDER_LINK = "https://rpc.pulsechain.com";;

const WEBSOCKET_PROVIDER_LINK = "wss://rpc.pulsechain.com";

const GAS_STATION = 'https://api.debank.com/chain/gas_price_dict_v2?chain=pls';

const UPDATE_TIME_INTERVAL = 100;

const PULSEX_FACTORY_ABI = [
    {
        "type": "constructor",
        "inputs": [
            {
                "type": "address",
                "name": "_feeToSetter",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "type": "bytes32",
                "name": "",
                "internalType": "bytes32"
            }
        ],
        "name": "INIT_CODE_PAIR_HASH",
        "inputs": [],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "name": "allPairs",
        "inputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "name": "allPairsLength",
        "inputs": [],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "address",
                "name": "pair",
                "internalType": "address"
            }
        ],
        "name": "createPair",
        "inputs": [
            {
                "type": "address",
                "name": "tokenA",
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "tokenB",
                "internalType": "address"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "name": "feeTo",
        "inputs": [],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "name": "feeToSetter",
        "inputs": [],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "name": "getPair",
        "inputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "constant": true
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "setFeeTo",
        "inputs": [
            {
                "type": "address",
                "name": "_feeTo",
                "internalType": "address"
            }
        ],
        "constant": false
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "setFeeToSetter",
        "inputs": [
            {
                "type": "address",
                "name": "_feeToSetter",
                "internalType": "address"
            }
        ],
        "constant": false
    },
    {
        "type": "event",
        "name": "PairCreated",
        "inputs": [
            {
                "type": "address",
                "name": "token0",
                "indexed": true
            },
            {
                "type": "address",
                "name": "token1",
                "indexed": true
            },
            {
                "type": "address",
                "name": "pair",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "",
                "indexed": false
            }
        ],
        "anonymous": false
    }
];

const PULSEX_POOL_ABI = [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Swap", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint112", "name": "reserve0", "type": "uint112" }, { "indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112" }], "name": "Sync", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "MINIMUM_LIQUIDITY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "burn", "outputs": [{ "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "internalType": "uint256", "name": "amount1", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getReserves", "outputs": [{ "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, { "internalType": "uint112", "name": "_reserve1", "type": "uint112" }, { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_token0", "type": "address" }, { "internalType": "address", "name": "_token1", "type": "address" }], "name": "initialize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "kLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "price0CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "price1CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "skim", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "swap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "sync", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "token0", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "token1", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }];

const PULSEX_ROUTER_ABI = [
    {
        "type": "constructor",
        "stateMutability": "nonpayable",
        "inputs": [
            {
                "type": "address",
                "name": "_factory",
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "_WPLS",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "name": "WPLS",
        "inputs": []
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "uint256",
                "name": "amountA",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountB",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "liquidity",
                "internalType": "uint256"
            }
        ],
        "name": "addLiquidity",
        "inputs": [
            {
                "type": "address",
                "name": "tokenA",
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "tokenB",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "amountADesired",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountBDesired",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountAMin",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountBMin",
                "internalType": "uint256"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "payable",
        "outputs": [
            {
                "type": "uint256",
                "name": "amountToken",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountETH",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "liquidity",
                "internalType": "uint256"
            }
        ],
        "name": "addLiquidityETH",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "amountTokenDesired",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountETHMin",
                "internalType": "uint256"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "name": "factory",
        "inputs": []
    },
    {
        "type": "function",
        "stateMutability": "pure",
        "outputs": [
            {
                "type": "uint256",
                "name": "amountIn",
                "internalType": "uint256"
            }
        ],
        "name": "getAmountIn",
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOut",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "reserveIn",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "reserveOut",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "pure",
        "outputs": [
            {
                "type": "uint256",
                "name": "amountOut",
                "internalType": "uint256"
            }
        ],
        "name": "getAmountOut",
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "reserveIn",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "reserveOut",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts",
                "internalType": "uint256[]"
            }
        ],
        "name": "getAmountsIn",
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOut",
                "internalType": "uint256"
            },
            {
                "type": "address[]",
                "name": "path",
                "internalType": "address[]"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "view",
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts",
                "internalType": "uint256[]"
            }
        ],
        "name": "getAmountsOut",
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn",
                "internalType": "uint256"
            },
            {
                "type": "address[]",
                "name": "path",
                "internalType": "address[]"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "pure",
        "outputs": [
            {
                "type": "uint256",
                "name": "amountB",
                "internalType": "uint256"
            }
        ],
        "name": "quote",
        "inputs": [
            {
                "type": "uint256",
                "name": "amountA",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "reserveA",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "reserveB",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "uint256",
                "name": "amountA",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountB",
                "internalType": "uint256"
            }
        ],
        "name": "removeLiquidity",
        "inputs": [
            {
                "type": "address",
                "name": "tokenA",
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "tokenB",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "liquidity",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountAMin",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountBMin",
                "internalType": "uint256"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "uint256",
                "name": "amountToken",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountETH",
                "internalType": "uint256"
            }
        ],
        "name": "removeLiquidityETH",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "liquidity",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountETHMin",
                "internalType": "uint256"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "uint256",
                "name": "amountETH",
                "internalType": "uint256"
            }
        ],
        "name": "removeLiquidityETHSupportingFeeOnTransferTokens",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "liquidity",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountETHMin",
                "internalType": "uint256"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "uint256",
                "name": "amountToken",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountETH",
                "internalType": "uint256"
            }
        ],
        "name": "removeLiquidityETHWithPermit",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "liquidity",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountETHMin",
                "internalType": "uint256"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            },
            {
                "type": "bool",
                "name": "approveMax",
                "internalType": "bool"
            },
            {
                "type": "uint8",
                "name": "v",
                "internalType": "uint8"
            },
            {
                "type": "bytes32",
                "name": "r",
                "internalType": "bytes32"
            },
            {
                "type": "bytes32",
                "name": "s",
                "internalType": "bytes32"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "uint256",
                "name": "amountETH",
                "internalType": "uint256"
            }
        ],
        "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "liquidity",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountETHMin",
                "internalType": "uint256"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            },
            {
                "type": "bool",
                "name": "approveMax",
                "internalType": "bool"
            },
            {
                "type": "uint8",
                "name": "v",
                "internalType": "uint8"
            },
            {
                "type": "bytes32",
                "name": "r",
                "internalType": "bytes32"
            },
            {
                "type": "bytes32",
                "name": "s",
                "internalType": "bytes32"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "uint256",
                "name": "amountA",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountB",
                "internalType": "uint256"
            }
        ],
        "name": "removeLiquidityWithPermit",
        "inputs": [
            {
                "type": "address",
                "name": "tokenA",
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "tokenB",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "liquidity",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountAMin",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountBMin",
                "internalType": "uint256"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            },
            {
                "type": "bool",
                "name": "approveMax",
                "internalType": "bool"
            },
            {
                "type": "uint8",
                "name": "v",
                "internalType": "uint8"
            },
            {
                "type": "bytes32",
                "name": "r",
                "internalType": "bytes32"
            },
            {
                "type": "bytes32",
                "name": "s",
                "internalType": "bytes32"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "payable",
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts",
                "internalType": "uint256[]"
            }
        ],
        "name": "swapETHForExactTokens",
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOut",
                "internalType": "uint256"
            },
            {
                "type": "address[]",
                "name": "path",
                "internalType": "address[]"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "payable",
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts",
                "internalType": "uint256[]"
            }
        ],
        "name": "swapExactETHForTokens",
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOutMin",
                "internalType": "uint256"
            },
            {
                "type": "address[]",
                "name": "path",
                "internalType": "address[]"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "payable",
        "outputs": [],
        "name": "swapExactETHForTokensSupportingFeeOnTransferTokens",
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOutMin",
                "internalType": "uint256"
            },
            {
                "type": "address[]",
                "name": "path",
                "internalType": "address[]"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts",
                "internalType": "uint256[]"
            }
        ],
        "name": "swapExactTokensForETH",
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountOutMin",
                "internalType": "uint256"
            },
            {
                "type": "address[]",
                "name": "path",
                "internalType": "address[]"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "swapExactTokensForETHSupportingFeeOnTransferTokens",
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountOutMin",
                "internalType": "uint256"
            },
            {
                "type": "address[]",
                "name": "path",
                "internalType": "address[]"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts",
                "internalType": "uint256[]"
            }
        ],
        "name": "swapExactTokensForTokens",
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountOutMin",
                "internalType": "uint256"
            },
            {
                "type": "address[]",
                "name": "path",
                "internalType": "address[]"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [],
        "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountOutMin",
                "internalType": "uint256"
            },
            {
                "type": "address[]",
                "name": "path",
                "internalType": "address[]"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts",
                "internalType": "uint256[]"
            }
        ],
        "name": "swapTokensForExactETH",
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOut",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountInMax",
                "internalType": "uint256"
            },
            {
                "type": "address[]",
                "name": "path",
                "internalType": "address[]"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "stateMutability": "nonpayable",
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts",
                "internalType": "uint256[]"
            }
        ],
        "name": "swapTokensForExactTokens",
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOut",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amountInMax",
                "internalType": "uint256"
            },
            {
                "type": "address[]",
                "name": "path",
                "internalType": "address[]"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "deadline",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "receive",
        "stateMutability": "payable"
    }
];

module.exports = {
    PULSEX_ROUTER_ADDRESS,
    PULSEX_FACTORY_ADDRESS,

    PULSEX_ROUTER_ABI,
    PULSEX_FACTORY_ABI,
    PULSEX_POOL_ABI,

    PULSEX_WPLS_ADDRESS,

    HTTP_PROVIDER_LINK,
    WEBSOCKET_PROVIDER_LINK,

    GAS_STATION,

    UPDATE_TIME_INTERVAL,
}
