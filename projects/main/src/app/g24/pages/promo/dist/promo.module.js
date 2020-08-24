"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PromoModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_1 = require("@clr/angular");
var promo_routing_module_1 = require("./promo-routing.module");
var nav_module_1 = require("../../nav/nav.module");
var forms_1 = require("@angular/forms");
var inisiasi_promo_component_1 = require("./inisiasi-promo/inisiasi-promo.component");
var pengaturan_promo_component_1 = require("./pengaturan-promo/pengaturan-promo.component");
var ng_select2_1 = require("ng-select2");
var PromoModule = /** @class */ (function () {
    function PromoModule() {
    }
    PromoModule = __decorate([
        core_1.NgModule({
            declarations: [inisiasi_promo_component_1.InisiasiPromoComponent, pengaturan_promo_component_1.PengaturanPromoComponent],
            imports: [
                common_1.CommonModule,
                promo_routing_module_1.PromoRoutingModule,
                angular_1.ClarityModule,
                nav_module_1.NavModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng_select2_1.NgSelect2Module,
            ]
        })
    ], PromoModule);
    return PromoModule;
}());
exports.PromoModule = PromoModule;
