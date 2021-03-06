var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var cssmin = require('gulp-minify-css');
// 生成sourcemap文件
var sourcemaps = require('gulp-sourcemaps');
// 出现异常并不终止watch事件（gulp-plumber），并提示我们出现了错误（gulp-notify）
var notify = require('gulp-notify');
var plumber  = require('gulp-plumber');

var browserSync = require('browser-sync').create();


var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var babel = require('gulp-babel');


gulp.task('watch',['build-style'],function(gulpCallback){
    browserSync.init({
        server: './',
        open : true
    },function callback(){
        gulp.watch('./*.html',browserSync.reload);
        gulp.watch('./less/**/*.less',['build-style']);
        gulp.watch('./js/**/*.js',['build-js']);
        gulpCallback();
    });
});

gulp.task('build-style',function(){
    return gulp.src('./less/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(less({
        paths : [path.join(__dirname,'less','includes')]
    }))
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('build-js',function(){
    return gulp.src('./js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});
