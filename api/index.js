const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { loadDB } = require('./src/controllers/index')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    loadDB()
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
