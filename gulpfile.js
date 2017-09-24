'use strict';

const gulp = require('gulp');
const prefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const cleanCSS = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const browserSync = require("browser-sync");
const reload = browserSync.reload;
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del');
const cache = require('gulp-cache');
const notify = require("gulp-notify");

//----------------------- Пути и настройки ----------------------------

const config = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/style/',
		img: 'build/img/',
		fonts: 'build/fonts/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/main.js',
		style: 'src/style/style.+(scss|sass)',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.+(scss|sass|css)',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	webserver: {
		server: {
			baseDir: "./build"
		},
		tunnel: 'myprojectname',
	}
};

gulp.task('browser-sync', function () {
	browserSync(config.webserver);
});

gulp.task('html:build', function () {
	gulp.src(config.src.html) 
	.pipe(rigger())
	.pipe(gulp.dest(config.build.html))
	.pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
	gulp.src(config.src.js) 
	.pipe(rigger()) 
	.pipe(sourcemaps.init()) 
	.pipe(uglify()) 
	.pipe(sourcemaps.write()) 
	.pipe(gulp.dest(config.build.js))
	.pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
	gulp.src(config.src.style) 
	.pipe(sourcemaps.init())
	.pipe(sass().on("error", notify.onError()))
	.pipe(gcmq())
	.pipe(prefixer(['> 0.1%'])) // ['last 15 versions']
	.pipe(cleanCSS({ level: 2 }))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(config.build.css))
	.pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
	gulp.src(config.src.img) 
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()],
		interlaced: true
	}))
	.pipe(gulp.dest(config.build.img))
	.pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
	gulp.src(config.src.fonts)
	.pipe(gulp.dest(config.build.fonts))
});

gulp.task('build', [
	'html:build',
	'js:build',
	'style:build',
	'fonts:build',
	'image:build'
]);


gulp.task('watch', function(){
	gulp.watch(config.watch.html, ['html:build']);
	gulp.watch(config.watch.style, ['style:build']);
	gulp.watch(config.watch.js, ['js:build']);
	gulp.watch(config.watch.img, ['image:build']);
	gulp.watch(config.watch.fonts, ['fonts:build']);
});


gulp.task('default', ['build', 'browser-sync', 'watch']);

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

// gulp.task('common-js', function() {
// 	return gulp.src([
// 		'app/js/common.js',
// 		])
// 	.pipe(concat('common.min.js'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest('app/js'));
// });

// gulp.task('scripts', ['common-js'], function() {
// 	return gulp.src([
// 		'app/libs/jquery/dist/jquery.min.js',
// 		'app/libs/mmenu/js/jquery.mmenu.all.min.js',
// 		'app/libs/owl.carousel/owl.carousel.min.js',
// 		'app/libs/fotorama/fotorama.js',
// 		'app/libs/selectize/js/standalone/selectize.min.js',
// 		'app/libs/equalHeights/equalheights.js',
// 		'app/js/common.min.js', // Всегда в конце
// 		])
// 	.pipe(concat('scripts.min.js'))
// 	// .pipe(uglify()) // Минимизировать весь js (на выбор)
// 	.pipe(gulp.dest('app/js'))
// 	.pipe(browserSync.reload({stream: true}));
// });

// gulp.task('browser-sync', function() {
// 	browserSync({
// 		server: {
// 			baseDir: 'app'
// 		},
// 		notify: false,
// 		// tunnel: true,
// 		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
// 	});
// });

// gulp.task('sass', function() {
// 	return gulp.src('app/sass/**/*.sass')
// 	.pipe(sass().on("error", notify.onError()))
// 	.pipe(rename({suffix: '.min', prefix : ''}))
// 	.pipe(autoprefixer(['last 15 versions']))
// 	.pipe(cleanCSS())
// 	.pipe(gulp.dest('app/css'))
// 	.pipe(browserSync.reload({stream: true}));
// });

// gulp.task('watch', ['sass', 'scripts', 'browser-sync'], function() {
// 	gulp.watch('app/sass/**/*.sass', ['sass']);
// 	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['scripts']);
// 	gulp.watch('app/*.html', browserSync.reload);
// });

// gulp.task('build', ['removedist', 'imagemin', 'sass', 'scripts'], function() {

// 	var buildFiles = gulp.src([
// 		'app/*.html',
// 		'app/.htaccess',
// 		]).pipe(gulp.dest('dist'));

// 	var buildCss = gulp.src([
// 		'app/css/main.min.css',
// 		]).pipe(gulp.dest('dist/css'));

// 	var buildJs = gulp.src([
// 		'app/js/scripts.min.js',
// 		]).pipe(gulp.dest('dist/js'));

// 	var buildFonts = gulp.src([
// 		'app/fonts/**/*',
// 		]).pipe(gulp.dest('dist/fonts'));

// });

// gulp.task('deploy', function() {

// 	var conn = ftp.create({
// 		host:      'hostname.com',
// 		user:      'username',
// 		password:  'userpassword',
// 		parallel:  10,
// 		log: gutil.log
// 	});

// 	var globs = [
// 	'dist/**',
// 	'dist/.htaccess',
// 	];
// 	return gulp.src(globs, {buffer: false})
// 	.pipe(conn.dest('/path/to/folder/on/server'));

// });

// gulp.task('removedist', function() { return del.sync('dist'); });
// gulp.task('clearcache', function () { return cache.clearAll(); });

// gulp.task('default', ['watch']);