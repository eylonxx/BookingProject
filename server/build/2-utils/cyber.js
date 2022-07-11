"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var errors_model_1 = require("../4-models/errors-model");
var secret = 'sodgarua';
var salt = 'badsalt';
function getNewToken(user) {
    // Object to stash inside the token:
    var payload = { user: user };
    // Generate new token:
    var token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '3h' }); // expire in 3 hours
    // Return token:
    return token;
}
function verifyToken(request) {
    return new Promise(function (resolve, reject) {
        // Extract token header (authorization: Bearer the-token):
        var header = request.headers.authorization;
        // If no such header sent:
        if (!header) {
            reject(new errors_model_1.UnauthorizedError('No token sent at all'));
            return;
        }
        // Extract the token:
        // "Bearer the-token"
        //         ^
        //  01234567
        var token = header.substring(7);
        // If no token sent:
        if (!token) {
            reject(new errors_model_1.UnauthorizedError('No token sent'));
            return;
        }
        // Here we have some token
        jsonwebtoken_1.default.verify(token, secret, function (err, payload) {
            // If token invalid or expired:
            if (err) {
                reject(new errors_model_1.UnauthorizedError('Invalid or expired token'));
                return;
            }
            resolve(true);
        });
    });
}
function getTokenRole(req) {
    // Extract token header (authorization: Bearer the-token):
    var header = req.headers.authorization;
    // Extract the token:
    var token = header.substring(7);
    // Extract payload:
    var payload = jsonwebtoken_1.default.decode(token);
    // Extract user:
    var user = payload.user;
    // return role:
    return user.role;
}
function hashPassword(plainText) {
    var hashText = crypto_1.default.createHmac('sha512', salt).update(plainText).digest('hex');
    return hashText;
}
exports.default = {
    getNewToken: getNewToken,
    verifyToken: verifyToken,
    getTokenRole: getTokenRole,
    hashPassword: hashPassword,
};
