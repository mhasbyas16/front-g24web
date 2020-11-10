import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PERHIASAN, LM, GS, BERLIAN, DINAR } from '../../../sample/cart';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

//service 
import { ProductService } from '../../../services/product/product.service';
import { ClientService } from '../../../services/client/client.service';
import { BankService } from '../../../services/transaction/bank.service';
import { TransactionMethodService } from '../../../services/transaction/transaction-method.service';
import { TransactionBankMethodService } from '../../../services/transaction/transaction-bank-method.service';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { TransactionEdcTypeService } from '../../../services/transaction/transaction-edc-type.service';
import { TransactionCardTypeService } from '../../../services/transaction/transaction-card-type.service';
import { TransactionBankInstallmentService } from '../../../services/transaction/transaction-bank-installment.service';
import { TransactionFlagService } from '../../../services/transaction/transaction-flag.service';
import { TransactionTypeService } from '../../../services/transaction/transaction-type.service';
import { CurrencyService } from '../../../services/transaction/currency.service';

// session service
import { UserService } from 'projects/platform/src/app/services/security/user.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DatePipe } from '@angular/common';
import { ContentPage } from '../../../lib/helper/content-page';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [DatePipe]
})
export class CheckoutComponent implements OnInit {

  //
  @Output() cartModal = new EventEmitter();

  validModel: boolean = false;
  bankForm: boolean = false;
  edc: boolean = false;
  edc2: boolean = false;
  edc3: boolean = false;
  installmentCont: boolean = false;
  periodeIns: boolean = false;
  // cart
  administrasi: string = "";
  perhiasan = PERHIASAN;
  lm = LM;
  gs = GS;
  berlian = BERLIAN;
  dinar = DINAR;

  // total harga
  totalBelanja: number;
  checkoutModal: boolean;
  nikUser: any;

  // cart list
  P: any;
  logam: any;
  gift: any;
  B: any;
  D: any;

  //
  formData: FormGroup = null;
  //
  isiClientData = null;
  //
  detail: any;
  bank: any;
  edcTipe: any;
  cardTipe: any;
  bankInstallment: any;
  transactionMethod: any;
  transactionBankMethod: any;
  installmentPeriod: any;
  kembali: any;
  diterima: any;

  kasirId: FormControl= null;
  coa: FormControl= null;
  valid: boolean = false;

  nikValid : boolean = false;
jual = null;
branchCode = "";
select = null;
isBuyback = false;
dat = null;

  idtransaksi: any;
  constructor(
    private clientService: ClientService,
    private bankService: BankService,
    private transactionMethodService: TransactionMethodService,
    private transactionBankMethodService: TransactionBankMethodService,
    private transactionService: TransactionService,
    private transactionEdcType: TransactionEdcTypeService,
    private transactionCardType: TransactionCardTypeService,
    private transactionBankInstallment: TransactionBankInstallmentService,
    private userService: UserService,
    private transactionFlagService: TransactionFlagService,
    private productService: ProductService,
    private transactionTypeService: TransactionTypeService,
    private currencyService:CurrencyService,
    //ng
    private toastr: ToastrService,
    private sessionService: SessionService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.nikUser = this.sessionService.getUser();
    this.nikUser = { "_hash": btoa(JSON.stringify(this.nikUser)), "nik": this.nikUser["username"], "name": this.nikUser["name"], "username": this.nikUser["username"] };
    
  }

  idTransaksi() {
    this.idtransaksi = null;
    let inc = null;
    let d1 = this.datePipe.transform(Date.now(), '01/01/yyyy');
    let d2 = this.datePipe.transform(Date.now(), '12/31/yyyy');
    let d3 = this.datePipe.transform(Date.now(), 'yy');
    let unit = this.sessionService.getUnit();

    let params = "?_between=makerDate&_start=" + d1 + "&_end=" + d2;
    this.transactionService.list(params + '&_sortby=_id:0&_rows=1').subscribe((response: any) => {
      let count = null;
      if (response["0"]["idAi"] == null) {
        count = JSON.stringify(1);
      }else{
        count = JSON.stringify(Number(response["0"]["idAi"]) + 1);

      }
      switch (count.length) {
        case 1:
          inc = "000000" + count;
          break;
        case 2:
          inc = "00000" + count;
          break;
        case 3:
          inc = "0000" + count;
          break;
        case 4:
          inc = "000" + count;
          break;
        case 5:
          inc = "00" + count;
          break;
        case 6:
          inc = "0" + count;
          break;
        case 7:
          inc = count;
          break;
        default:
          break;
      }
      // this.idtransaksi = "5502906200000054"
      this.idtransaksi = unit.code + "06" + d3 + inc;
      this.formData.patchValue({ idTransaction: this.idtransaksi, idAi: Number(response["0"]["idAi"]) + 1 });
    });

  }

  refreshId() {
    this.idTransaksi();
  }

  openModal(totalHarga: any) {

    this.formData = new FormGroup({
      idTransaction: new FormControl(""),
      idTransaction_validation: new FormControl("unique:idTransaction"),
      cif: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      name: new FormControl("", [Validators.required]),
      client: new FormControl("", Validators.required),
      client_encoded: new FormControl("base64"),
      metodeBayar: new FormControl("", Validators.required),
      metodeBayar_encoded: new FormControl("base64"),
      bankTujuan: new FormControl(""),
      bankAsal: new FormControl(""),
      bankTujuan_encoded: new FormControl("base64"),
      transactionMetodeBank: new FormControl(""),
      transactionMetodeBank_encoded: new FormControl("base64"),
      admBank: new FormControl(""),
      maker: new FormControl(this.nikUser["_hash"], [Validators.required]),
      maker_encoded: new FormControl("base64"),
      makerDate: new FormControl(this.datePipe.transform(Date.now(), 'MM/dd/yyyy'), Validators.required),
      makerTime: new FormControl(this.datePipe.transform(Date.now(), 'h:mm:ss a'), Validators.required),
      jumlahTerima: new FormControl(totalHarga, Validators.required),
      unit: new FormControl(""),
      unit_encoded: new FormControl("base64"),
      nominalTransaksi: new FormControl(""),
      kembali: new FormControl(""),
      nik: new FormControl(this.nikUser["username"]),
      nikPemasar: new FormControl(this.nikUser["_hash"], Validators.required),
      nikPemasar_encoded: new FormControl("base64"),
      edcType: new FormControl(""),
      edcType_encoded: new FormControl("base64"),
      cardType: new FormControl(""),
      cardType_encoded: new FormControl("base64"),
      installment: new FormControl(""),
      installment_encoded: new FormControl("base64"),
      periodePayment: new FormControl(""),
      idAi: new FormControl("", Validators.required),
      namaPemasar: new FormControl(this.nikUser["name"]),
      'transaction-type': new FormControl("", Validators.required),
      'transaction-type_encoded': new FormControl("base64"),
      
    });

    for (let isi of LM) {
      this.formData.addControl(isi.code, new FormControl(isi.Value, [Validators.required, Validators.minLength(9)]))
    }

    // if (LM.length > 0) {

    // }


    this.idTransaksi();
    this.getUnit();
    this.getTransactionType();
    //
    this.P = this.perhiasan.length;
    this.logam = this.lm.length;
    this.gift = this.gs.length;
    this.B = this.berlian.length;
    this.D = this.dinar.length;
    //
    this.checkoutModal = true;
    this.cartModal.emit(false);
    this.totalBelanja = totalHarga;
    this.getBank();
    this.getTransactionMethod();
    this.getTransactionBankMethod();
  }
  getTransactionType() {
    this.transactionTypeService.get("?_hash=1&code=t01").subscribe((response: any) => {
      if (response != false) {
        this.formData.patchValue({ 'transaction-type': response["_hash"] });
      }
    })
  }

  getNikPemasar() {
    const value = this.formData.get('nik').value;
    this.userService.list("?_hash=1&username=" + value).subscribe((response: any) => {
      if (response['length'] != 0) {
        console.debug(response, "data pemasar");
        this.toastr.success('Success Get NIK Pemasar Name ' + response["0"]["name"], 'NIK Pemasar');
        this.formData.patchValue({ nikPemasar: response["0"]['_hash'], namaPemasar: response["0"]["name"] });
      } else {
        this.toastr.error('NIK Pemasar Not Found, Filed Get', 'NIK Pemasar');
        this.formData.patchValue({ nikPemasar: "", namaPemasar: "" });
        return;
      }

    });
  }

  getUnit() {
    const unitString = btoa(JSON.stringify(this.sessionService.getUnit()));
    this.formData.patchValue({ unit: unitString });
  }

  closeModal() {
    this.edc = false;
    this.edc2 = false;
    this.edc3 = false;
    this.bankForm = false;
    this.installmentCont = false;
    this.checkoutModal = false;
    this.cartModal.emit(true);
  }

  loadData() {
    this.perhiasan;
    this.lm;
    this.gs;
    this.berlian
    this.dinar;
    console.debug(this.gs, "wew data")
  }

  // pembayaran

  getBankInstallment() {
    this.transactionBankInstallment.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.bankInstallment = response;
      }
    });
  }

  periodeInstallment(val) {
    this.transactionBankInstallment.list("?_hash=1&code=" + val).subscribe((response: any) => {
      if (response != false) {
        this.installmentPeriod = response;
      }
    });
    this.periodeIns = true;
  }

  bankValid(val) {
    this.administrasi = "";
    this.formData.patchValue({ admBank: this.administrasi });
    this.edc2 = false;
    this.edc3 = false;
    console.debug(val, "bank valid");
    let cod = JSON.parse(atob(val));
    if (cod["code"] == "01") {
      this.bankForm = false;
      this.edc = false;
      this.installmentCont = false;
    } else if (cod["code"] == "02") {
      this.bankForm = true;
      this.edc = false;
      this.installmentCont = false;
    } else if (cod["code"] == "03") {
      this.bankForm = false;
      this.edc = true;
      this.installmentCont = false;
    }
    else if (cod["code"] == "04") {
      this.getBankInstallment();
      this.bankForm = false;
      this.edc = false;
      this.installmentCont = true;
    }
    this.formData.patchValue({
      transaksiMetodeBank: "",
      bankAsal: "",
      bankTujuan: "",
      nominalTransaksi: "",
      kembali: ""
    });
  }
  jenisEdc() {
    this.transactionEdcType.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.edcTipe = response;
      }
    });
    this.edc2 = true;
  }
  jenisKartu() {
    this.transactionCardType.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.cardTipe = response;
      }
    });
    this.edc3 = true;
    console.debug(this.formData.get('edcType').value, "EDCTYOE");
  }

  bankAdm(val) {
    this.administrasi = "";
    this.formData.patchValue({ admBank: this.administrasi });
    let Jc = JSON.parse(atob(val));
    let Je = JSON.parse(atob(this.formData.get('edcType').value));
    let Pem = JSON.parse(atob(this.formData.get('transactionMetodeBank').value));
    //debit
    if (Pem["code"] == "02") {
      if (Jc["code"] == Je["code"]) {
        this.administrasi = "";
        this.formData.patchValue({ admBank: this.administrasi });
      } else {

        this.administrasi = JSON.stringify((0.15 / 100) * this.totalBelanja);
        this.formData.patchValue({ admBank: this.administrasi });
      }
      // kredit
    } else if (Pem["code"] == "01") {
      if (Jc["code"] == Je["code"]) {
        this.administrasi = "";
        this.formData.patchValue({ admBank: this.administrasi });
      } else {
        this.administrasi = JSON.stringify((1 / 100) * this.totalBelanja);
        this.formData.patchValue({ admBank: this.administrasi });
      }
    } else {
      this.administrasi = "";
      this.formData.patchValue({ admBank: this.administrasi });
    }

  }

  diterimaUang(total) {
    total = total.replace(/,/g, '')
    this.diterima = total;
    this.kembali = total - this.totalBelanja;
  }

  getEdcType() {
    this.transactionEdcType.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.edcTipe = response;
      }
    });
  }
  getCardType() {
    this.transactionCardType.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.cardTipe = response;
      }
    });
  }
  getBank() {
    this.bankService.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.bank = response;
      }
    });
  }

  getTransactionMethod() {
    this.transactionMethodService.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.transactionMethod = response;
      }
    });
  }

  getTransactionBankMethod() {
    this.transactionBankMethodService.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.transactionBankMethod = response;
      }
    });
  }

  //
  transaction() {

    if (!this.formData.valid) {
      this.toastr.error("form Not Completed", "Transaction");
      console.debug(this.formData.getRawValue());
      return;
    }
    if (this.kembali < 0) {
      this.toastr.error("Nilai Tidak Cukup", "Transaction");
      return;
    }
    console.debug(this.gs, "wew")
    this.validModel = true;
  }

  storeTransaction() {
    let data = this.formData.getRawValue();

    for (let index = 0; index < LM.length; index++) {
      LM[index].noSeri = data[LM[index].code]
      delete data[LM[index].code]
    }
    // 
    
    data.product = btoa(JSON.stringify({ PERHIASAN, LM, BERLIAN, GS, DINAR }));
    data.product_encoded = "base64";
    data.currency_encoded = "base64";
    let nomT = data["nominalTransaksi"]
    data["nominalTransaksi"] = nomT.replace(/,/g, '');
    delete data["cif"];
    delete data["namaPemasar"];
    delete data["nik"];
    // new
    //per product
    // data["hjual"] = nomT.replace(/,/g, '');
    // data["hjual_diskon"] = '';
    // data["hjual_aftdiskon"] = '';
    // data["egc_kategori"] = '';
    // data["egc_exp"] = '';
    // data["egc_status"] = '';
    // data["egc_nik"] = '';
    // data["emas_nik"] = '';
    
   

    // data.metodeBayar =

    this.productService.batchUpdate(this.transactionFlagService.batchUpdate()).subscribe((response: any) => {
      if (response == false) {
        console.debug("product flag update failed", this.transactionFlagService.batchUpdate());
      }

      console.debug(this.transactionFlagService.batchUpdate(), 'product flaf update success');
    })

    this.currencyService.get('?code=360').subscribe((response:any)=>{
      if (response == false) {
        console.debug("gagal get currency");
        return;
      }
      data.currency =  btoa(JSON.stringify(response));
      console.debug(data, "ISI FORMDATA");
      this.transactionService.add(data).subscribe((response: any) => {
      
        if (response != false) {
          this.validModel = false;
          this.toastr.success(this.transactionService.message(), "Transaction Success");
          this.checkoutModal = false;
          // remove isi cart
          PERHIASAN.splice(0);
          BERLIAN.splice(0);
          LM.splice(0);
          DINAR.splice(0);
          GS.splice(0);
          this.cartModal.emit(false);
          this.ChangeContentArea('10003');
        } else {
          this.toastr.error(this.transactionService.message(), "Transaction");
          this.idTransaksi()
          return;
        }
      })
    })
    

  }

  //
  getClientData(val) {
    if (val != null) {
      this.isiClientData = val;

      this.formData.patchValue({
        cif: val["cif"],
        client: btoa(JSON.stringify(val)),
        name: val["name"]
      })
    } else {
      this.formData.patchValue({
        cif: "",
        client: "",
        name: ""
      })
    }

    console.debug(val, "HASIL EMMMMMMIT")
  }
  ChangeContentArea(pageId: string) {
    if (pageId.startsWith("x")) return;
    ContentPage.ChangeContent(pageId, true)
  }

  

  cek(){
    var valid = false;
    var jual = null;
    var branchCode = "";
    var select = null;
    var bank = null;
    var jenisEDC = null;
    var jenisRTGS = null;
    var coa = null;
    var isBuyback = false;
    var dat = null;
    // var nik = this.formData.get('kasirId').value;
    const value = this.formData.get('kasirId').value;
    var metodeBayarCode = this.formData.get('metodeBayar').value;
    metodeBayarCode = atob(metodeBayarCode);
    // metodeBayarCode = this.metodeBayar.code;
    var unitCode = this.formData.get('unit').value;
    unitCode = atob(unitCode);
    var nikP = this.formData.get('nikPemasar').value;
    // var unitCode = this.formData.get('unit.code').value;
    var unita = this.sessionService.getUnit();
    if(this.coa != null)
    {
      this.coa.value;
    }
    this.nikValid = false;
    // checkNIK();
    console.debug(value, "nikP");
    console.debug(metodeBayarCode, "metode");
    console.debug(unitCode, "unit");
    console.debug(unita, "unita");
    // this.mesinCheckNik(metodeBayar);

  }

//   mesinCheckNik(metodeBayar)
// {
// 	if(metodeBayar != '1')
// 	{
// 		coa = $("#coa");
// 		coa.val("");
// 		// setKasir(null);
// 		// return;
// 	}

//   var userEmas = $('#userEmas');
//   if(userEmas == null)
//   {
//     alert("Error. Gagal checking User Emas !!!");
//     console.log("Gaada input dengan ID = userEmas");
//     return;
//   }

//   var tgDistro = $("#distro");
//   if(tgDistro == null)
//   {
//     alert("Error. Gagal checking User Emas !!!");
//     console.log("Gaada input hidden dengan ID = distro");
//     return;
//   }

//   branchCode = tgDistro.val();
//   user = userEmas.val();

//   if(user == "")
//   {
//     alert("Error. Harap input User ID Emas !!!");
//     console.log("Input User ID Emas kosong.");
//     return;
//   }

//   if(branchCode == "")
//   {
// 	alert("Error. Distro kosong !!!");
//     console.log(" Tolong jangan diubah-ubah tag nya ya :). Atau yang ngoding bodoh XD.");
//     return;
//   }

//   // cuma branch code ini yang valid aja
//   if(branchCode == "55099" || branchCode == "55098" || branchCode == "55097")
//   {
// 	setKasir(null);
// 	return;
//   }

//   var url = "https://"+window.location.hostname+"/api/channel/get-kasir-on-emas.php?branchCode="+branchCode;
//   console.log(url);

//   if(getKasirHandler != null)
//   {
// 	getKasirHandler.abort();
// 	show(false, "loading");
//   }

//   show(true, "loading");
//   getKasirHandler = $.ajax({ url : url, timeout: 5000,
// 	error: function(request, textStatus) {
// 		let j = request.responseText;
// 		console.debug(request)
// 		show(false, "loading");
// 		alert("Error. " + textStatus + ". Harap hubungi IT Support/Helpdesk.\n &nbsp" + j);
// 		console.info();
// 	},
// 	success: function(data) {

// 		var d = JSON.parse(data.data);
// 		dat = data;

// 		if(data.responseCode != '00')
// 		{
// 			alert(data.responseDesc);
// 			show(false, "loading");
// 			return;
// 		}

// 		var tutup = false;
// 		// console.debug(d);
// 		for(let i = 0; i < d.data.length; i++)
// 		{
// 			var kasir = d.data[i];
// 			// console.debug(kasir.userId);
// 			if(kasir.userId == user)
// 			{
// 				if(kasir.status == 0)
// 				{
// 					tutup = true;
// 					break;
// 				}

// 				if(select.value == '1')
// 				{
// 					if(kasir == null)
// 					{
// 						alert("Error. Harap hubungi IT Support/Helpdesk.");
// 						return;
// 					}
					
// 					setKasir(kasir);
// 				}
// 				else
// 				{
// 					setKasir(null);
// 				}

// 				break;
// 			}
// 		}

// 		if(tutup)
// 		{
// 			alert("Kasir ditutup. Mohon buka kasir atau hubungi Pimpinan anda");
// 		}
// 		else if(!valid)
// 		{
// 			alert("USER ID tidak memiliki rekening pada branch ini");
// 		}
// 		show(false, "loading");
//   }});

// }
}
