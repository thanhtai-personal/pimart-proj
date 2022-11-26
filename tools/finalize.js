require('dotenv').config()

const HDWalletProvider = require("truffle-hdwallet-provider")
const Web3 = require('web3')

const KICKOFF = true;

const BUILD_PATH = '../src/stores/jsons/'

const Summary = require(`${BUILD_PATH}summary.json`)
const CONTRACTS_PATH = `${BUILD_PATH}contracts/`

const TEST_MODE = true
const NET_ID = TEST_MODE ? '97' : '56'

const BLOCKTIME = Number(Summary.network.blocktime)

const jsons = {
    Lottery: require(`${CONTRACTS_PATH}Lottery.json`),
}

const abis = {
    Lottery: jsons.Lottery.abi,
}

const addresses = {
    Lottery: jsons.Lottery.networks[NET_ID].address
}

var web3
var lottery

// without 0x
function initWeb3(pkey_, endpoint_) {
    const provider = new HDWalletProvider(pkey_, endpoint_);
    return new Web3(provider)
}

function getContract(web3_, abi_, address_) {
    return new web3_.eth.Contract(abi_, address_, {gas: 6000000})
}

async function tryFinalize() {
    try {
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    const sha3 = (s) => {return web3.utils.sha3(s)}
    const prefix = 'test'
        const currentRound = await lottery.methods.currentRound().call()
        const seedString = prefix + currentRound
        const seed = sha3(seedString)

        const nextRound = Number(currentRound) + 1
        const nextSeedString = prefix + nextRound
        const nextSeed = sha3(nextSeedString)
        const nextCommit = sha3(nextSeed)
        if (currentRound > 0) {
            const test = await lottery.methods.endRound(seed).call({from: account})
        }
        if (currentRound == 0 && KICKOFF) {
            console.log('Init first round')
            await lottery.methods.initNextRound(nextCommit).send({from: account})
        } else {
            console.log('End round', currentRound, ' and init round', Number(currentRound) + 1)
            await lottery.methods.switchNextRound(seed, nextCommit).send({from: account})
        }
    } catch(e) {
        console.log('error tryFinalize', e.toString())
    }
}

async function start() {
    const testPkey = '4fd2f3af4661787e0d2f716c6321980c9c83606296ee09182999e38434f19a3f'
    const isTestNet = Summary.network.netId == 97
    const pkey = isTestNet ? testPkey : process.env.TOOL_PKEY
    web3 = initWeb3(pkey, Summary.network.endpoint)
    lottery = getContract(web3, abis.Lottery, addresses.Lottery)
    let busy = false
    await tryFinalize()
    setInterval(async() => {
        if (!busy) {
            busy = true
            await tryFinalize()
            busy = false
        }
    }, 30000)
}

start()