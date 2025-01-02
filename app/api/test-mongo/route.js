import clientPromise from "@/lib/mongo";

export default async function handler(req, res) {
  try {

    const client = await clientPromise;
    const db = client.db(); 
    const collections = await db.listCollections().toArray();
    res.status(200).json({ message: "Connection successful", collections });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    res.status(500).json({ message: "Connection failed", error: error.message });
  }
}