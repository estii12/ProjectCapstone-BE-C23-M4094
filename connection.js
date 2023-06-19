const { default: mongoose } = require("mongoose")
require("dotenv").config()

const { MONGO_USER, MONGO_PASS } = process.env

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@timcapstone-c23-m4094.r0tden2.mongodb.net/?retryWrites=true&w=majority`
const connection = mongoose
  .connect(URI, connectionParams)
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err))

module.exports = connection
