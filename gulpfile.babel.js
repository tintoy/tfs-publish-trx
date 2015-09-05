var gulp = require("gulp");
var tsc = require("gulp-tsc");

gulp.task("default", () => {
  return gulp.src("src/**/*.ts")
    .pipe(
    	tsc({
    		target: "ES5"
    	})
    )
    .pipe(gulp.dest("dist"));
});
