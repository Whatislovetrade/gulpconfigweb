const gulp = require('gulp')
// require('gulp-dev/dev.js')
require('./gulp-dev/gulpFile.js');


gulp.task('default', gulp.series(
    'clean:dev',
     gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev'),
     gulp.parallel('server:dev', 'watch:dev')

))
