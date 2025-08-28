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

    const keep = 50;

    const idtokeep = await Log.find({})
      .sort({ time: -1 })
      .select("_id")
      .limit(keep);

    await Log.deleteMany({ _id: { $nin: idtokeep } });
    console.log("Log Saved...");

    next();
  } catch (err) {
    console.log("Log not saved..." + err.message);
    next();
  }
};

const getLoggedRequests = async (req, res) => {
  try {
    const logs = await Log.find({}).sort({ time: -1 });
    res.json(logs);
  } catch (err) {
    console.log("Error fetching logs..." + err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { LogRequests, getLoggedRequests };
