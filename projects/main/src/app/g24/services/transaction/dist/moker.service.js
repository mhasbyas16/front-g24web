"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MokerService = void 0;
var core_1 = require("@angular/core");
var MokerService = /** @class */ (function () {
    function MokerService(commonService) {
        this.commonService = commonService;
        this.key = "master-api/moker";
    }
    MokerService.prototype.list = function (params) {
        return this.commonService.list(this.key, params);
    };
    MokerService.prototype.count = function (params) {
        return this.commonService.count(this.key, params);
    };
    MokerService.prototype.get = function (params) {
        return this.commonService.get(this.key, params);
    };
    MokerService.prototype.message = function () {
        return this.commonService.message;
    };
    MokerService.prototype.update = function (data) {
        return this.commonService.update(this.key, data);
    };
    MokerService.prototype.add = function (data) {
        return this.commonService.add(this.key, data);
    };
    MokerService.prototype["delete"] = function (data) {
        return this.commonService["delete"](this.key, data);
    };
    MokerService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MokerService);
    return MokerService;
}());
exports.MokerService = MokerService;
