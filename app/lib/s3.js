var BPromise = require("bluebird");
var R        = require("ramda");

var ceres = require("lib/ceres");

var buildFormData = function (file, instructions) {
    var formData = new window.FormData();
    instructions.postData.forEach(function (field) {
        formData.append(field.name, field.value);
    });
    formData.append("file", file);
    return formData;
};

var transfer = function (file, instructions, progressNotifier) {
    return new BPromise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", function (evt) {
            if (evt.lengthComputable && progressNotifier) {
                progressNotifier.notify(evt.loaded, evt.total);
            }
        }, false);
        xhr.addEventListener("load", function () {
            if (xhr.status < 400) {
                resolve(instructions.download);
            } else {
                reject(xhr.statusText + " - " + xhr.status);
            }
        });
        xhr.addEventListener("error", function () {
            reject(xhr.statusText + " - " + xhr.status);
        });
        xhr.addEventListener("abort", function () {
            reject(xhr.statusText + " - " + xhr.status);
        });
        xhr.open("POST", instructions.upload, true);
        R.toPairs(instructions.headers).forEach(R.apply(function (key, value) {
            xhr.setRequestHeader(key, value);
        }));
        xhr.send(buildFormData(file, instructions));
    });
};

var upload = function (file, progressNotifier) {
    var call = ceres.call("slingshot/uploadRequest", "pictures", {
        size: file.size,
        type: file.type
    });
    return call.result
        .then(function (instructions) {
            console.log(instructions);
            return transfer(file, instructions, progressNotifier);
        });
};
exports.upload = upload;
