"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
var api;
(function (api) {
    api["auth"] = "/api/auth";
    api["user"] = "/api/user";
    api["notification"] = "/api/notification";
    api["login"] = "/login";
    api["register"] = "/register";
    api["logout"] = "/logout";
    api["findUser"] = "/find";
    api["addTolist"] = "/addToList";
    api["removeFromList"] = "/removeFromList";
    api["likes"] = "/like";
    api["dislike"] = "/dislike";
    api["getNotification"] = "/getNotification";
    api["addNotification"] = "/addNotification";
})(api || (exports.api = api = {}));