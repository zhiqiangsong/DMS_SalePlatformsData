/*global require*/
/*command: 
    1. gulp 
    2. gulp --dev
    3. gulp --qa
    4. gulp --prod
    5. gulp mock-gulpfiles.js
*/
'use strict';
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify-es').default,
    cleanCss = require('gulp-clean-css'),
    minifyHtml = require('gulp-minify-html'),
    jsonminify = require('gulp-jsonminify'),
    replace = require('gulp-replace'),
    removeCode = require('gulp-remove-code'),
    stripLine = require('gulp-strip-line'),
    removeLines = require('gulp-remove-empty-lines'),
    templateCache = require('gulp-angular-templatecache'),
    wait = require("gulp-wait2"),
    destFolder="../bxDest/",
    deployFolder=destFolder+"deploy/",

    paths = {
        //the order matters for all app.xxx.js
        apiScripts: ['api/**/*.js'],
        apiJson: ['api/**/*.json'],
        dbConfig: ['db-config/**/.*.*'],
        logs: ['logs/**/*.*'],
        localScripts: [
            'web/js/app.js',
            'web/js/app/*.*',
            'web/js/controllers/*.*',
            'web/js/directives/*.*',
            'web/js/filters/*.*',
            'web/js/services/*.*'
            // ,'!web/js/mock/**'//exclude path
        ], //order matters
        css: ['web/css/base.css','web/css/bx.css'],//order matters
        // json: ['json/*.json'],
	    htmlPartials: ['web/partials/*.html'],
        unifiedjs:[deployFolder+'web/js/bx.min.js',deployFolder+'web/partials/templates.js'],
        index:['web/index.html'],
	    jsCssLibrary: ['bower_components/**/*.*']
    },
    argv = require('yargs').argv,
    isProduction=argv.prod,
    isQA=argv.qa;
    // gulpCallback = require('./gulp-helper.js')
    let d=new Date();
	let formatDate =  d.getFullYear()+("0"+(d.getMonth()+1)).slice(-2)+("0"+d.getDate()).slice(-2);
	let formatTime = ("0"+d.getHours()).slice(-2)+("0"+d.getMinutes()).slice(-2)+("0"+d.getSeconds()).slice(-2);
    let timestamp=formatDate+formatTime;

gulp.task('default', function() {
  // place code for your default task here
  console.log("Done!")
});
gulp.task('backupLog', function() {
  gulp.src(deployFolder+paths.logs)
        .pipe(gulp.dest(destFolder+'logs/'));
});

gulp.task('clean', ['backupLog'],function() {
    return gulp.src([deployFolder])
        .pipe(clean({force:true}))
        .pipe(wait(1500));
});

gulp.task('bower_components', ['clean'], function() {
    gulp.src(paths.jsCssLibrary)
        .pipe(gulp.dest(deployFolder+'bower_components/'));
});
gulp.task('apiScripts', ['clean'], function() {
    return gulp.src(paths.apiScripts)
        .pipe(uglify())
        .pipe(gulp.dest(deployFolder+'api'));
});
gulp.task('apiJson', ['clean'], function() {
    return gulp.src(paths.apiJson)
        .pipe(jsonminify())
        .pipe(gulp.dest(deployFolder+'api'));
});
gulp.task('dbConfig', ['clean'], function() {
    return gulp.src(paths.dbConfig)
        .pipe(jsonminify())
        .pipe(gulp.dest(deployFolder+'db-config'));
});
gulp.task('logs', ['clean'], function() {
    return gulp.src(destFolder+paths.logs)
        .pipe(gulp.dest(deployFolder+'logs/'));
});

gulp.task('localScripts', ['clean'], function() {
    return gulp.src(paths.localScripts)
        .pipe(ngAnnotate())
        .pipe(replace(/\.html\'/g, '\.html?ts='+timestamp+'\''))
        .pipe(uglify())
        .pipe(concat('bx.min.js'))
        .pipe(gulp.dest(deployFolder+'web/js'));
});

gulp.task('copy-mediaFolders', ['clean'], function() {
    gulp.src('web/media/**/*.*').pipe(gulp.dest(deployFolder+'web/media/'));
});

gulp.task('css', ['clean'], function() {
    return gulp.src(paths.css)
        .pipe(cleanCss())
        .pipe(concat('bx.min.css'))
        .pipe(gulp.dest(deployFolder+'web/css'));
});
gulp.task('copy-serverjs', ['clean'], function() {
    gulp.src('./server.js')
    .pipe(uglify())
    .pipe(gulp.dest(deployFolder));
});



gulp.task('template',['clean'], function() {
 return gulp.src(paths.htmlPartials)
     .pipe(removeCode({ production: isProduction }))
            .pipe(minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            }))
     .pipe(removeLines())
     .pipe(replace(/\.html\'/g, '\.html?ts='+timestamp+'\''))
    .pipe(templateCache({
        root:"partials/",
        module:"bx",
        transformUrl: function(url) {
            return url.replace(/\.html/, '.html?ts='+timestamp)
        }
    }))
    .pipe(gulp.dest(deployFolder+'web/partials'));
});

gulp.task('mergeJsWithPartials',['localScripts','template'], function() {
    return gulp.src(paths.unifiedjs)
        .pipe(concat('bx.min.js'))
        .pipe(gulp.dest(deployFolder+'web/js'));
    });

gulp.task('index', ['clean'], function() {
    var today = new Date().getTime();

    gulp.src(paths.index)
        // .pipe(replace(/##GULP-BUILD##/, today))
        .pipe(stripLine(/'js\/[A-z_\d.-]*\.js'/))
        .pipe(stripLine(/'js\/[A-z_\d.-]*\/[A-z_\d.-]*\.js'/))
        .pipe(stripLine(/remove place holder/))
        .pipe(replace(/\/\/minify js place holder/g, '\'js/bx.min.js\?ts='+timestamp+'\''))
        .pipe(stripLine(/<link rel="stylesheet" href="css\/[A-z_\d.-]*\.css/))
        .pipe(replace(/<!-- compact css place holder -->/g, '<link rel=\'stylesheet\' href=\'css/bx.min.css\?ts='+timestamp+'\'>'))
        .pipe(replace(/\.html\'\"/g, '\.html?ts='+timestamp+'\'\"'))
        // .pipe(replace(/\.html\'\"/g, '\.html\'\"'))
        .pipe(minifyHtml({
            empty: true,
            comments: true,
            spare: true,
            quotes: true,
            loose: true
        }))
        .pipe(removeLines())
        .pipe(gulp.dest(deployFolder+'web'));
});
gulp.task('remove-partials',['mergeJsWithPartials'], function() {
    return gulp.src([deployFolder+'web/partials'])
        .pipe(clean({force:true}));
});
gulp.task('dependencies',['clean'],function(){
    gulp.src(["./package.json","./package-lock.json"])
    // .pipe(jeditor(function(json) {
    //   json.devDependencies = undefined;
    //   return json; // must return JSON object.
    // }))
    .pipe(gulp.dest(destFolder));
})
gulp.task('watch', function() {
    gulp.watch(paths.localScripts, ['localScripts']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.htmlPartials, ['htmlPartials']);
});
gulp.task('default', [
    'backupLog'
    ,'bower_components'
    ,'apiScripts'
    ,'localScripts'
    ,'apiJson'
    ,'css'
    ,'template'
    ,'dbConfig'
    ,'copy-serverjs'
    ,'logs'
    ,'mergeJsWithPartials'
    ,'copy-mediaFolders'
    ,'remove-partials'
    ,'dependencies'
    ,'index'
]);
//gulp.task('default', ['bower_components','copy-mediaFolders','scripts','aceCss','css','template','index']);


