"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
        this.isDevelopment = process.env.NODE_ENV === 'development';
        this.isProduction = process.env.NODE_ENV === 'production';
        this.port = 0;
        this.sqlHost = '';
        this.sqlUser = '';
        this.sqlPassword = '';
        this.sqlDatabase = '';
    }
    return Config;
}());
var DevelopmentConfig = /** @class */ (function (_super) {
    __extends(DevelopmentConfig, _super);
    function DevelopmentConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.port = 3001;
        _this.sqlHost = 'localhost';
        _this.sqlUser = 'root';
        _this.sqlPassword = '';
        _this.sqlDatabase = 'booking';
        return _this;
    }
    return DevelopmentConfig;
}(Config));
var ProductionConfig = /** @class */ (function (_super) {
    __extends(ProductionConfig, _super);
    function ProductionConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.port = +process.env.PORT; // Will be set by the cloud
        _this.sqlHost = 'eu-cdbr-west-03.cleardb.net';
        _this.sqlUser = 'b526405298fd29';
        _this.sqlPassword = 'e6ca185e';
        _this.sqlDatabase = 'heroku_0d8991565806924';
        return _this;
    }
    return ProductionConfig;
}(Config));
// Connection String
// mysql://b526405298fd29:e6ca185e@eu-cdbr-west-03.cleardb.net/heroku_0d8991565806924?reconnect=true
mysql: var config = process.env.NODE_ENV === 'development' ? new DevelopmentConfig() : new ProductionConfig();
exports.default = config;
