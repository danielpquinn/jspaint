var gulp = require('gulp'),
  rjs = require('gulp-requirejs');

gulp.task('build', function () {
  rjs({
    baseUrl: 'app',
    mainConfigFile: 'app/main.js',
    name: 'main',
    out: 'app/optimized.js',
    include: ['bower_components/almond/almond.js'],
    keepComments: false
  }).pipe(gulp.dest('deploy/'));
});