var gulp = require('gulp'),
    watch = require('gulp-watch');


gulp.task('watch', function () {
    gulp.watch(['src/main/webapp/app/**/*.js',
        'src/main/webapp/app/**/*.less'], ['less', 'minify-js', 'minify-css']);
});