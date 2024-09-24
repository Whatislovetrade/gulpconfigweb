const gulp = require('gulp')
const fileInclude = require('gulp-file-include')
const sass = require('gulp-sass')(require('sass'))
const server = require('gulp-server-livereload')

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file'
}
const serverOptions = {
    livereload: true,
    open: true,
}

gulp.task('includeFiles', function() {
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

gulp.task('copyImages', function() {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'))
})

gulp.task('startServer', function() {
    return gulp.src('./dist/')
        .pipe(server(serverOptions))
})