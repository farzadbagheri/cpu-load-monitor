const express = require('express');
const app = express();
const os = require("os");

app.get('/cpu_load', function (req, res) {
  const cpus = os.cpus().length;
  const loadAverage = os.loadavg()[0] / cpus;
  console.log(loadAverage);
  return res.json({load_average: loadAverage});
});

app.listen(process.env.PORT || 8080);

