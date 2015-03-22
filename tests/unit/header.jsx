var sinon = require("sinon");
var should = require("should");
var proxyquire = require("proxyquire").noCallThru();

var React = require("react/addons");
var Immutable = require("immutable");
var u = React.addons.TestUtils;

// Instantiate a fake dom
require("../test-dom.js")("<html><body></body></html>");

var Header = proxyquire("components/header/index.jsx", {
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
                    username: "username"
                }
            }
        });
        var header = u.findRenderedDOMComponentWithTag(
            u.renderIntoDocument(<Header users={users} userId={"userId"} />),
            "div"
        );
        var usernameSpan = React.renderToStaticMarkup(
            header.props.children[1]
        );
        usernameSpan.should.match(reg("username"));
    });
});
