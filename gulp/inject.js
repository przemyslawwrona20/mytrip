var gulp = require('gulp'),
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    naturalSort = require('gulp-natural-sort');
    // config = require('./config');

gulp.task('inject', function () {
    var target = gulp.src('./src/main/webapp/index.html');

    var sources = gulp.src(['src/main/webapp/app/**/*.js',
        '!src/main/webapp/app/**/*.spec.js',
        'src/main/webapp/common/**/*.js',
        '!src/main/webapp/common/**/*.spec.js'])
        .pipe(naturalSort('desc'))
        .pipe(angularFilesort());

    return target
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('src/main/webapp/'));
});