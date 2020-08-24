"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PengaturanPromoComponent = void 0;
var core_1 = require("@angular/core");
var emenu_id_enum_1 = require("../../../lib/enums/emenu-id.enum");
var pages_1 = require("../../../decorators/content/pages");
var forms_1 = require("@angular/forms");
var PengaturanPromoComponent = /** @class */ (function () {
    function PengaturanPromoComponent() {
        this.manualWizard = false;
        this.penjualanWizard = false;
        this.selectdistro = false;
        this.section1_penjualan = null;
    }
    PengaturanPromoComponent_1 = PengaturanPromoComponent;
    PengaturanPromoComponent.prototype.ngOnInit = function () {
        this.form();
        this.data = [
            {
                id: 'opt1',
                text: 'Options 1'
            },
            {
                id: 'opt2',
                text: 'Options 2'
            },
            {
                id: 'opt3',
                text: 'Options 3'
            },
            {
                id: 'opt4',
                text: 'Options 4'
            }
        ];
        this.options = {
            multiple: true,
            theme: 'classic',
            closeOnSelect: false,
            width: '300'
        };
    };
    PengaturanPromoComponent.prototype.select2Distro = function (val) {
        if (val == "sd") {
            this.selectdistro = false;
        }
        else if (val == 'pd') {
            this.selectdistro = true;
        }
    };
    PengaturanPromoComponent.prototype.selectKuota = function (val) {
    };
    PengaturanPromoComponent.prototype.form = function () {
        this.section1_penjualan = new forms_1.FormGroup({
            programName: new forms_1.FormControl("", forms_1.Validators.required),
            periodeFrom: new forms_1.FormControl("", forms_1.Validators.required),
            periodeTo: new forms_1.FormControl("", forms_1.Validators.required),
            location: new forms_1.FormControl("", forms_1.Validators.required),
            product: new forms_1.FormControl("", forms_1.Validators.required),
            kuotaPromo: new forms_1.FormControl("", forms_1.Validators.required)
        });
    };
    PengaturanPromoComponent.prototype.openWizard = function (val) {
        console.debug(val, "selected");
        if (val == 'manual') {
        }
        else if (val == 'penjualan') {
            this.penjualanWizard = true;
        }
    };
    PengaturanPromoComponent.prototype.viewSelect = function (val) {
        console.debug(this.section1_penjualan.get("location").value, "isi select2");
    };
    var PengaturanPromoComponent_1;
    PengaturanPromoComponent.key = emenu_id_enum_1.EMenuID.PENGATURAN_PROMO;
    __decorate([
        core_1.ViewChild("manual")
    ], PengaturanPromoComponent.prototype, "wizardManual");
    __decorate([
        core_1.ViewChild("penjualan")
    ], PengaturanPromoComponent.prototype, "wizardPenjualan");
    PengaturanPromoComponent = PengaturanPromoComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-pengaturan-promo',
            templateUrl: './pengaturan-promo.component.html',
            styleUrls: ['./pengaturan-promo.component.scss']
        }),
        pages_1.DContent(PengaturanPromoComponent_1.key)
    ], PengaturanPromoComponent);
    return PengaturanPromoComponent;
}());
exports.PengaturanPromoComponent = PengaturanPromoComponent;
