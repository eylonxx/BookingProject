"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CredentialsModel = /** @class */ (function () {
    function CredentialsModel(credentials) {
        this.username = credentials.username;
        this.password = credentials.password;
    }
    return CredentialsModel;
}());
//not sure if joi needed
exports.default = CredentialsModel;
