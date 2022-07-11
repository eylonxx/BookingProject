"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var config_1 = __importDefault(require("./config"));
var connection = mysql_1.default.createPool({
    host: config_1.default.sqlHost,
    user: config_1.default.sqlUser,
    password: config_1.default.sqlPassword,
    database: config_1.default.sqlDatabase,
});
function execute(sql, values) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, values, function (err, result) {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}
exports.default = { execute: execute };
