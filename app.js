const express = require("express");
const cors = require("cors");
const fs = require("fs");

//creating an API
const app = express();
app.use(cors());
app.use(express.json());

//------------------------------------------------------------------------
const TimeZoneDB_Json = fs.readFileSync("./JSON/TimeZone.json", "utf8");
app.get("/", (req, res) => {
  res.write(TimeZoneDB_Json);
  res.end();
});

var TimeZoneDB_String = JSON.parse(TimeZoneDB_Json);
app.get("/:area/:city", (req, res) => {
  var result = TimeZoneDB_String.filter((obj) => {
    return obj.Name === req.params.area + "/" + req.params.city;
  });
  res.write(JSON.stringify(result));
  res.end();
});

app.get("/:area/:city/:city2", (req, res) => {
  var result = TimeZoneDB_String.filter((obj) => {
    return (
      obj.Name ===
      req.params.area + "/" + req.params.city + "/" + req.params.city2
    );
  });
  res.write(JSON.stringify(result));
  res.end();
});
//------------------------------------------------------------------------

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
