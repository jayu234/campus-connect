const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    // Wrong Mongodb Id error
    if (err.name === "CastError") {
        err.message = `Resource not found. Invalid: ${err.path}`;
    }

    // User Validation error
    if (err.name === "ValidationError") {
        err.message = "User validation failed";
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        err.message = `User with ${Object.keys(err.keyValue)} ${Object.values(err.keyValue)} already exist`;
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message
    })
}