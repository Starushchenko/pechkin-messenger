const express = require('express');
const app = express();
const PORT = 3000;
const distFolder = (__dirname + '/../dist/');

app.use(express.static(distFolder));
app.listen(PORT, function() {
  console.log(`App is running on port :${PORT}`);
});
