// Import necessary modules from Mongoose library
import mongoose from "mongoose";
// Import the mongoose-aggregate-paginate-v2 plugin
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Destructure Schema from mongoose
const { Schema } = mongoose;

// Define the schema for video entities
const videoSchema = new Schema({
    // Path to the video file
    videoFile: {
        type: String,
        required: true, // It's required
    },
    // Path to the video thumbnail
    thumbnail: {
        type: String,
        required: true, // It's required
    },
    // Title of the video
    title: {
        type: String,
        required: true, // It's required
    },
    // Description of the video
    description: {
        type: String,
        required: true, // It's required
    },
    // Duration of the video in seconds
    // Note: Consider adding validation for positive numbers
    duration: {
        type: Number,
        default: 0, // Default value is 0
        required: true, // It's required
    },
    // Indicates whether the video is published or not
    isPublished: {
        type: Boolean,
        default: true, // Default value is true
    },
    // Reference to the owner (User) of the video
    owner: {
        type: Schema.Types.ObjectId, // Type is ObjectId
        ref: "User", // It refers to the "User" model
    }
});

// Add pagination support to the schema using the mongoose-aggregate-paginate-v2 plugin
videoSchema.plugin(mongooseAggregatePaginate);

// Create and export the Mongoose model for videos
const Video = mongoose.model("Video", videoSchema);
export default Video;
