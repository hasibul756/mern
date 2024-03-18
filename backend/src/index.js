// Importing necessary dependencies
import 'dotenv/config'; // Allows loading environment variables from .env file
import express from 'express'; // Imports the Express framework for building the server

// Initialize Express application
const app = express();

// Define the port the server will listen on
const port = process.env.PORT || 4000; // Uses the PORT environment variable or defaults to 4000

// Route for the home page
app.get('/', (req, res) => {
  res.send('Hello World!'); // Sends "Hello World!" as the response when someone accesses the root URL
});

// Route for fetching sample data
app.get('/api/data', (req, res) => {
  // Sample data array
  const data = [
    { id: 1, name: 'Hasibul Alam' },
    { id: 2, name: 'Sahil Alam' },
    { id: 3, name: 'Iron Man' }
  ];
  res.send(data); // Sends the sample data array as the response when /api/data is accessed
});

// Route for fetching sample user data
app.get('/api/user', (req, res) => {
  // Sample user data array
  const user = [
    { name: 'Sudip Atta', email: 'attasudip@gmail.com' },
    { name: 'Hasibul Alam', email: 'hasibulalam2311@gmail.com' }
  ];
  res.send(user); // Sends the sample user data array as the response when /api/user is accessed
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // Logs a message indicating the server is running and listening on the specified port
});
