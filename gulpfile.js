var gulp = require('gulp');
var util = require('gulp-util');
var debug = require('gulp-debug');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var shell = require('gulp-shell')

var sass = require('gulp-sass');


var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']

,
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	}

};

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

gulp.task('default', ['watch', 'runKeystone']);
