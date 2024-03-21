// Define an asyncHandler function that takes another function `fn` as an argument
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        // Try to await the execution of `fn` with `req`, `res`, and `next` as arguments
        await fn(req, res, next);
    } catch (err) {
        // If an error occurs during the execution of `fn`, catch it here
        // Set the HTTP status code to 500 (Internal Server Error) if `code` is not provided
        // Send a JSON response with an error message
        res.status(code || 500).json({
            success: false,
            message: err.message
        });
    }
};

// Export the asyncHandler function to make it available for use in other files
export { asyncHandler };
