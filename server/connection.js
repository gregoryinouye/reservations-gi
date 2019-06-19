const app = require('./server.js');

const port = process.env.PORT || 80;

app.listen(port, () => console.log(`listening on port ${port}`));
