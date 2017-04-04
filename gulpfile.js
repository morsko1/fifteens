var gulp = require('gulp'),
	open = require('gulp-open'),
	connect = require('gulp-connect');

//CONFIG
var config = {
	path: {
		src: {
			html: './*.html',
			css: './*.css',
			js: './*js'
		},
		dist: './'
	},
	localServer: {
		port: 8001,
		url: 'http://localhost:8001/'
	}
};

// HTML
gulp.task('html', function() {
	gulp.src(config.path.src.html)
	.pipe(connect.reload());
});

// CSS
gulp.task('css', function () {
	gulp.src(config.path.src.css)
	.pipe(connect.reload());
});

// JS
gulp.task('js', function () {
	gulp.src(config.path.src.js)
	.pipe(connect.reload());
});

// CONNECT
gulp.task('connect', function () {
	connect.server({
		root: './',
		port: config.localServer.port,
		livereload: true
	});
});

// BUILD
gulp.task('build', [
	'html',
	'css',
	'js'
]);

// OPEN
gulp.task('open', function(){
	gulp.src('index.html')
	.pipe(open({uri: config.localServer.url}));
});

// WATCH
gulp.task('watch', function () {
	gulp.watch(config.path.src.html, ['html']);
	gulp.watch(config.path.src.css, ['css']);
	gulp.watch(config.path.src.js, ['js']);
});

// DEFAULT
gulp.task('default', ['build', 'connect', 'open', 'watch']);