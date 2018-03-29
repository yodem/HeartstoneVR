const users = require('../controllers/users');
const games = require('../controllers/games');

module.exports =  function (app) {
    app.post('/api/login', users.login);
    app.post('/api/register', users.register);
    app.post('/api/join', users.join);
    app.post('/api/play', users.play);
}