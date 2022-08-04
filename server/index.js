const express = require('express');
const app = express();
const PORT = 3000;
const distFolder = (__dirname + '/../dist/');

app.use(express.static(distFolder));

app.get('**/*', (req, res) => {
  res.status(404).type('.html').sendFile('error-404.html', {root: distFolder});
});

app.listen(PORT, function() {
  console.log(`App is running on port :${PORT}`);
});
