const path = require('path');
const DIR = __dirname;

module.exports = function (app) {


    app.get('/', function (req, res) {
        res.sendFile(path.join(DIR, '../public/home.html'));
    });

    app.get('/survey', function (req, res) {
        res.sendFile(path.join(DIR, '../public/survey.html'));
    });
}