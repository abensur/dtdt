import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './lib/args';

gulp.task('bower', () => {
  return gulp.src('app/bower_components/**/*')
    .pipe(gulp.dest('dist/styles/bower_components'));
});

gulp.task('pages', ['bower'], () => {
  return gulp.src('app/*.html')
    .pipe(gulp.dest(`dist`))
    .pipe(gulpif(args.watch, livereload()));
});
