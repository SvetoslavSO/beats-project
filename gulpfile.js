const {src, dest, task, series, watch} = require('gulp');
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const sassGlob = require('gulp-sass-glob');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


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
  .pipe(concat('main.min.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: true
  }))
  .pipe(gcmq())
  .pipe(cleanCSS())
  .pipe(dest('dist/css'))
  .pipe(reload({stream : true}))
});

task('photos', ()=>{
  return src('beats-pictures/*').pipe(dest('dist/beats-pictures'));
})

task('sprite', ()=>{
  return src ('sprite.svg').pipe(dest('dist'));
})

const libs = [
  "node_modules/jquery/dist/jquery.js",
  "js/*.js"
]

task('scripts', ()=>{
  return src(libs)
    .pipe(concat('main.min.js', {newLine:';'}))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(dest('dist'))
    .pipe(reload({stream : true}))
})


watch('scss/**/*.scss', series('styles'));
watch('index.html', series('copy:html'));
watch('js/*.js', series ('scripts'));
task('default', series('clean',  'copy:html', 'photos', 'sprite' ,'styles', 'scripts', 'server'));