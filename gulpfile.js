const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function(){
  gulp.src('newsFeed.css')
  .pipe(autoprefixer())
  .pipe(gulp.dest('build'))
});
