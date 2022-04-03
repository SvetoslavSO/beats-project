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
const {DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');


task( 'clean', () => {
  return src( `${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task('copy:html', () => {
  return src('index.html')
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream:true}));
});

task('server', () => {
  browserSync.init({
      server: {
          baseDir: `${DIST_PATH}`
      },
      open: false
  });
});


task('styles', () => {
  return src([...STYLES_LIBS, 'scss/components/*.scss'])
  .pipe(concat('main.min.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: true
  }))
  .pipe(gcmq())
  .pipe(cleanCSS())
  .pipe(dest(`${DIST_PATH}/${SRC_PATH}`))
  .pipe(reload({stream : true}))
});

task('photos', ()=>{
  return src('beats-pictures/*').pipe(dest(`${DIST_PATH}/beats-pictures`));
})

task('sprite', ()=>{
  return src ('sprite.svg').pipe(dest(`${DIST_PATH}`));
})

task('scripts', ()=>{
  return src([...JS_LIBS, 'js/*.js'])
    .pipe(concat('main.min.js', {newLine:';'}))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({stream : true}))
})


watch('scss/**/*.scss', series('styles'));
watch('index.html', series('copy:html'));
watch('js/*.js', series ('scripts'));
task('default', series('clean',  'copy:html', 'photos', 'sprite' ,'styles', 'scripts', 'server'));