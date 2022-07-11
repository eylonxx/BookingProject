"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var UserModel = /** @class */ (function () {
    function UserModel(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }
    UserModel.prototype.validatePost = function () {
        var _a;
        var result = UserModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    // JOI VALIDATION
    UserModel.postValidationSchema = joi_1.default.object({
        id: joi_1.default.forbidden(),
        firstName: joi_1.default.string().required().min(2).max(16),
        lastName: joi_1.default.string().required().min(2).max(16),
        username: joi_1.default.string().required().min(4).max(16),
        password: joi_1.default.string().required().min(4).max(16),
        role: joi_1.default.string(),
    });
    return UserModel;
}());
exports.default = UserModel;
