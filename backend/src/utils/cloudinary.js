import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary SDK
import fs from 'fs'; // Import file system module for file operations

// Configure Cloudinary with your credentials from environment variables
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

// Define the upload function
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Check if localFilePath is provided
        if (!localFilePath) {
            throw new Error("Local file path is missing.");
        }
        
        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Determine the resource type automatically based on the file extension
        });

        // Log success message with the secure URL of the uploaded file
        console.log("File Uploaded Successfully", response.secure_url);

        // Return the Cloudinary response object
        return response;
    } catch (err) {
        // Handle errors
        console.error("Error uploading file to Cloudinary:", err);
        
        // Remove locally saved temporary file if it exists
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Remove the file
            console.log("Local temporary file removed.");
        }

        // Return null to indicate failure
        return null;
    }
};

// Export the upload function for use in other modules
export { uploadOnCloudinary };
