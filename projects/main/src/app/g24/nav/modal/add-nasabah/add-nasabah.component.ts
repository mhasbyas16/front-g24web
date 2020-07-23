import { Component, OnInit, Attribute, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { CifGeneratorService } from '../../../lib/helper/cif-generator.service';
import { ToastrService } from 'ngx-toastr';

// services
import { ProvinceService } from '../../../services/client/province.service';
import { DistrictService } from '../../../services/client/district.service';
import { RegencyService } from '../../../services/client/regency.service';
import { VillageService } from '../../../services/client/village.service';
// client
import { ClientService } from '../../../services/client/client.service';
import { ClientIdTypeService } from '../../../services/client/client-id-type.service';
import { ClientFundsService } from '../../../services/client/client-funds.service';
import { ClientNationalityService } from '../../../services/client/client-nationality.service';
import { ClientPopulationTypeService } from '../../../services/client/client-population-type.service';
import { ClientReligionService } from '../../../services/client/client-religion.service';
import { ClientProfessionService } from '../../../services/client/client-profession.service';
import { ClientMaritalStatusService } from '../../../services/client/client-marital-status.service';
import { ClientTypeService } from '../../../services/client/client-type.service';
import { ClientEducationService } from '../../../services/client/client-education.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-nasabah',
  templateUrl: './add-nasabah.component.html',
  styleUrls: ['./add-nasabah.component.scss']
})
export class AddNasabahComponent implements OnInit {
  @Output() clientData:any = new EventEmitter;

  tipe: boolean = false;
  hide: boolean = false;
  isChecked:boolean = false;

  cifHasil: any;

  tglberlakuS: boolean = false;

  addNasabahModal: boolean = false;

  badanUsaha: FormGroup = null;
  person: FormGroup = null;

  // Wilayah
  province: any;
  regency: any;
  regency2: any;
  district: any;
  district2: any;
  village: any;
  village2: any;

  // Hash
  tipeClientHash: any;

  // Client
  IdType: any;
  sumberDana: any;
  warganegara: any;
  tipePenduduk: any;
  agama: any;
  pekerjaan: any;
  pendidikan: any;
  status: any;
  typeClient: any;
  education: any;

  constructor(
    private cifNumber: CifGeneratorService,
    private provinceService: ProvinceService,
    private districtService: DistrictService,
    private regencyService: RegencyService,
    private villageService: VillageService,
    // client
    private mainClient: ClientService,
    private clientIdType: ClientIdTypeService,
    private clientFunds: ClientFundsService,
    private clientNationality: ClientNationalityService,
    private clientPopulationType: ClientPopulationTypeService,
    private clientReligion: ClientReligionService,
    private clientProfession: ClientProfessionService,
    private clietnMarital: ClientMaritalStatusService,
    private clientType: ClientTypeService,
    private clientEducation: ClientEducationService,

    //ng
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getType();
  }

  openModal() {
    this.mainClient.count().subscribe((response:any)=>{
      this.badanUsaha.patchValue({cif:this.cifNumber.cifNumber(response["count"])});
      this.person.patchValue({cif:this.cifNumber.cifNumber(response["count"])});
      this.cifHasil = this.cifNumber.cifNumber(response["count"]) ;
    });
    

    this.badanUsaha = new FormGroup({
      // header
      cif: new FormControl(this.cifHasil, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      cif_validation: new FormControl("unique:cif"),
      tipeClient: new FormControl("", Validators.required),
      //tipeNasabah: new FormControl("",[Validators.required]),

      // informasi cepat data nasabah badan usaha
      namaBU: new FormControl("", Validators.required),
      tglBerdiri: new FormControl("", Validators.required),
      kodeUnitKerja: new FormControl("", Validators.required),
      namaUnitKerja: new FormControl("", Validators.required),

      // detail data nasabah
      tipeID: new FormControl("", Validators.required),
      tipeNo: new FormControl("", Validators.required),
      tipeNo_validation: new FormControl("unique:tipeNo"),
      jenisPerusahaan: new FormControl("", Validators.required),
      bidangUsaha: new FormControl("", Validators.required),
      noAkteT: new FormControl("", Validators.required),
      noAkteT_validation: new FormControl("unique:noAkteT"),
      sumberDana: new FormControl(""),
      noNPWP: new FormControl("", Validators.required),
      noNPWP_validation: new FormControl("unique:noNPWP"),
      namaPJ1: new FormControl("", Validators.required),
      namaPJ2: new FormControl(""),
      tglBerlaku: new FormControl("", Validators.required),
      jenisBadanHukum: new FormControl("", Validators.required),
      noAkte: new FormControl("", Validators.required),
      noAkte_validation: new FormControl("unique:noAkte"),
      tglPerubahanAkte: new FormControl("", Validators.required),
      telp: new FormControl(""),
      telp_validation: new FormControl("unique:telp"),
      hpPJ1: new FormControl("", Validators.required),
      hpPJ1_validation: new FormControl("unique:hpPJ1"),
      hpPJ2: new FormControl(""),
      hpPJ2_validation: new FormControl("unique:hpPJ2"),

      // alamat
      alamat: new FormControl("", Validators.required),
      rt: new FormControl("", [Validators.required, Validators.maxLength(5)]),
      rw: new FormControl("", Validators.required),
      kodePos: new FormControl("", Validators.required),
      provinsi: new FormControl("", Validators.required),
      provinsi_encoded: new FormControl("base64"),
      kabupaten: new FormControl("", Validators.required),
      kabupaten_encoded: new FormControl("base64"),
      kecamatan: new FormControl("", Validators.required),
      kecamatan_encoded: new FormControl("base64"),
      kelurahan: new FormControl("", Validators.required),
      kelurahan_encoded: new FormControl("base64"),
    });

    this.person = new FormGroup({
      cif: new FormControl(this.cifHasil, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      cif_validation: new FormControl("unique:cif"),
      tipeClient: new FormControl(this.tipeClientHash, Validators.required),
      tipeClient_encoded: new FormControl("base64"),
      tipeID: new FormControl("", Validators.required),
      tipeID_encoded: new FormControl("base64"),
      noID: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.pattern(/^[0-9]*$/)]),
      noID_validation: new FormControl("unique:noID"),
      namaNasabah: new FormControl("", Validators.required),
      namaIbuKandung: new FormControl("", Validators.required),
      tempatLahir: new FormControl("", Validators.required),
      tglLahir: new FormControl("", Validators.required),
      masaBerlakuID: new FormControl(""),
      tglBerlakuIDSampai: new FormControl("00/00/00"),

      // detail data nasabah
      jenisKelamin : new FormControl("", Validators.required),
      pendidikan : new FormControl("", Validators.required),
      statusPerkawinan : new FormControl("", Validators.required),
      statusPerkawinan_encoded : new FormControl("base64"),
      namaPasangan : new FormControl(""),
      tglLahirPasangan : new FormControl(""),
      jmlTanggungan : new FormControl(""),
      noTelp : new FormControl("", [Validators.maxLength(12), Validators.pattern(/^[0-9]*$/)]),
      noTelp_validation : new FormControl("unique:noTelp"),
      noHP : new FormControl("", [Validators.required, Validators.maxLength(12), Validators.pattern(/^[0-9]*$/)]),
      noHP_validation : new FormControl("unique:noHP"),
      email : new FormControl("", Validators.email),
      email_validation : new FormControl("unique:email"),
      noNPWP : new FormControl("", [Validators.maxLength(17), Validators.pattern(/^[0-9]*$/)]),
      noNPWP_validation : new FormControl("unique:noNPWP"),
      kewarganegaraan : new FormControl("", Validators.required),
      kewarganegaraan_encoded : new FormControl("base64"),
      tipeKependudukan : new FormControl("", Validators.required),
      tipeKependudukan_encoded : new FormControl("base64"),
      sumberDana : new FormControl("", Validators.required),
      sumberDana_encoded : new FormControl("base64"),
      pekerjaan : new FormControl("", Validators.required),
      pekerjaan_encoded : new FormControl("base64"),
      agama : new FormControl("", Validators.required),
      agama_encoded : new FormControl("base64"),
      pendapatan : new FormControl("", Validators.required),

      // Alamat Sesuai KTP
      alamat : new FormControl("", Validators.required),
      rt : new FormControl("", [Validators.required,Validators.maxLength(4), Validators.pattern(/^[0-9]*$/)]),
      rw : new FormControl("", [Validators.required,Validators.maxLength(4), Validators.pattern(/^[0-9]*$/)]),
      kodePos : new FormControl("", [Validators.required,Validators.maxLength(7), Validators.pattern(/^[0-9]*$/)]),
      provinsi : new FormControl("", Validators.required),
      provinsi_encoded : new FormControl("base64"),
      kabupaten : new FormControl("", Validators.required),
      kabupaten_encoded : new FormControl("base64"),
      kecamatan : new FormControl("", Validators.required),
      kecamatan_encoded : new FormControl("base64"),
      kelurahan : new FormControl("", Validators.required),
      kelurahan_encoded :new FormControl("base64"),

      // Alamat Saat Ini
      alamat2 : new FormControl("", Validators.required),
      rt2 : new FormControl("", [Validators.required,Validators.maxLength(4), Validators.pattern(/^[0-9]*$/)]),
      rw2 : new FormControl("", [Validators.required,Validators.maxLength(4), Validators.pattern(/^[0-9]*$/)]),
      kodePos2 : new FormControl("", [Validators.required,Validators.maxLength(7), Validators.pattern(/^[0-9]*$/)]),
      provinsi2 : new FormControl("", Validators.required),
      provinsi2_encoded : new FormControl("base64"),
      kabupaten2 : new FormControl("", Validators.required),
      kabupaten2_encoded : new FormControl("base64"),
      kecamatan2 : new FormControl("", Validators.required),
      kecamatan2_encoded : new FormControl("base64"),
      kelurahan2 : new FormControl("", Validators.required),
      kelurahan2_encoded :new FormControl("base64"),
    });

    this.addNasabahModal = true;

    // client
    this.getProvinsi();
    this.getClientIdType();
    this.getClientFunds();
    this.getNationality();
    this.getPopulation();
    this.getClientReligion();
    this.getProfession();
    this.getMaritalStatus();
    this.getEducation();
  }

  getTipe(value: any) {
    if (value == 1) {
      this.clientType.list("?code=" + value + "&code_encoded=int&_hash=1").subscribe((response: any) => {
        for (let index of response) {
          this.tipeClientHash = index["_hash"];
          this.person.patchValue({tipeClient: this.tipeClientHash});
        }
      });
      this.tipe = false;
    } else if (value == 2) {
      this.clientType.list("?code=" + value + "&code_encoded=int&_hash=1").subscribe((response: any) => {
        for (let index of response) {
          this.tipeClientHash = index["_hash"];
          this.badanUsaha.patchValue({tipeClient: this.tipeClientHash});
        }
      });
      this.tipe = true;
    }
    this.hide = true;
  }

  // store to DB

  peroranganAddSubmit() {
    if (!this.person.valid) {
      this.toastr.error("Form not complete yet", "Add Client");
      console.debug("Form not complete yet", this.person.getRawValue());
      return;
    }
    

    let data = {
      agama: this.person.get("agama").value,
      agama_encoded: this.person.get("agama_encoded").value,
      alamatKtp: btoa(JSON.stringify({
        alamat: this.person.get("alamat").value,
        kabupaten: JSON.parse(atob(this.person.get("kabupaten").value)),
        // kabupaten_encoded: this.person.get("kabupaten_encoded").value,
        kecamatan: JSON.parse(atob(this.person.get("kecamatan").value)) ,
        // kecamatan_encoded: this.person.get("kecamatan_encoded").value,
        kelurahan: JSON.parse(atob(this.person.get("kelurahan").value)) ,
        // kelurahan_encoded: this.person.get("kelurahan_encoded").value,
        provinsi: JSON.parse(atob(this.person.get("provinsi").value)) ,
        // provinsi_encoded: this.person.get("provinsi_encoded").value,
        rt: this.person.get("rt").value,
        rw: this.person.get("rw").value,
        kodePos: this.person.get("kodePos").value,
        })),
      alamatKtp_encoded: "base64",
      alamatSaatIni: btoa(JSON.stringify({
        alamat: this.person.get("alamat2").value,
        kabupaten: JSON.parse(atob(this.person.get("kabupaten2").value)) ,
        // kabupaten2_encoded: this.person.get("kabupaten2_encoded").value,
        kecamatan: JSON.parse(atob(this.person.get("kecamatan2").value)) ,
        // kecamatan2_encoded: this.person.get("kecamatan2_encoded").value,
        kelurahan: JSON.parse(atob(this.person.get("kelurahan2").value)) ,
        // kelurahan2_encoded: this.person.get("kelurahan2_encoded").value,
        provinsi: JSON.parse(atob(this.person.get("provinsi2").value)) ,
        // provinsi2_encoded: this.person.get("provinsi2_encoded").value,
        rt: this.person.get("rt2").value,
        rw: this.person.get("rw2").value,
        kodePos: this.person.get("kodePos2").value,
        })),  
      alamatSaatIni_encoded: "base64",    
      cif: this.person.get("cif").value,
      cif_validation: this.person.get("cif_validation").value,
      email: this.person.get("email").value,
      email_validation: this.person.get("email_validation").value,
      jenisKelamin: this.person.get("jenisKelamin").value,
      jmlTanggungan: this.person.get("jmlTanggungan").value,
      kewarganegaraan: this.person.get("kewarganegaraan").value,
      kewarganegaraan_encoded: this.person.get("kewarganegaraan_encoded").value,
      masaBerlakuID: this.person.get("masaBerlakuID").value,
      namaIbuKandung: this.person.get("namaIbuKandung").value,
      name: this.person.get("namaNasabah").value,
      namaPasangan: this.person.get("namaPasangan").value,
      noHP: this.person.get("noHP").value,
      noHP_validation: this.person.get("noHP_validation").value,
      noID: this.person.get("noID").value,
      noID_validation: this.person.get("noID_validation").value,
      noNPWP: this.person.get("noNPWP").value,
      noNPWP_validation: this.person.get("noNPWP_validation").value,
      noTelp: this.person.get("noTelp").value,
      noTelp_validation: this.person.get("noTelp_validation").value,
      pekerjaan: this.person.get("pekerjaan").value,
      pekerjaan_encoded: this.person.get("pekerjaan_encoded").value,
      pendapatan: this.person.get("pendapatan").value,
      pendidikan: this.person.get("pendidikan").value,
      statusPerkawinan: this.person.get("statusPerkawinan").value,
      statusPerkawinan_encoded: this.person.get("statusPerkawinan_encoded").value,
      sumberDana: this.person.get("sumberDana").value,
      sumberDana_encoded: this.person.get("sumberDana_encoded").value,
      tempatLahir: this.person.get("tempatLahir").value,
      tglBerlakuIDSampai: this.person.get("tglBerlakuIDSampai").value,
      tglLahir: this.person.get("tglLahir").value,
      tglLahirPasangan: this.person.get("tglLahirPasangan").value,
      tipeClient: this.person.get("tipeClient").value,
      tipeClient_encoded: this.person.get("tipeClient_encoded").value,
      tipeID: this.person.get("tipeID").value,
      tipeID_encoded: this.person.get("tipeID_encoded").value,
      tipeKependudukan: this.person.get("tipeKependudukan").value,
      tipeKependudukan_encoded: this.person.get("tipeKependudukan_encoded").value,
    };
    console.debug("submitted data", data);

    this.mainClient.add(data).subscribe((response: any) => {

      if (response == false) {
        if (this.mainClient.message() != "") {
          this.toastr.error(this.mainClient.message(), "Client Data");
          return;
        }
      } else {
        this.addNasabahModal = false;
        this.hide = false;
        this.clientData.emit(data);
        this.toastr.success("Data addition was success", "Client Data Add Success");
      }
    });
  }

  // Client
  getEducation() {
    this.clientEducation.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.education = response;
      }
    });
  }
  getMaritalStatus() {
    this.clietnMarital.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.status = response;
      }
    });
  }
  getProfession() {
    this.clientProfession.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.pekerjaan = response;
      }
    });
  }
  getClientReligion() {
    this.clientReligion.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.agama = response;
      }
    });
  }
  getClientIdType() {
    this.clientIdType.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.IdType = response;
      }
    });
  }

  getClientFunds() {
    this.clientFunds.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.sumberDana = response;
      }
    });
  }

  getNationality() {
    this.clientNationality.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.warganegara = response;
      }
    });
  }

  getPopulation() {
    this.clientPopulationType.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.tipePenduduk = response;
      }
    });
  }

  getType() {
    this.clientType.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.typeClient = response;
      }
    });
  }
  // getClient(){
  //   this.clientService.list("?_hash=1").subscribe((response: any) => {
  //     if (response != false) {
  //       console.debug(response,"A")
  //     } 
  //   });
  // }

  masaBerlakuID(val: any) {
    if (val == "SH") {
      this.tglberlakuS = false;
    } else {
      this.tglberlakuS = true;
    }

  }

  // Wilayah Indonesia
  getProvinsi() {
    this.provinceService.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.province = response;
        this.province.sort(function (a, b) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        })
      }
    });
  }

  getRegency(event, col: any) {

    let jas = JSON.parse(atob(event));

    const params = "?parent=" + jas["code"] + "&parent_encoded=int&_hash=1";
    this.regencyService.list(params).subscribe((response: any) => {
      if (response != false) {
        if (col == '1') {
          this.regency = null;
          this.district = null;
          this.village = null;

          this.regency = response;
          this.regency.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          })
        } else {
          this.regency2 = null;
          this.district2 = null;
          this.village2 = null;

          this.regency2 = response;
          this.regency2.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          })
        }

      }
    });
  }

  getDistrict(val, col: any) {

    let jas = JSON.parse(atob(val));

    const params = "?parent=" + jas["code"] + "&parent_encoded=int&_hash=1";
    this.districtService.list(params).subscribe((response: any) => {
      if (response != false) {
        if (col == '1') {
          this.district = response;
          this.district.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          })
        } else {
          this.district2 = response;
          this.district2.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          })
        }
      }
    });
  }

  getVillage(val, col: any) {
    let jas = JSON.parse(atob(val));

    const params = "?parent=" + jas["code"] + "&parent_encoded=int&_hash=1";
    this.villageService.list(params).subscribe((response: any) => {
      if (response != false) {
        if (col == '1') {
          this.village = response;
          this.village.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          })
        } else {
          this.village2 = response;
          this.village2.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          })
        }
      }
    });
  }

  // alamat sama dengan KTP
  AddressKTP(e){
    this.isChecked = e;
    if (e == true) {
      this.person.patchValue({
        alamat2:this.person.get("alamat").value,
        rt2:this.person.get("rt").value,
        rw2:this.person.get("rw").value,
        kodePos2:this.person.get("kodePos").value,
        provinsi2:this.person.get("provinsi").value,
        kabupaten2:this.person.get("kabupaten").value,
        kecamatan2:this.person.get("kecamatan").value,
        kelurahan2:this.person.get("kelurahan").value});

      // this.getRegency(this.person.get("kabupaten").value,2);
      // this.getDistrict(this.person.get("kecamatan").value,2);
      // this.getVillage(this.person.get("kelurahan").value,2);
    }else{
      this.person.patchValue({alamat2:""});
      this.person.patchValue({rt2:""});
      this.person.patchValue({rw2:""});
      this.person.patchValue({kodePos2:""});
      this.person.patchValue({provinsi2:""});
      this.person.patchValue({kabupaten2:""});
      this.person.patchValue({kecamatan2:""});
      this.person.patchValue({kelurahan2:""});
    }
  }

  closeModal(){
    this.addNasabahModal = false;
    this.hide = false;
    this.person.reset();
    this.badanUsaha.reset();
  }

}


