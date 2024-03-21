class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        // Call the parent class constructor (Error) with the provided message
        super(message);

        // Initialize the properties of the ApiError instance
        this.statusCode = statusCode; // HTTP status code of the error response
        this.data = null; // Optional data payload (defaulting to null)
        this.success = false; // Set success to false as it's an error response
        this.errors = errors; // Array of error objects or messages
        if (stack) {
            // If a stack trace is provided, assign it to this.stack
            this.stack = stack;
        } else {
            // Otherwise, capture the stack trace using Error.captureStackTrace
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
