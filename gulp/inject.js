var gulp = require('gulp'),
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    naturalSort = require('gulp-natural-sort');
    // config = require('./config');

gulp.task('inject', function () {
    var target = gulp.src('./src/main/static/index.html');

    var sources = gulp.src(['src/main/static/app/**/*.js',
        '!src/main/static/app/**/*.spec.js',
        'src/main/static/common/**/*.js',
        '!src/main/static/common/**/*.spec.js'])
        .pipe(naturalSort('desc'))
        .pipe(angularFilesort());

    return target
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('src/main/static/'));
});