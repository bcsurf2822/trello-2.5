import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI environment variable is missing.");
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "dev") {

  let globalWithMongo = global;
  globalWithMongo._mongoClientPromise = undefined;

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  console.log("Running in production mode...");
  console.log("Creating a new MongoClient instance...");
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

clientPromise
  .then(() => console.log("MongoDB connection successful."))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

export default clientPromise;
