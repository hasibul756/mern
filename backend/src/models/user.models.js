// Import necessary packages
import mongoose from "mongoose"; // Mongoose for MongoDB object modeling
import jwt from "jsonwebtoken"; // JWT for token generation and verification
import bcrypt from "bcryptjs"; // Bcrypt for password hashing

const { Schema } = mongoose;

// Define the schema for the user model
const userSchema = new Schema(
    {
        // Username field
        username: {
            type: String,
            required: true, // Username is required
            unique: true, // Username must be unique
            lowercase: true, // Convert username to lowercase
            trim: true, // Trim whitespace from username
            index: true // Index this field for faster queries
        },
        // Email field
        email: {
            type: String,
            required: true, // Email is required
            unique: true, // Email must be unique
            lowercase: true, // Convert email to lowercase
            trim: true // Trim whitespace from email
        },
        // Full name field
        fullName: {
            type: String,
            required: true, // Full name is required
            trim: true, // Trim whitespace from full name
            index: true // Index this field for faster queries
        },
        // Avatar field
        avatar: {
            type: String,
            required: true // Avatar URL is required
        },
        // Cover image field
        coverImage: {
            type: String
        },
        // Watch history field (reference to Video model)
        watchHistory: [{
            type: Schema.Types.ObjectId, // Array of ObjectIds referencing Video model
            ref: "Video" // Reference to the Video model
        }],
        // Password field
        password: {
            type: String,
            required: [true, "Password is required"], // Password is required
            min: [6, "Minimum length required"], // Minimum password length
            max: [20, "Maximum length exceeded"] // Maximum password length
        },
        // Refresh token field
        refreshToken: {
            type: String // Stores refresh token for authentication
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified
    if (!this.isModified("password")) {
        return next();
    }
    try {
        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(this.password, 10); // Hash the password with salt rounds = 10
        this.password = hashedPassword; // Set the hashed password
        next(); // Continue with the save operation
    } catch (error) {
        return next(error); // Return any error that occurs
    }
});

// Method to check if a password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
    // Compare the provided password with the hashed password stored in the database
    return await bcrypt.compare(password, this.password);
};

// Method to generate an access token
userSchema.methods.generateAccessToken = function () {
    // Generate a JWT containing user information (id, email, username, full name)
    return jwt.sign(
        {
            _id: this._id, // User ID
            email: this.email, // User email
            user: this.username, // Username
            fullName: this.fullName // Full name
        },
        process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Token expiration time
        }
    );
};

// Method to generate a refresh token
userSchema.methods.generateRefreshToken = function () {
    // Generate a JWT containing user ID for refresh token
    return jwt.sign(
        {
            _id: this._id // User ID
        },
        process.env.REFRESH_TOKEN_SECRET, // Secret key for signing the token
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Token expiration time
        }
    );
};

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// Export the User model
export default User;
