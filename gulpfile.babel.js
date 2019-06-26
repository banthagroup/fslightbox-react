import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';

function buildCSS() {
    return (
        gulp.src('./src/scss/FsLightbox.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(cleanCSS())
            .pipe(rename('dist.min.css'))
            .pipe(gulp.dest('./src/css'))
    );
}

const dist = gulp.series(buildCSS);

export {
    dist
}

export default dist;
