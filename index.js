var fs = require('fs');
var path = require('path');
var glob = require('glob');

function isNested (file) {
    return file.split(path.sep).length > 1;
}

module.exports = function (app, location) {
    if (typeof app === 'string') {
        throw new Error('Please pass in a express app instance as the first argument');
    }

    location = path.resolve(location);

    if (!fs.existsSync(location)) {
        throw new Error('Sorry, I\'m not sure where that folder is...');
    }

    glob(path.join('**/*.js'), {
        cwd: location,
        dot: false,
        sync: true // Stop express race condition on start up
    }, function (err, files) {
        if (err) throw err;

        files.forEach(function (file) {
            if (isNested(file)) {
                app.use('/' + path.dirname(file), require(path.join(location, file)));
            } else {
                app.use('/', require(path.join(location, file)));
            }
        });
    });
};