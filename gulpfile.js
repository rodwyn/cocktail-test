var	gulp =	require('gulp'),
		connect	=	require('gulp-connect'),
    jscs = require('gulp-jscs'),
    uglify = require('gulp-uglify'),
		inject = require('gulp-inject'),
		gulpif = require('gulp-if'),
		useref = require('gulp-useref'),
    templateCache	=	require('gulp-angular-templatecache'),
		sass = require('gulp-sass'),
		minifyCss	=	require('gulp-minify-css');
    //wiredep	=	require('wiredep').stream;

    gulp.task('server',	function() {
    	connect.server({
    		root:	'./app',
    		hostname:	'0.0.0.0',
    		port:	8080,
    		livereload:	true
    	});
    });

    gulp.task('livereload',	function() {
    	gulp.src('./app/**/*.html')
    		.pipe(connect.reload());
    });

    gulp.task('styles', function() {
  return gulp.src('./app/stylesheets/main.scss')
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(gulp.dest('./app/stylesheets'))
		.pipe(connect.reload());
  });

  gulp.task('inject', function() {
	var sources = gulp.src(['./app/stylesheets/**/*.css'], {read:false});
	return gulp.src('./app/index.html')
		.pipe(inject(sources, {relative: true}))
		.pipe(gulp.dest('./app'));
  });

  /*gulp.task('inject-bower-components', function () {
	gulp.src('./app/index.html')
		.pipe(wiredep({
			directory:	'./app/lib'
		}))
		.pipe(gulp.dest('./app'));
  });*/

  gulp.task('watch', function() {
  gulp.watch(['./app/**/*.html'], ['livereload']);
	gulp.watch(['./app/stylesheets/**/*.scss'],	['styles', 'inject']);
  //gulp.watch(['./bower.json'], ['inject-bower-components']);
});

gulp.task('default', ['styles', 'watch', 'inject', 'server']);
