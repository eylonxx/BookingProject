"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var VacationModel = /** @class */ (function () {
    function VacationModel(vacation) {
        this.id = vacation.id;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.startingDate = vacation.startingDate;
        this.endingDate = vacation.endingDate;
        this.price = vacation.price;
        this.followers = vacation.followers;
    }
    VacationModel.prototype.validatePost = function () {
        var _a;
        var result = VacationModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModel.prototype.validatePut = function () {
        var _a;
        var result = VacationModel.putValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    // JOI VALIDATION
    VacationModel.postValidationSchema = joi_1.default.object({
        id: joi_1.default.forbidden(),
        description: joi_1.default.string().required(),
        destination: joi_1.default.string().required(),
        imageName: joi_1.default.string().optional(),
        image: joi_1.default.object().optional(),
        startingDate: joi_1.default.string().required(),
        endingDate: joi_1.default.string().required(),
        price: joi_1.default.number().required().positive().min(0).max(100000),
        followers: joi_1.default.number().optional().positive(),
    });
    //put validate schema
    VacationModel.putValidationSchema = joi_1.default.object({
        id: joi_1.default.required(),
        description: joi_1.default.string().required(),
        destination: joi_1.default.string().required(),
        imageName: joi_1.default.string().optional(),
        image: joi_1.default.object().optional(),
        startingDate: joi_1.default.string().required(),
        endingDate: joi_1.default.string().required(),
        price: joi_1.default.number().required().positive().min(0).max(100000),
        followers: joi_1.default.number().optional().positive(),
    });
    return VacationModel;
}());
//add joi
exports.default = VacationModel;
