"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nav_module_1 = require("./nav/nav.module");
var module_loader_1 = require("./lib/helper/module-loader");
var auth_layout_component_1 = require("./layout/auth-layout/auth-layout.component");
var main_component_1 = require("./layout/main/main.component");
var not_found_page_component_1 = require("./layout/not-found-page/not-found-page.component");
// Authguard
var auth_guard_1 = require("projects/platform/src/app/guard/auth.guard");
// Uncomment AuthLayoutComponent untuk nyalain authentication
var routes = [
    {
        path: '',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./layout/layout.module'); }).then(function (m) { return m.LayoutModule; }); },
        component: main_component_1.MainComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    // {
    //   path: '',
    //   component: AuthLayoutComponent,
    //   children:
    //   [
    //     {
    //       path: 'auth',
    //       loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
    //     }
    //   ]
    // },
    {
        path: '**',
        component: not_found_page_component_1.NotFoundPageComponent
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule(router) {
        // roles
        this.router = router;
        module_loader_1.ModuleLoader.register('x1', function () { return Promise.resolve().then(function () { return require('./pages/inventory-addition/inventory-addition.module'); }).then(function (m) { return m.InventoryAdditionModule; }); });
        module_loader_1.ModuleLoader.register('pj', function () { return Promise.resolve().then(function () { return require('./pages/penjualan/penjualan.module'); }).then(function (m) { return m.PenjualanModule; }); });
        module_loader_1.ModuleLoader.register('lp', function () { return Promise.resolve().then(function () { return require('./pages/laporan/laporan.module'); }).then(function (m) { return m.LaporanModule; }); });
        module_loader_1.ModuleLoader.register('rl', function () { return Promise.resolve().then(function () { return require('./pages/security/security.module'); }).then(function (m) { return m.SecurityModule; }); });
        module_loader_1.ModuleLoader.register('pr', function () { return Promise.resolve().then(function () { return require('./pages/parameter/parameter.module'); }).then(function (m) { return m.ParameterModule; }); });
        module_loader_1.ModuleLoader.register('kl', function () { return Promise.resolve().then(function () { return require('./pages/keuangan/laporan/laporan.module'); }).then(function (m) { return m.LaporanKeuanganModule; }); });
        module_loader_1.ModuleLoader.register('promo', function () { return Promise.resolve().then(function () { return require('./pages/promo/promo.module'); }).then(function (m) { return m.PromoModule; }); });
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes),
                nav_module_1.NavModule
            ],
            exports: [router_1.RouterModule],
            entryComponents: [not_found_page_component_1.NotFoundPageComponent, main_component_1.MainComponent, auth_layout_component_1.AuthLayoutComponent]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
