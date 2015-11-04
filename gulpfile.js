var gulp = require('gulp'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'), 
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('default', ['templates', 'watch-templates', 'sass', 'watch-sass', 'lib-js', 'custom-js', 'watch-my-js']);

var options = {
    batch : ['source/templates/partials']
};

gulp.task('templates', function() {
	return gulp.src('source/templates/pages/*.handlebars')
        .pipe(handlebars(null, options))
        .pipe(rename(function(path) {
        	if (path.basename !== 'home') {
	        	path.dirname = '/' + path.basename;
        	}
        	path.basename = 'index';
        	path.extname = '.html';
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watchSass', function() {
    return gulp.watch(sassWatchFiles, ['local_sass'])
});


gulp.task('watch-templates', function() {
	return gulp.watch('source/templates/**/*.handlebars', ['templates']);
});

var sassSourceFiles = [
    'source/sass/main.scss',
    'node_modules/animate.css/animate.css'
];

gulp.task('sass', function() {
	return gulp.src(sassSourceFiles)
		.pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist/assets/css'));
});


gulp.task('watch-sass', function() {
	return gulp.watch('source/sass/**/*.scss', ['sass']);
});

var libSourceFiles = [
    'node_modules/jquery/dist/jquery.js'
];

gulp.task('lib-js', function() {
    return gulp.src(libSourceFiles)
        .pipe(concat('lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
});

var customJSFiles = [
     'source/js/**/*.js',
];

gulp.task('custom-js', function() {
    return gulp.src(customJSFiles)
        .pipe(concat('my.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('watch-my-js', function() {
    return gulp.watch(customJSFiles, ['custom-js']);
});