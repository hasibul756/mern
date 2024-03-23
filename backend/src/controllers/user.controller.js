// Import necessary modules and utilities
import { asyncHandler } from '../utils/asyncHandler.js'; // Utility for handling asynchronous functions
import { ApiError } from '../utils/ApiError.js'; // Custom error handler
import User from '../models/user.models.js'; // User model
import { uploadOnCloudinary } from '../utils/cloudinary.js'; // Utility for uploading files to Cloudinary
import { ApiResponse } from '../utils/ApiResponse.js'; // Utility for creating API responses

// Define an asynchronous function to handle user registration
const registerUser = asyncHandler(async (req, res) => {
    // Destructure required fields from req.body
    const { fullName, email, username, password } = req.body;

    // Check if any of the required fields are empty
    if ([fullName, email, username, password].some((field) => !field || field.trim() === '')) {
        throw new ApiError(400, 'All fields are required.');
    }

    // Check if a user with the given email or username already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw new ApiError(409, 'User with email or username already exists.');
    }

    // Get paths for avatar and cover image (if available)
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    // Check if avatar is provided
    if (!avatarLocalPath) {
        throw new ApiError(400, 'Avatar is required.');
    }

    // Upload avatar and cover image to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

    // Check if avatar upload was successful
    if (!avatar || !avatar.url) {
        throw new ApiError(500, 'Failed to upload avatar.');
    }

    // Create a new user in the database
    const newUser = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || '', // Use coverImage URL if available, otherwise an empty string
        email,
        password,
        username: username.toLowerCase(), // Convert username to lowercase
    });

    // Check if user creation was successful
    if (!newUser) {
        throw new ApiError(500, 'Failed to register user.');
    }

    // Omit password and refreshToken fields from the response
    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    );

    if(!createdUser) {
        throw new ApiError (500, "Something went wrong while registering user.");
    }

    // Return the response with the created user data
    return res.status(201).json(new ApiResponse(201, createdUser, 'User registered successfully.'));
});

// Export the registerUser function for use in other modules
export { registerUser };
