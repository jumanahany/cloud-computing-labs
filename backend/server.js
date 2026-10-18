require("dotenv").config({ quiet: true });

const express = require("express");
const issuesRouter = require("./routes/issues");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Parse JSON request bodies
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Cloud Issue Tracker API is running" });
});

// Issues API routes
app.use("/api/issues", issuesRouter);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "ROUTE_NOT_FOUND",
      message: "Route not found.",
    },
  });
});

// Handle malformed JSON and unexpected errors
app.use((error, req, res, next) => {
  console.error(error);

  // Malformed JSON request body
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Request body is not valid JSON.",
      },
    });
  }

  // Unexpected server error
  res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected server error occurred.",
    },
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Cloud Issue Tracker API running at http://localhost:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});
