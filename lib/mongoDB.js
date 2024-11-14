// Import the MongoDB client
const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string
const uri = 'mongodb+srv://b00153847:<lawadeolokun>@krispykreme.g9lb6.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKreme';
const client = new MongoClient(uri);

// Exported GET function for the API
export async function GET(req, res) {
  // Log a message to indicate the API route is hit
  console.log("In the API page");

  // Parse the URL to extract query parameters
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');

  // Log the received email and password
  console.log(email);
  console.log(pass);

  // Connect to MongoDB Atlas
  await client.connect();
  console.log('Connected successfully to MongoDB Atlas');

  // Access the database and collection
  const db = client.db('<KrispyKreme>'); // Replace with your database name
  const collection = db.collection('users'); // Collection name

  // Query the collection to find the user by email and password
  const findResult = await collection.find({ "username": email, "password": pass }).toArray();
  console.log('Found documents =>', findResult);

  // Check if the login is valid
  let valid = findResult.length > 0;

  if (valid) {
    console.log("Login valid");
  } else {
    console.log("Login invalid");
  }

  // Send the result back as a JSON response
  return Response.json({ "data": valid ? "valid" : "invalid" });
}
