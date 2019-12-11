const dayjs = require("dayjs");

// Middleware logger
const logger = (req, res, next) => {
  // Logging requested URL with date
  console.log(
    `Requested url "${req.protocol}://${req.get("host")}${req.originalUrl}" at ${dayjs().format(
      `HH:mm:ss DD/MM/YYYY `
    )}`
  );
  next();
};

module.exports = logger;
