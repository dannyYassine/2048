
var gulp            = require('gulp');
var less            = require('gulp-less');
const path          = require('path');
var sourcemaps      = require('gulp-sourcemaps');

const paths = {
    less: ['./src/website/assets/css/**/*.less']
};

gulp.task('less', function () {
    return gulp.src('./src/website/assets/css/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('.', { sourceRoot: path.join(__dirname, 'src/website/assets/css') }))
        .pipe(gulp.dest('./src/website/public/css'));
});

gulp.task('watch-less', function () {
    gulp.watch(paths.less, ['less'])
});