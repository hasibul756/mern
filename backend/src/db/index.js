// Importing necessary modules and packages
import 'dotenv/config'; // Loads environment variables from a .env file into process.env
import mongoose from 'mongoose'; // Mongoose is an ODM (Object Data Modeling) library for MongoDB
import { DB_NAME } from '../constants.js'; // Importing a constant variable for the database name
import express from 'express'; // Express is a web framework for Node.js

// Creating an Express application
const app = express();

// Setting the port number for the application to listen on
const port = process.env.PORT || 4000; // Uses the PORT environment variable or defaults to 4000 if not set

// Function to connect to MongoDB database
const connectDB = async () => {
    try {
        // Using await to asynchronously connect to MongoDB using Mongoose
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        // Logging a success message with the DB host if the connection is successful
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        // Catching and handling any errors that occur during MongoDB connection
        console.log("MongoDB connection error: ", error);
        // Exiting the process with a non-zero exit code if there's an error
        process.exit(1);
    }
}

// Exporting the connectDB function so it can be used elsewhere in the application
export default connectDB;