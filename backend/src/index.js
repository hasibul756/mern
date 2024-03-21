// Load environment variables from .env file into process.env
import 'dotenv/config';

// Import the connectDB function from the database connection file
import connectDB from './db/index.js';

// Connect to the database using the connectDB function
connectDB()
  .then(() => {
    // If database connection is successful, start the server
    // Listen for incoming requests on the specified port or default to port 4000
    application.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on Port:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    // If database connection fails, log the error message
    console.log("MongoDB db Connection Failed !", err);
  });
