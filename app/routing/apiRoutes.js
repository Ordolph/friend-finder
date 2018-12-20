const dataStore = require('../data/friends');

module.exports = function (app) {
    var match;

    function reducer(score) {
        var sum = score.reduce(add, 0);

        function add(a, b) {
            return a + b;
        }

        return sum;
    }


    function getDifference(data) {

        console.log(data);
        let differenceArr = [];
        let newData = data[data.length -1];
        let newDataScore = reducer(newData.scores);


        for (i = 0; i < data.length - 1; i++) {
            let currentData = data[i];
            let currentDataScore = reducer(currentData.scores)
            let difference = Math.abs(currentDataScore - newDataScore);

            differenceArr.push(difference);
            console.log(difference);
        }

        var matchNum = Math.min(...differenceArr.slice(0));
        console.log(Math.min(...differenceArr.slice(0)));
        console.log(`MATCH NUM: ${matchNum}`);
        var newMatch = differenceArr.indexOf(matchNum);
        console.log(newMatch)
        match = data[newMatch];
    }

    app.get('/api/friends', function (req, res) {
        res.json(dataStore);
    });

    app.post('/api/friends', function (req, res) {
        console.log('sending')
        let newMember = req.body;
        newMember.scores.map((score, index) => {
            newMember.scores[index] = parseInt(score);
        });

        dataStore.push(req.body);
        getDifference(dataStore);
        res.json(match);
    });
}

