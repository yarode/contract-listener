Web3 = require('web3')
dotenv = require('dotenv')

dotenv.config()

const options = {
  // Enable auto reconnection
  reconnect: {
    auto: true,
    delay: 12500, // ms
    onTimeout: false,
  },
}

function watchTokenTransfers() {
  console.log('Listening for transactions...')
  // Instantiate web3 with WebSocketProvider
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
      process.env.INFURA_URI,
      options
    )
  )

  // Instantiate token contract object with JSON ABI and address
  const tokenContract = new web3.eth.Contract(
    JSON.parse(process.env.ABI),
    process.env.CONTRACT_ADDRESS,
    (error, result) => {
      if (error) console.log(error)
    }
  )

  // Subscribe to Transfer events matching filter criteria
  tokenContract.events.Transfer(async (error, event) => {
    if (error) {
      console.log(error)
      return
    }

    console.log("transaction")
    return
  })
}

watchTokenTransfers()
