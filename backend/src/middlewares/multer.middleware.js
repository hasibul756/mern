// Import required modules
import multer from 'multer'; // Import Multer for handling file uploads
import path from 'path'; // Import the path module to handle file extensions

// Configure disk storage for Multer
const storage = multer.diskStorage({
  // Specify the destination directory where uploaded files will be stored
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Store files in "./public/temp" directory
  },
  // Define how filenames should be generated
  filename: function (req, file, cb) {
    // Extract file extension using the path module
    const ext = path.extname(file.originalname);
    // Generate a unique filename using current timestamp and a random number
    const uniqueSuffix = Date.now() + '-' + Math.floor(Math.random() * 1000);
    // Concatenate the fieldname, unique suffix, and extension to create the filename
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Define a function to filter uploaded files
const fileFilter = (req, file, cb) => {
  // Accept only specific file types, adjust as per your requirements
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only JPEG and PNG files are allowed')); // Reject the file
  }
};

// Configure Multer with the defined storage and file filtering
const upload = multer({ 
  storage: storage, // Use the configured disk storage
  fileFilter: fileFilter, // Apply the file filter function
  limits: {
    fileSize: 1024 * 1024 * 5 // Limit file size to 5MB, adjust as needed
  }
});

// Export the configured Multer middleware for use in other parts of the application
export { upload };