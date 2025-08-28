const express = require("express");
const ConnectToMongoDB = require("./MongoConnect");
require("dotenv").config();
const router = require("./Routes/apiRoutes");
const {LogRequests,getLoggedRequests}=require("./Controllers/Logrequests");

const app = express();

const port = process.env.PORT;
app.use(LogRequests);


app.use("/api", router);

app.get("/iit2024077/healthz", (req, res) => {
  res.json({
    status: "OK",
  });
});

app.get("/logs/recent", getLoggedRequests);

ConnectToMongoDB(process.env.atlas_url)
  .then(() => {
    console.log("Connected to MongoDB Sucessfully");
    app.listen(port, () => {
      console.log(
        "Server Started Sucessfully at url: " + "http://localhost:" + port
      );
    });
  })
  .catch((error) =>
    console.error("connection to MongoDB Failed: " + error.message)
  );
