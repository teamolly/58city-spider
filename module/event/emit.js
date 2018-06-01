var hash = {};
var emitEvent = function ($type, $data) {
    hash[$type]($data);
    delete hash[$type];
}

var addListener = function ($type, $callback) {
    hash[$type] = $callback;
}

module.exports = {
    emitEvent: emitEvent,
    addListener: addListener
}