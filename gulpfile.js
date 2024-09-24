const gulp = require('gulp')
const fileInclude = require('gulp-file-include')
const sass = require('gulp-sass')(require('sass'))
const server = require('gulp-server-livereload')
const clean = require('gulp-clean')
const fs = require('fs')

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file'
}
const serverOptions = {
    livereload: true,
    open: true,
}

gulp.task('clean', function(done) {
    if(fs.existsSync('./dist/')) {
        return gulp.src('./dist/', {read: false})
            .pipe(clean({forse: true}))
    }
    done()
})

gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(gulp.dest('./dist'))
})

gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.+(scss|sass)')
        .pipe(sass().on('error', sass.logError))
        // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
})

gulp.task('images', function() {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'))
})

gulp.task('server', function() {
    return gulp.src('./dist/')
        .pipe(server(serverOptions))
})

gulp.task('watch', function() {
    gulp.watch('./src/sass/**/*.scss', gulp.parallel('sass'))
    gulp.watch('./src/**/*.html', gulp.parallel('html'))
    gulp.watch('./src/img/**/*', gulp.parallel('images'))
})

gulp.task('default', gulp.series(
    'clean',
     gulp.parallel('html', 'sass', 'images'),
     gulp.parallel('server', 'watch')

))