var browserify   = require("browserify");
var browserSync  = require("browser-sync");
var fs           = require("fs");
var gulp         = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var concat       = require("gulp-concat");
var rename       = require("gulp-rename");
var sass         = require("gulp-sass");
var mocha        = require("gulp-spawn-mocha");
var gutil        = require("gulp-util");
var source       = require("vinyl-source-stream");
var watchify     = require("watchify");
var watch        = require("gulp-watch");
var reactify     = require('reactify');

var reactifyES6  = function(file) {
  return reactify(file, {'es6': true});
};



/*
*   Tasks to build app and vendor javascript files
*/
gulp.task("js", function () {
    // Build app js files
    var bundler= watchify(browserify("./app/main.jsx", {
        paths: ["./app"],
        extensions: [".jsx"],
        cache: {},
        packageCache: {},
        fullPaths: true
    }));
    var bundle = function () {
        return bundler.bundle()
            .on("error", gutil.log.bind(gutil, "Browserify Error"))
            .pipe(source("bundle.js"))
            .pipe(rename("app.js"))
            .pipe(gulp.dest("./builds/assets/js/"))
            .pipe(reload({stream: true}));
    };
    bundler.transform(reactifyES6);
    bundler.on("update", bundle);
    bundler.on("log", gutil.log);
    bundle();
    // Build vendor js files
    var buildVendorJs = function () {
        var deps = JSON.parse(fs.readFileSync("./deps.json"));
        gulp.src(deps.js)
            .pipe(concat("vendor.js"))
            .pipe(gulp.dest("./builds/assets/js/"))
            .pipe(reload({stream: true}));
    };
    watch("./deps.json", buildVendorJs);
    buildVendorJs();
});



/*
*   Task to run unit tests
*/
gulp.task("tests", function () {
    var runTests = function () {
        gulp.src("./tests/unit/**/*.jsx")
            .pipe(mocha({
                compilers: ".:./tests/compiler.js",
                reporter: "mochawesome",
                noExit: true,
                istanbul: {
                    dir: "./builds/coverage/"
                },
                env: {
                    NODE_PATH: "./app/",
                    MOCHAWESOME_REPORTDIR: "./builds/tests/",
                    MOCHAWESOME_REPORTNAME: "index"
                }
            }))
            .pipe(reload({stream: true}));
    };
    watch(["./app/**/*.jsx", "./tests/unit/**/*.jsx"], runTests);
    runTests();
});

/*
*   Task to run unit tests quickly - without coverage
*/
gulp.task("quicktests", function () {
    var runTests = function () {
        gulp.src("./tests/unit/**/*.jsx")
            .pipe(mocha({
                compilers: ".:./tests/compiler.js",
                reporter: "mochawesome",
                noExit: true,
                env: {
                    NODE_PATH: "./app/",
                    MOCHAWESOME_REPORTDIR: "./builds/tests/",
                    MOCHAWESOME_REPORTNAME: "index"
                }
            }));
    };
    watch(["./app/**/*.jsx", "./tests/unit/**/*.jsx"], runTests);
    runTests();
});
/*
*   Task to run unit test and istanbul coverage with gulp-jsx-coverage
*/
require('gulp').task('coverage', require('gulp-jsx-coverage').createTask({
    src: ["./tests/unit/**/*.jsx"],
    istanbul: {
        coverageVariable: '__MY_TEST_COVERAGE__',
        exclude: /node_modules|test[0-9]/
    },
    transpile: {
        babel: {
            include: /\.jsx?$/,
            exclude: /node_modules/,
            omitExt: ['.jsx']
        },
        coffee: {
            include: /\.coffee$/
        }
    },
    coverage: {
        reporters: ['text', 'json', 'lcov'],
        directory: 'coverage'
    },
    mocha: {
        reporter: 'spec'
    },
    babel: {
        presets: ['es2015', 'react'],
        sourceMap: 'both'
    },
    env: {
        NODE_PATH: "./app/",
    },
    coffee: {
        sourceMap: true
    }
}));



/*
*   Tasks to build app html files
*/
gulp.task("html", function () {
    var buildHtml = function () {
        gulp.src("./app/main.html")
            .pipe(rename("index.html"))
            .pipe(gulp.dest("./builds/"))
            .pipe(reload({stream: true}));
    };
    watch("./app/main.html", buildHtml);
    buildHtml();
});



/*
*   Tasks to build app and vendor css files
*/
gulp.task("css", function () {
    var buildAppCss = function () {
        gulp.src("./app/main.scss")
            .pipe(sass())
            .pipe(autoprefixer("last 3 version"))
            .pipe(rename("app.css"))
            .pipe(gulp.dest("./builds/assets/css/"))
            .pipe(reload({stream: true}));
    };
    var buildVendorCss = function () {
        var deps = JSON.parse(fs.readFileSync("./deps.json"));
        gulp.src(deps.css)
            .pipe(concat("vendor.css"))
            .pipe(gulp.dest("./builds/assets/css/"))
            .pipe(reload({stream: true}));
    };
    watch("./deps.json", buildVendorCss);
    watch("./app/**/*.scss", buildAppCss);
    buildVendorCss();
    buildAppCss();
});


/*
*   Tasks to vendor image assets
*/
gulp.task("assets", function () {
    var copyImages = function () {
        gulp.src("./app/assets/images/**/*.*")
            .pipe(gulp.dest("./builds/assets/images/"))
            .pipe(reload({stream: true}));
    };
    watch("./app/assets/images/**/*.*", copyImages);
    copyImages();

    var copyFonts = function () {
        gulp.src("./app/assets/fonts/**/*.*")
            .pipe(gulp.dest("./builds/assets/fonts/"))
            .pipe(reload({stream: true}));
    };
    watch("./app/assets/fonts/**/*.*", copyFonts);
    copyFonts();
});


/*
*   Task to setup the development server
*/
var reload = browserSync.reload;
gulp.task("serve", function() {
    var reg = new RegExp("/assets/|/tests/|/coverage/");
    browserSync({
        server: {
            baseDir: "./builds",
            middleware: function (req, res, next) {
                if (!reg.test(req.url)) {
                     req.url = "/";
                }
                next();
            }
        },
        port: 8080,
        ghostMode: false,
        injectChanges: false,
        notify: false
    });
});



/*
*   Default task
*/

gulp.task("default", [
    "js",
    "html",
    "css",
    "assets",
    //"tests",
    "serve"
]);
