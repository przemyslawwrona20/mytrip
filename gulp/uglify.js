var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');

gulp.task('minify-js', function () {

    var jsFiles = [
            'src/main/static/vendor/angular/angular.js',
            'src/main/static/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
            // 'src/main/static//vendor/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
            'src/main/static/vendor/angular-ui-router/release/angular-ui-router.js',
            'src/main/static/vendor/angular-animate/angular-animate.js',
            'src/main/static/vendor/angular-cookie/angular-cookie.js',
            'src/main/static/vendor/angular-mocks/angular-mocks.js',
            'src/main/static/vendor/angular-resource/angular-resource.js',
            'src/main/static/vendor/angular-sanitize/angular-sanitize.js',
            'src/main/static/vendor/angular-touch/angular-touch.js',
            'src/main/static/vendor/jquery/dist/jquery.js',
            'src/main/static/vendor/jquery-ui/jquery-ui.js',
            'src/main/static/vendor/ngstorage/ngStorage.js',
            'src/main/static/vendor/angular-ui-utils/ui-utils.js',
            'src/main/static/vendor/angular-local-storage/angular-local-storage.js',
            'src/main/static/vendor/angular-aside/dist/js/angular-aside.min.js',
            'src/main/static/vendor/ui-router-extras/release/ct-ui-router-extras.js',
            'src/main/static/vendor/moment/min/moment.min.js',
            'src/main/static/vendor/angular-ui-select/dist/select.js',
            'src/main/static/vendor/angular-inview/angular-inview.js',
            'src/main/static/vendor/angularjs-toaster/toaster.js',
            'src/main/static/vendor/angular-auto-validate/dist/jcs-auto-validate.js',
            'src/main/static/vendor/particles.js/particles.js',
            'src/main/static/vendor/angular-xeditable/dist/js/xeditable.js',
            'src/main/static/vendor/ng-lodash/build/ng-lodash.js',
            'src/main/static/vendor/ngprogress/build/ngprogress.js',
            // 'src/main/static/vendor/ng-file-upload/FileAPI.js',
            'src/main/static/vendor/ng-file-upload/ng-file-upload.js',
            // 'src/main/static/vendor/ng-file-upload/ng-file-upload-all.js',
            'src/main/static/vendor/ng-file-upload/ng-file-upload-shim.js',
            'src/main/static/vendor/bootstrap-select/dist/js/bootstrap-select.js'
        ],
        jsDest = 'src/main/static/js';


    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('minify-css', function () {
    var cssFiles = [
            'src/main/static/vendor/angularjs-toaster/toaster.css',
            'src/main/static/vendor/angular-xeditable/dist/css/xeditable.css',
            'src/main/static/vendor/ngprogress/ngProgress.css',
            'src/main/static/vendor/bootstrap-select/dist/css/bootstrap-select.css'
        ],
        cssFile = 'src/main/static/css/';

    gulp.src(cssFiles)
        .pipe(concat('styles.css'))
        .pipe(minify())
        .pipe(gulp.dest(cssFile));
});