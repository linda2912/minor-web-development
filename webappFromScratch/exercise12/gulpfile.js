var gulp = require('gulp');
var util = require('gulp-util');
var rollup = require('rollup-stream');
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglifyJS = require('gulp-uglify');
var autoprefixerCSS = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var config = {
  entryPoint: 'script.js',
  srcJS: './src/js/',
  srcCSS: './src/css/',
  srcImg: './src/img/',
  srcHTML: './src/',
  srcTemplates: './src/templates/',
  distJS: './dist/js/',
  distCSS: './dist/css/',
  distImg: './dist/img/',
  distHTML: './dist/',
  distTemplates: './dist/templates/',
  production: !!util.env.production
};

gulp.task('js', function() {
  return rollup({entry: config.srcJS + config.entryPoint})
    .pipe(source(config.entryPoint))
    .pipe(buffer())
    .pipe(babel())
    .pipe(config.production ? uglifyJS() : util.noop())
    .on('error', function(err){ console.log(err) })
    .pipe(gulp.dest(config.distJS));
});

gulp.task('css', function() {
  return gulp.src(config.srcCSS + '*.css')
    .pipe(autoprefixerCSS())
    .pipe(config.production ? minifyCSS() : util.noop())
    .on('error', function(err){ console.log(err) })
    .pipe(gulp.dest(config.distCSS));
});

gulp.task('img', function() {
  return gulp.src(config.srcImg + '*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [
        {removeViewBox: false},
        {cleanupIDs: false}
      ],
      use: [pngquant()]
    }))
    .on('error', function(err){ console.log(err) })
    .pipe(gulp.dest(config.distImg));
});

gulp.task('html', function() {
  return gulp.src(config.srcHTML + '*.html')
    .pipe(config.production ? minifyHTML({collapseWhitespace: true}) : util.noop())
    .on('error', function(err){ console.log(err) })
    .pipe(gulp.dest(config.distHTML));
});

gulp.task('template', function() {
  return gulp.src(config.srcTemplates + '*.html')
    .on('error', function(err){ console.log(err) })
    .pipe(gulp.dest(config.distTemplates));
});

gulp.task('watch', function() {
  gulp.watch(config.srcJS + '*.js', ['js']);
  gulp.watch(config.srcCSS + '*.css', ['css']);
  gulp.watch(config.srcImg + '*', ['img']);
  gulp.watch(config.srcHTML + '*.html', ['html']);
  gulp.watch(config.srcTemplates + '*.html', ['template']);
});

gulp.task('default', ['js', 'css', 'img', 'html', 'template', 'watch']);

