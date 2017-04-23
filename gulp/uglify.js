var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');

gulp.task('minify-js', function () {

    var jsFiles = [
            'src/main/webapp/vendor/angular/angular.js',
            'src/main/webapp/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
            // 'src/main/webapp//vendor/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
            'src/main/webapp/vendor/angular-ui-router/release/angular-ui-router.js',
            'src/main/webapp/vendor/angular-animate/angular-animate.js',
            'src/main/webapp/vendor/angular-cookie/angular-cookie.js',
            'src/main/webapp/vendor/angular-mocks/angular-mocks.js',
            'src/main/webapp/vendor/angular-resource/angular-resource.js',
            'src/main/webapp/vendor/angular-sanitize/angular-sanitize.js',
            'src/main/webapp/vendor/angular-touch/angular-touch.js',
            'src/main/webapp/vendor/jquery/dist/jquery.js',
            'src/main/webapp/vendor/jquery-ui/jquery-ui.js',
            'src/main/webapp/vendor/ngstorage/ngStorage.js',
            'src/main/webapp/vendor/angular-ui-utils/ui-utils.js',
            'src/main/webapp/vendor/angular-local-storage/angular-local-storage.js',
            'src/main/webapp/vendor/angular-aside/dist/js/angular-aside.min.js',
            'src/main/webapp/vendor/ui-router-extras/release/ct-ui-router-extras.js',
            'src/main/webapp/vendor/moment/min/moment.min.js',
            'src/main/webapp/vendor/angular-ui-select/dist/select.js',
            'src/main/webapp/vendor/angular-inview/angular-inview.js',
            'src/main/webapp/vendor/angularjs-toaster/toaster.js',
            'src/main/webapp/vendor/angular-auto-validate/dist/jcs-auto-validate.js',
            'src/main/webapp/vendor/particles.js/particles.js',
            'src/main/webapp/vendor/angular-xeditable/dist/js/xeditable.js',
            'src/main/webapp/vendor/ng-lodash/build/ng-lodash.js',
            'src/main/webapp/vendor/ngprogress/build/ngprogress.js',
            // 'src/main/webapp/vendor/ng-file-upload/FileAPI.js',
            'src/main/webapp/vendor/ng-file-upload/ng-file-upload.js',
            // 'src/main/webapp/vendor/ng-file-upload/ng-file-upload-all.js',
            'src/main/webapp/vendor/ng-file-upload/ng-file-upload-shim.js',
            'src/main/webapp/vendor/bootstrap-select/dist/js/bootstrap-select.js'
        ],
        jsDest = 'src/main/webapp/js';


    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('minify-css', function () {
    var cssFiles = [
            'src/main/webapp/vendor/angularjs-toaster/toaster.css',
            'src/main/webapp/vendor/angular-xeditable/dist/css/xeditable.css',
            'src/main/webapp/vendor/ngprogress/ngProgress.css',
            'src/main/webapp/vendor/bootstrap-select/dist/css/bootstrap-select.css'
        ],
        cssFile = 'src/main/webapp/css/';

    gulp.src(cssFiles)
        .pipe(concat('styles.css'))
        .pipe(minify())
        .pipe(gulp.dest(cssFile));
});