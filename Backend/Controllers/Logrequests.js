const Log = require("../Models/Logs");

const LogRequests = async (req, res, next) => {
  try {
    const log = Log.create({
      time: Date.now(),
      method: req.method,
      endpoint: req.originalUrl,
      statusCode: res.statusCode,
      ip: req.ip,
      headers: req.headers,
    });
    const count = await Log.countDocuments();
    if (count > 50) {
      const extra = count - 50;
      await Log.find({}).sort({ time: 1 }).limit(extra).deleteMany();
    }

    console.log("Log Saved...");
    next();
  } catch (err) {
    console.log("Log not saved..." + err.message);
    next();
  }
};


const getLoggedRequests = async (req, res) => {
  try {
    const logs = await Log.find({});
    res.json(logs);
  } catch (err) {
    console.log("Error fetching logs..." + err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { LogRequests, getLoggedRequests };
