// Import mongoose library for MongoDB interactions
import mongoose from "mongoose";

// Define the schema for the user document
const userSchema = new mongoose.Schema(
    {
        // Username field
        username: {
            type: String,       // Field type is string
            required: true,     // Field is required
            unique: true,       // Field value must be unique
            lowercase: true,    // Convert field value to lowercase
            trim: true         // Remove leading and trailing whitespaces from field value
        },
        // Email field
        email: {
            type: String,       // Field type is string
            required: true,     // Field is required
            unique: true,       // Field value must be unique
            lowercase: true,    // Convert field value to lowercase
            trim: true         // Remove leading and trailing whitespaces from field value
        },
        // Password field
        password: {
            type: String,       // Field type is string
            required: true,     // Field is required
            min: [6, "Min ^ required"], // Minimum length of password is 6 characters
            max: 12            // Maximum length of password is 12 characters
        }
    },
    { timestamps: true } // Add createdAt and updatedAt fields to track document creation and update times
);

// Create a Mongoose model named "User" based on the defined schema
export const User = mongoose.model("User", userSchema);

// Note: "User" will be saved as "users" in MongoDB because Mongoose converts it to lowercase and pluralizes it
