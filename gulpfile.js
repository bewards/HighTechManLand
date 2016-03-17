var gulp = require('gulp');
var util = require('gulp-util');
var debug = require('gulp-debug');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var shell = require('gulp-shell')

// custom
var sass = require('gulp-sass');
var browserify = require('browserify');
var sourceStream = require('vinyl-source-stream');


var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', './public/js/modules/*.js', 'keystone.js', 'package.json'],
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	},
    'browserify': {
        src: './public/js/main.js',
        bundle: 'bundle.js',
        dest: './public/js/'
    }
};

// gulp browserify
gulp.task('browserify', ['lint'], function() {
    
    var bundleStream = browserify(paths.browserify.src).bundle();

    return bundleStream
        .pipe(sourceStream(paths.browserify.bundle))
        .pipe(gulp.dest(paths.browserify.dest));
});

// gulp lint
gulp.task('lint', function(){
	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint', function () {
	gulp.watch(paths.src, ['lint']);
});


gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function(){
	gulp.src(paths.style.all)
        .pipe(debug({title: 'debug sass before: '}))
		.pipe(sass({ includePaths: ['/node_modules/breakpoint-sass/stylesheets/'] })
              .on('error', function(e) { 
                    sass.logError;
                    util.log(e);
        }))
        .pipe(debug({title: 'debug sass after: '}))
		.pipe(gulp.dest(paths.style.output));
});
// '/node_modules/bootstrap-sass/assets/stylesheets/'

gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [

  'watch:sass',

  'watch:lint'
]);

gulp.task('default', ['watch', 'browserify', 'runKeystone']);
