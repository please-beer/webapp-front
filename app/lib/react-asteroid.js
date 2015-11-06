var Immutable = require("immutable");
var R         = require("ramda");

var ceres = require("lib/ceres");

var getUpdatedState = function (oldState, collections) {
    // Copy the old state
    var newState = R.mapObj(R.identity, oldState || {});
    // Update changed collections
    collections.forEach(function (collection) {
        newState[collection.name] = Immutable.fromJS(collection._set._items);
        if (oldState) {
            newState[collection.name] = oldState[collection.name].mergeDeep(newState[collection.name]);
        }
    });
    // Return the new state
    return newState;
};

exports.getControllerViewMixin = function getControllerViewMixin (collectionsNames) {
    var collections = collectionsNames.map(function (name) {
        return ceres.getCollection(name);
    });
    return {
        getInitialState: function () {
            return R.merge(getUpdatedState(null, collections), {
                user: Immutable.Map()
            });
        },
        updateStateForCollection: function (collection) {
            var newState = getUpdatedState(this.state, [collection]);
            this.setState(newState);
        },
        setUserId: function () {
            var user = ceres.collections.users._set._items[ceres.userId] || {};
            this.setState({
                userId: ceres.userId,
                user: Immutable.fromJS(user)
            });
        },
        componentDidMount: function(){
            collections.forEach((function (collection) {
                //if (collection.length)
                {//TODO
                var update = R.partial(this.updateStateForCollection, collection);
                collection._set.on("put", update);
                collection._set.on("del", update);}
            }).bind(this));
            ceres.on("login", this.setUserId);
            ceres.on("logout", this.setUserId);
        },
        componentWillUnmount: function () {
            ceres.off("login", this.setUserId);
            ceres.off("logout", this.setUserId);
        }
    };
};

exports.SubscriptionMixin = {
    getInitialState: function () {
        return {
            subscriptions: []
        };
    },
    subscribe: function (/* subscription arguments */) {
        this.setState({
            subscriptions: R.append(
                ceres.subscribe.apply(ceres, arguments), this.state.subscriptions
            )
        });
    },
    componentWillUnmount: function () {
        this.state.subscriptions.forEach(function (subscription) {
            subscription.stop();
        });
    }
};
