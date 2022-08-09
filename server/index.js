const express = require('express');
const app = express();
const PORT = 3000;
const distFolder = (__dirname + '/../dist/');
const PAGES = [
  'auth',
  'register',
  'chats',
  'chat',
  'profile',
  'error-404',
  'error-500',
  'change-password',
  'change-settings'
]

app.use(express.static(distFolder));

app.get(`/`, (req, res) => {
  res.type('.html').sendFile(`index/index.html`, {root: distFolder});
});

PAGES.forEach((item) => {
  app.get(`**/${item}*`, (req, res) => {
    res.type('.html').sendFile(`${item}/index.html`, {root: distFolder});
  });
})

app.get('**/*', (req, res) => {
  res.status(404).type('.html').sendFile('error-404/index.html', {root: distFolder});
});

app.listen(PORT, function() {
  console.log(`App is running on port :${PORT}`);
});
