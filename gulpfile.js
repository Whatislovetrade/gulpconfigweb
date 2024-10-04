const gulp = require('gulp')
// require('gulp-dev/dev.js')

// Tasks
require('./gulp-dev/gulpFile.js');
require('./gulp-dev/docks.js');


gulp.task('default', gulp.series(
    'clean:dev',
     gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev'),
     gulp.parallel('server:dev', 'watch:dev')

))

gulp.task('docks', gulp.series(
    'clean:docks',
     gulp.parallel('html:docks', 'sass:docks', 'images:docks', 'fonts:docks', 'files:docks', 'js:docks'),
     gulp.parallel('server:docks', 'watch:docks')

))
