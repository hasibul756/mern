import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*", // Allow requests from any origin if CORS_ORIGIN is not defined
    credentials: true // Allow sending cookies with CORS requests
}));

// Middleware to parse incoming JSON data
app.use(express.json({ limit: "16kb" }));

// Middleware to parse incoming URL-encoded data
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Middleware to serve static files from the "public" directory
app.use(express.static("public"));

//Router

import userRouter from "./routes/user.routes.js";

// Routes

app.use("/api/v1/users", userRouter)


// Export the configured Express application
export { app };
