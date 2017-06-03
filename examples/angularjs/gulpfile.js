var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');
var bowerFiles = require('bower-files')();
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var jshint = require('gulp-jshint');

var jsSources = [
  'app/app.module.js',
  'app/shared/i18n/i18n.module.js',
  'app/shared/shared.module.js',
  'app/components/place/place-modal/place-modal.module.js',
  'app/components/place/place.module.js',
  'app/components/company/company.module.js',
  'app/components/employee/employee.module.js',
  'app/**/*.js'
];

gulp.task('vendorScripts', function() {
  return gulp.src(bowerFiles.ext('js').files)
  .pipe(concat('vendor.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist'))
});

gulp.task('scripts', function() {
  return gulp.src(jsSources)
  .pipe(concat('all.min.js'))
  // .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

gulp.task('webserver', function() {
  gulp.src('.')
  .pipe(webserver({
    livereload: true,
    open: false,
    port: 3000
  }));
});

gulp.task('sass', function() {
  gulp.src('assets/sass/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('assets/css'));
});

gulp.task('minCss', ['sass'], function() {
  gulp.src('assets/css/**/*.css')
  .pipe(concatCss("all.min.css"))
  .pipe(minifyCss())
  .pipe(gulp.dest('dist'));
});

gulp.task('sass:watch', function() {
  gulp.watch(['assets/sass/**/*.scss', 'assets/css/**/*.css'], ['minCss']);
});

gulp.task('lint', function() {
  gulp.src('app/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['lint', 'scripts']);
});

gulp.task('build', ['lint', 'minCss', 'vendorScripts', 'scripts']);

gulp.task('default', [
  'lint',
  'vendorScripts',
  'scripts',
  'watch',
  'minCss',
  'webserver'
]);