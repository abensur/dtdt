import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import livereload from 'gulp-livereload';
import args from './lib/args';

gulp.task('bower', function() {
  return gulp.src('bower_components/**/*.css')
    .pipe(gulp.dest('dist/styles/bower_components'));
});

gulp.task('styles', ['bower'], function() {
  let wiredep = require('wiredep').stream;

  return gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      directory: 'bower_components',
      fileTypes: {
        scss: {
          replace: {
            scss: '@import "/src/app/{{filePath}}";'
          }
        }
      },
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulpif(args.sourcemaps, sourcemaps.init()))
    .pipe(sass({ includePaths: ['./app']}).on('error', function(error) {
      gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      this.emit('end');
    }))
    .pipe(gulp.dest(`dist/styles`))
    .pipe(gulpif(args.watch, livereload()));
});
