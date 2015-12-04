import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './lib/args';


gulp.task('pages', () => {
  return gulp.src('app/*.html')
    .pipe(gulp.dest(`dist`))
    .pipe(gulpif(args.watch, livereload()));
});
