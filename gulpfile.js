(function () {
    'use strict';

    var requireDir = require('require-dir'),
        taskDir = './gulp';

    requireDir(taskDir, {recurse: true});
})();
