//Na vrhu gulpfile.js datoteke pišemo sve module koje ćemo koristiti
var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');
//concat-vendor služi za spajanje stranih biblioteka koje preuzimamo putem bower alata
var concatVendor = require('gulp-concat-vendor');
//sass kompajler i css obrađivači
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
//jshint
var jshint = require('gulp-jshint');

var sources = [
	'app/app.module.js',
	'app/components/place/place.module.js',
	'app/components/company/company.module.js',
	'app/components/employee/employee.module.js',
	'app/**/*.js'
];

gulp.task('vendorScripts', function() {
	return gulp.src('assets/js/*')
		.pipe(concatVendor('vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
});

gulp.task('scripts', function() {
	return gulp.src(sources)
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('sass', function () {
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

gulp.task('sass:watch', function () {
    gulp.watch(['assets/sass/**/*.scss', 'assets/css/**/*.css'], ['minCss']);
});

gulp.task('lint', function() {
    gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
	gulp.watch('app/**/*.js', ['lint'/*, 'scripts'*/]);
});

gulp.task('default', ['lint', /*'vendorScripts', 'scripts', */'watch', 'minCss', 'sass:watch', 'webserver']);