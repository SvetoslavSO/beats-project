const {src, dest, task, series, watch, parallel} = require('gulp');
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const sassGlob = require('gulp-sass-glob');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;
const {DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');
const gulpIf = require('gulp-if');


task( 'clean', () => {
  return src( `${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task('copy:html', () => {
  return src(`${SRC_PATH}/index.html`)
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
  return src([...STYLES_LIBS, `${SRC_PATH}/scss/main.scss`])
  .pipe(gulpif(env== 'dev', sourcemaps.init()))
  .pipe(concat('main.min.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(gulpIf(env == 'dev', 
    autoprefixer({
    cascade: true
  }))
  )
    
  .pipe(gulpif(env == 'prod', gcmq()))
  .pipe(gulpIf(env == 'prod', cleanCSS()))
  .pipe(gulpif(env == 'dev', sourcemaps.write()))
  .pipe(dest(`${DIST_PATH}/css`))
  .pipe(reload({stream : true}))
});

task('photos', ()=>{
  return src(`${SRC_PATH}/beats-pictures/*`).pipe(dest(`${DIST_PATH}/beats-pictures`));
})

task('sprite', ()=>{
  return src (`${SRC_PATH}/sprite.svg`).pipe(dest(`${DIST_PATH}`));
})

task('scripts', ()=>{
  return src([...JS_LIBS, `${SRC_PATH}/js/*.js`])
    .pipe(gulpIf(env == 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', {newLine:';'}))
    .pipe(gulpIf(env == 'dev',
      babel({
        presets: ['@babel/env']
      }))
    )
    .pipe(gulpIf(env == 'prod', uglify()))
    .pipe(gulpIf(env == 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({stream : true}))
});

task("watch", ()=>{
  watch('scss/**/*.scss', series('styles'));
  watch('index.html', series('copy:html'));
  watch('js/*.js', series ('scripts'));
});


task(
  'default', 
  series(
    'clean',  
    parallel('copy:html', 'photos', 'sprite' ,'styles', 'scripts'), 
    parallel('watch', 'server')
  )
);

task(
  'build', 
  series('clean', parallel('copy:html', 'photos', 'sprite' ,'styles', 'scripts'))
);