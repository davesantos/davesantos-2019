var gulp      = require('gulp')
    compass   = require('gulp-compass'),
    changed   = require('gulp-changed'),
    gutil     = require('gulp-util'),
    livereload  = require('gulp-livereload'),
    del       = require('del')
    prettify  = require('gulp-prettify');

var paths = {
  css:      'css',
  images:   ['assets/**/*.jpg'],
  sass:     '_sass',
  scripts:  ['js/*.js'],
  svgs:     'assets/svg/*.svg'
};

function errorHandler(error) {
  console.error(String(error));
  this.emit('end');
  gutil.beep();
}

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['deploy'], cb);
});

// gulp.task('compass', function(){
//   return gulp.src(paths.sass)
//     // .pipe(changed('css', {extension: '.css'}))
//     .pipe(compass({
//       config_file: 'config.rb',
//       css: './css',
//       sass: '_sass', //Must not have .
//       require: ['susy'] }))
//     .on('error', errorHandler)
//     .pipe(gulp.dest('css'))
//     .pipe(livereload());
// });


gulp.task('compass', function(){
  return gulp.src(paths.sass + '/*.{sass,scss}')
    // .pipe(changed('css', {extension: '.css'}))
    .pipe(compass({
      config_file: 'config.rb',
      css: paths.css,
      sass: paths.sass, //Must not have .
      require: ['susy'] }))
    .on('error', errorHandler)
    .pipe(gulp.dest(paths.css))
    .pipe(livereload());

});


gulp.task('indent', function(){
  gulp.src(['deploy/**/*.html'])
    .pipe(prettify({
      indent_inner_html: true,
      indent_with_tabs: true,
      indent_size: 4
    }))
    .pipe(gulp.dest('deploy'));
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch( paths.sass + '/**/*.{sass,scss}', ['compass']);
  gulp.watch(['./js/*']).on('change', livereload.changed );
})

gulp.task('default', ['compass', 'watch']);