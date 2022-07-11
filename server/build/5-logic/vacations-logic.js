"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = __importDefault(require("fs/promises"));
var uuid_1 = require("uuid");
var dal_1 = __importDefault(require("../2-utils/dal"));
var errors_model_1 = require("../4-models/errors-model");
function getAllVacations() {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "\n    SELECT\n    id,\n    description,\n    destination,\n    imageName,\n    startingDate,\n    endingDate,\n    price,\n    followers\n    FROM vacations\n    ";
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    vacations = _a.sent();
                    return [2 /*return*/, vacations];
            }
        });
    });
}
function getOneVacation(id) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "\n    SELECT\n    id,\n    description,\n    destination,\n    imageName,\n    startingDate,\n    endingDate,\n    price,\n    followers\n    FROM vacations\n    WHERE id = ?\n    ";
                    return [4 /*yield*/, dal_1.default.execute(sql, [id])];
                case 1:
                    vacation = _a.sent();
                    return [2 /*return*/, vacation];
            }
        });
    });
}
function createVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dotIndex, imageExtension, description, destination, startingDate, endingDate, price, sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = vacation.validatePost();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    if (!vacation.image) return [3 /*break*/, 2];
                    dotIndex = vacation.image.name.lastIndexOf('.');
                    imageExtension = vacation.image.name.substring(dotIndex);
                    vacation.imageName = (0, uuid_1.v4)() + imageExtension;
                    return [4 /*yield*/, vacation.image.mv('./1-assets/images/' + vacation.imageName)];
                case 1:
                    _a.sent();
                    //dont want to return the image
                    delete vacation.image;
                    _a.label = 2;
                case 2:
                    //fix timezone diff with mariadb
                    //since were gmt+3 and date is being saved as yyyy-mm-ddT00:00:00, it is being read as 3 hours earlier
                    //so i have pushed in 3 hours ahead
                    vacation.startingDate = vacation.startingDate + 'T03:00:00.000Z';
                    vacation.endingDate = vacation.endingDate + 'T03:00:00.000Z';
                    description = vacation.description, destination = vacation.destination, startingDate = vacation.startingDate, endingDate = vacation.endingDate, price = vacation.price;
                    sql = "\n    INSERT INTO\n    vacations (description, destination, imageName, startingDate, endingDate, price)\n    VALUES(?, ?, ?, ?, ?, ?)\n    ";
                    return [4 /*yield*/, dal_1.default.execute(sql, [
                            description,
                            destination,
                            vacation.imageName,
                            startingDate,
                            endingDate,
                            price,
                        ])];
                case 3:
                    result = _a.sent();
                    vacation.id = result.insertId;
                    return [2 /*return*/, vacation];
            }
        });
    });
}
function updateVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, id, description, destination, startingDate, endingDate, price, dotIndex, imageExtension, sql, updatedVacation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = vacation.validatePut();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    vacation.startingDate = vacation.startingDate + 'T04:00:00.000Z';
                    vacation.endingDate = vacation.endingDate + 'T04:00:00.000Z';
                    id = vacation.id, description = vacation.description, destination = vacation.destination, startingDate = vacation.startingDate, endingDate = vacation.endingDate, price = vacation.price;
                    if (!vacation.image) return [3 /*break*/, 2];
                    dotIndex = vacation.image.name.lastIndexOf('.');
                    imageExtension = vacation.image.name.substring(dotIndex);
                    vacation.imageName = (0, uuid_1.v4)() + imageExtension;
                    return [4 /*yield*/, vacation.image.mv('./1-assets/images/' + vacation.imageName)];
                case 1:
                    _a.sent();
                    //dont want to return the image
                    delete vacation.image;
                    _a.label = 2;
                case 2:
                    sql = "\n    UPDATE vacations\n    SET \n    description = ?, \n    destination = ?, \n    ".concat(vacation.imageName ? "imageName = '".concat(vacation.imageName, "',") : '', "\n    startingDate = ?, \n    endingDate = ?, \n    price = ?\n    WHERE id = ?\n    ");
                    return [4 /*yield*/, dal_1.default.execute(sql, [description, destination, startingDate, endingDate, price, id])];
                case 3:
                    updatedVacation = _a.sent();
                    return [2 /*return*/, updatedVacation];
            }
        });
    });
}
function deleteVacation(id) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, deletedVacation, imageToDelete;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "\n    DELETE FROM vacations\n    WHERE id = ? \n    RETURNING *\n    ";
                    return [4 /*yield*/, dal_1.default.execute(sql, [id])];
                case 1:
                    deletedVacation = _a.sent();
                    imageToDelete = deletedVacation[0].imageName;
                    //deleting from path
                    promises_1.default.unlink('./1-assets/images/') + imageToDelete;
                    return [2 /*return*/, deletedVacation[0]];
            }
        });
    });
}
exports.default = { getAllVacations: getAllVacations, getOneVacation: getOneVacation, createVacation: createVacation, updateVacation: updateVacation, deleteVacation: deleteVacation };
