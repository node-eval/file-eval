var path = require('path');

var fileEval = require('../index');

var filenames = ['file.js', 'file.json', 'file.json5'];

filenames.forEach(function (name) {
    var filename = path.join(__dirname, 'fixtures', name);

    fileEval(filename)
        .then(data => console.log(data))
        .catch(err => console.log(err));
});
