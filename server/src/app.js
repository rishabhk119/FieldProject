


const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const env = require("./config/env");

const app = express();

// Security
app.use(helmet());

// CORS — allow localhost, configured client URL, and any LAN IP (for collaborators)
const allowedOrigins = [
  env.clientUrl,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const isLanOrigin = (origin) => {
  if (!origin) return false;
  // Allow any 192.168.x.x or 10.x.x.x or 172.x.x.x on port 5173
  return /^http:\/\/(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(origin);
};

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow any origin
      return callback(null, true);
    },
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api", limiter);

// Logging (dev only)
if (env.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// Body parsing
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;