const {src, dest, task, series, watch} = require('gulp');
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const sassGlob = require('gulp-sass-glob');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;


task( 'clean', () => {
  return src( 'dist/**/*', { read: false }).pipe(rm());
});

task('copy:html', () => {
  return src('index.html')
  .pipe(dest('dist'))
  .pipe(reload({stream:true}));
});

task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: false
  });
});

const styles = [
  'node_modules/normalize.css/normalize.css',
  'scss/main.scss'
]

task('styles', () => {
  return src(styles)
  .pipe(concat('main.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('dist/css'));
});


watch('scss/**/*.scss', series('styles'));
watch('index.html', series('copy:html'));
task('default', series('clean',  'copy:html', 'styles', 'server'));