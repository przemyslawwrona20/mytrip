var gulp = require('gulp'),
    watch = require('gulp-watch');


gulp.task('watch', function () {
    gulp.watch('src/main/webapp/app/**/*.js', ['dev']);
});