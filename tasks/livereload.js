import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpSequence from 'gulp-sequence';
import livereload from 'gulp-livereload';
import args from './lib/args';

gulp.task('livereload', (cb) => {

  // This task runs only if the
  // watch argument is present!
  if (!args.watch) return cb();

  // Start livereload server
  livereload.listen({
    reloadPage: 'Extension',
    quiet: !args.verbose
  });

  gutil.log('Starting', gutil.colors.cyan('\'livereload-server\''));
  gulp.watch('app/manifest.json', ['manifest']);
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/pages/**/*.html', ['pages']);
  gulp.watch('app/images/**/*', ['images']);

});
