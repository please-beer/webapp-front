var sinon = require("sinon");
var should = require("should");
var proxyquire = require("proxyquire").noCallThru();
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var Immutable = require("immutable");
var u = require('react-addons-test-utils');
const render = require('react-shallow-renderer')
var assert = require('assert');
// Instantiate a fake dom
require("../test-dom.js")("<html><body></body></html>");

var Header = proxyquire("../../app/components/header/index.jsx", {
    "lib/ceres": {}
});

var reg = function (string) {
    return new RegExp(string);
};

describe("The Header component", function () {
    it("should have the current username rendered in it", function () {
        var users = Immutable.fromJS({
            userId: {
                profile: {
                    name: "username"
                }
            }
        });

        var result = ReactDOMServer.renderToStaticMarkup(<Header users={users} userId={"userId"} />);
        should(result).containEql("username");
    });
});
