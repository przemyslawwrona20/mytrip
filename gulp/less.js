var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
    return gulp.src('src/main/webapp/less/main.less')
        .pipe(less())
        .pipe(gulp.dest('src/main/webapp/css'));
});