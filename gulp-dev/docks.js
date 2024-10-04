const gulp = require('gulp')
const fileInclude = require('gulp-file-include')
const sass = require('gulp-sass')(require('sass'))
const sassGlob = require('gulp-sass-glob')
const server = require('gulp-server-livereload')
const clean = require('gulp-clean')
const fs = require('fs')
const sourceMaps = require('gulp-sourcemaps')
const groupMedia = require('gulp-group-css-media-queries')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')

const webpack = require('webpack-stream')

const babel = require('gulp-babel')
const imagemin = require('gulp-imagemin')
const changed = require('gulp-changed')

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file'
}
const serverOptions = {
    livereload: true,
    open: true,
}

const plumberNotify = (title) => {
     return { 
        errorHandler: notify.onError({
        title: title,
        message: 'Error <%= error.message %>',
        sound: false
    })}
}


gulp.task('clean:docks', function(done) {
    if(fs.existsSync('./docks/')) {
        return gulp.src('./docks/', {read: false})
            .pipe(clean({force: true}))
    }
    done()
})

gulp.task('html:docks', function() {
    return gulp.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
        .pipe(changed('./docks/'))
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(gulp.dest('./docks'))
})

gulp.task('sass:docks', function() {
    return gulp.src('src/sass/**/*.+(scss|sass)')
        .pipe(changed('./docks/css'))
        .pipe(plumber(plumberNotify('sass')))
        .pipe(sourceMaps.init())
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(groupMedia())
        .pipe(sourceMaps.write())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./docks/css'));
})

gulp.task('images:docks', function() {
    return gulp.src('./src/img/**/*')
        .pipe(changed('./docks/img/'))
        .pipe(imagemin({verbose: true}))
        .pipe(gulp.dest('./docks/img/'))
})

gulp.task('fonts:docks', function() {
    return gulp.src('./src/fonts/**/*')
        .pipe(changed('./docks/fonts'))
        .pipe(gulp.dest('./docks/fonts/'))
})

gulp.task('files:docks', function() {
    return gulp.src('./src/files/**/*')
        .pipe(changed('./docks/files'))
        .pipe(gulp.dest('./docks/files/'))
})

gulp.task('js:docks', function() {
    return gulp.src('./src/js/*.js')
        .pipe(changed('./docks/js'))
        .pipe(plumber(plumberNotify('JS')))
        // .pipe(babel())
        .pipe(webpack(require('../webpack.config.js')))
        .pipe(gulp.dest('./docks/js'))
})

gulp.task('server:docks', function() {
    return gulp.src('./docks/')
        .pipe(server(serverOptions))
})

gulp.task('watch:docks', function() {
    gulp.watch('./src/sass/**/*.scss', gulp.parallel('sass:docks'))
    gulp.watch('./src/**/*.html', gulp.parallel('html:docks'))
    gulp.watch('./src/img/**/*', gulp.parallel('images:docks'))
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:docks'))
    gulp.watch('./src/files/**/*', gulp.parallel('files:docks'))
    gulp.watch('./src/js/**/*.js', gulp.parallel('js:docks'))
})

