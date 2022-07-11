"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var path_1 = __importDefault(require("path"));
var config_1 = __importDefault(require("./2-utils/config"));
var catch_all_1 = __importDefault(require("./3-middleware/catch-all"));
var errors_model_1 = require("./4-models/errors-model");
var socketio_logic_1 = __importDefault(require("./5-logic/socketio-logic"));
var auth_controller_1 = __importDefault(require("./6-controllers/auth-controller"));
var follow_controller_1 = __importDefault(require("./6-controllers/follow-controller"));
var vacations_controller_1 = __importDefault(require("./6-controllers/vacations-controller"));
// Create server:
var expressServer = (0, express_1.default)();
// Tell express to extract json object from request body into request.body variable:
expressServer.use(express_1.default.json());
expressServer.use((0, cors_1.default)());
expressServer.use((0, express_fileupload_1.default)());
// Transfer requests to the controller:
expressServer.use('/api/', vacations_controller_1.default);
expressServer.use('/api/', follow_controller_1.default);
expressServer.use('/auth/', auth_controller_1.default);
//server images
expressServer.use(express_1.default.static(path_1.default.join(__dirname, '1-assets')));
expressServer.use(express_1.default.static(path_1.default.join(__dirname, './7-frontend')));
// If route not found:
expressServer.use('*', function (request, response, next) {
    if (config_1.default.isDevelopment) {
        var err = new errors_model_1.RouteNotFound(request.method, request.originalUrl);
        next(err);
    }
    else {
        response.sendFile(path_1.default.join(__dirname, './7-frontend/index.html'));
    }
});
// Middleware to run after controllers (if controller continues request to next middleware)
expressServer.use(catch_all_1.default);
// Listen on port 3001:
var httpServer = expressServer.listen(config_1.default.port, function () { return console.log('Listening...'); });
socketio_logic_1.default.listen(httpServer);
