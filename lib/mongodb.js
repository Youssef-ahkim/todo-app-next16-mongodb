// lib/mongodb.js
import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env')
}

const uri = process.env.MONGODB_URI
const options = {}

let client = new MongoClient(uri, options)
let clientPromise

// Use a global variable in development to prevent multiple connections
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  clientPromise = client.connect()
}

export default clientPromise
