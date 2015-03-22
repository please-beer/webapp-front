var R = require("ramda");

var throttle = function throttle (fn, limit) {
    var inQueue = false;
    var latestArgs;
    return function () {
        var self = this;
        latestArgs = arguments;
        if (!inQueue) {
            setTimeout(function () {
                fn.apply(self, latestArgs);
                inQueue = false;
            }, limit);
            inQueue = true;
        }
    };
};
exports.throttle = throttle;

var filterObjIndexed = R.curry(function filterObjIndexed (filter, object) {
    return R.pipe(
        R.toPairs,
        R.filter(R.apply(R.flip(filter))),
        R.fromPairs
    )(object);
});
exports.filterObjIndexed = filterObjIndexed;

/*
*   The object returned by delta is an object containing all properties of obj_2
*   which differ from those of obj_1. If obj_1 has a property which obj_2
*   doesn't have, that property will not appear in the delta.
*
*   Basically, delta reduces obj_2 to the minimum object obj_m for which the
*   the following holds true:
*
*       R.eqDeep( R.merge(obj_1, obj_2) , R.merge(obj_1, obj_m) )
*
*   Example:
*
*   var obj_1 = {a:0, b:0, c:0};
*   var obj_2 = {a:1, b:0};
*
*   var delta = delta(obj_1, obj_2);
*   assert( R.eqDeep({a:1}, delta) );
*
*   var merge_1 = R.merge(obj_1, obj_2);
*   assert( R.eqDeep({a:1, b:0, c:0}, merge_1));

*   var merge_2 = R.merge(obj_1, delta);
*   assert( R.eqDeep({a:1, b:0, c:0}, merge_2));
*
*   assert( R.eqDeep(merge_1, merge_2));
*
*/
var delta = function delta (obj_1, obj_2) {
    return filterObjIndexed(function (val, key) {
        return !R.eqDeep(val, obj_1[key]);
    }, obj_2);
};
exports.delta = delta;

var dataURLToFile = function (dataURL) {
    /*
    *   The dataURL is a string like:
    *
    *   data:image/png;base64,iVBORw0KGgoAAA...
    *
    *   First we split it at the comma. Now parts[0] holds the metadata, while
    *   parts[1] holds the content.
    */
    var parts = dataURL.split(",");
    /*
    *   Build Uint8Array from the content
    */
    var content = atob(parts[1]);
    var array = [];
    for (var i=0; i<content.length; i++) {
        array.push(content.charCodeAt(i));
    }
    var uint8Array = new Uint8Array(array);
    /*
    *   Parse out the mime type from the metadata.
    */
    var mime = parts[0].split(":")[1].split(";")[0];
    /*
    *   Build and return the Blob.
    */
    return new Blob([uint8Array], {type: mime});
};
exports.dataURLToFile = dataURLToFile;

var fileToDataURL = function (file, cb) {
    var reader = new FileReader();
    reader.onload = function (evt) {
        cb(evt.target.result);
    };
    reader.readAsDataURL(file);
};
exports.fileToDataURL = fileToDataURL;
