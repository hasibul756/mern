class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        // Initialize the properties of the ApiResponse instance
        this.statusCode = statusCode; // HTTP status code of the response
        this.data = data; // Data payload of the response
        this.message = message; // Optional message describing the response (defaults to "Success")
        this.success = this.isSuccess(); // Determine if the response is successful based on the status code
    }

    isSuccess() {
        // Check if the status code indicates success (2xx or 3xx range)
        return this.statusCode >= 200 && this.statusCode < 400;
    }
}
