import { Component, OnInit, Attribute } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { CifGeneratorService } from '../../../lib/helper/cif-generator.service';

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

@Component({
  selector: 'app-add-nasabah',
  templateUrl: './add-nasabah.component.html',
  styleUrls: ['./add-nasabah.component.scss']
})
export class AddNasabahComponent implements OnInit {
  tipe:boolean = false;

  cifHasil:any;
  
  tglberlakuS:boolean = false;

  addNasabahModal:boolean = false;

  badanUsaha: FormGroup = null;
  person: FormGroup = null;

  // Wilayah
  province:any;
  regency:any;
  regency2:any;
  district:any;
  district2:any;
  village:any;
  village2:any;

  // Client
  IdType:any;
  sumberDana:any;
  warganegara:any;
  tipePenduduk:any;
  agama:any;
  pekerjaan:any;
  pendidikan:any;
  status:any;
  typeClient:any;
  education:any;

  constructor(
    private cifNumber: CifGeneratorService,
    private provinceService: ProvinceService,
    private districtService: DistrictService,
    private regencyService: RegencyService,
    private villageService: VillageService,
    // client
    private clientService: ClientService,
    private clientIdType: ClientIdTypeService,
    private clientFunds: ClientFundsService,
    private clientNationality: ClientNationalityService,
    private clientPopulationType: ClientPopulationTypeService,
    private clientReligion: ClientReligionService,
    private clientProfession: ClientProfessionService,
    private clietnMarital: ClientMaritalStatusService,
    private clientType: ClientTypeService,
    private clientEducation: ClientEducationService,
  ) { }

  ngOnInit(): void {
    this.getType();
  }

  openModal(){
    this.cifHasil = this.cifNumber.cifNumber();

    this.badanUsaha = new FormGroup({
      // header
      cif: new FormControl(this.cifHasil,[Validators.required, Validators.pattern(/^[0-9]*$/)]),
      cif_validation: new FormControl("unique:cif"),
      //tipeNasabah: new FormControl("",[Validators.required]),

      // informasi cepat data nasabah badan usaha
      namaBU: new FormControl("", Validators.required),
      tglBerdiri: new FormControl("", Validators.required),
      kodeUnitKerja: new FormControl("", Validators.required),
      namaUnitKerja : new FormControl("", Validators.required),

      // detail data nasabah
      tipeID : new FormControl("", Validators.required),
      tipeNo : new FormControl("", Validators.required),
      tipeNo_validation : new FormControl("unique:tipeNo"),
      jenisPerusahaan : new FormControl("", Validators.required),
      bidangUsaha : new FormControl("", Validators.required),
      noAkteT : new FormControl("", Validators.required),
      noAkteT_validation : new FormControl("unique:noAkteT"),
      sumberDana : new FormControl(""),
      noNPWP : new FormControl("", Validators.required),
      noNPWP_validation : new FormControl("unique:noNPWP"),
      namaPJ1 : new FormControl("", Validators.required),
      namaPJ2 : new FormControl(""),
      tglBerlaku : new FormControl("", Validators.required),
      jenisBadanHukum : new FormControl("", Validators.required),
      noAkte : new FormControl("", Validators.required),
      noAkte_validation : new FormControl("unique:noAkte"),
      tglPerubahanAkte : new FormControl("", Validators.required),
      telp : new FormControl(""),
      telp_validation : new FormControl("unique:telp"),
      hpPJ1 : new FormControl("", Validators.required),
      hpPJ1_validation : new FormControl("unique:hpPJ1"),
      hpPJ2 : new FormControl(""),
      hpPJ2_validation : new FormControl("unique:hpPJ2"),

      // alamat
      alamat : new FormControl("", Validators.required),
      rt : new FormControl("", [Validators.required, Validators.maxLength(5)] ),
      rw : new FormControl("", Validators.required),
      kodePos : new FormControl("", Validators.required),
      provinsi : new FormControl("", Validators.required),
      provinsi_encoded : new FormControl("base64"),
      kabupaten : new FormControl("", Validators.required),
      kabupaten_encoded : new FormControl("base64"),
      kecamatan : new FormControl("", Validators.required),
      kecamatan_encoded : new FormControl("base64"),
      kelurahan : new FormControl("", Validators.required),
      kelurahan_encoded : new FormControl("base64"),
    });

    this.person = new FormGroup({
      tipeID : new FormControl("", Validators.required),
      noID : new FormControl("", Validators.required),
      noID_validation : new FormControl("unique:noID"),
      namaNasabah : new FormControl("", Validators.required),
      namaIbuKandung : new FormControl("", Validators.required),
      tempatLahir : new FormControl("", Validators.required),
      tglLahir :new FormControl("", Validators.required),
      masaBerlakuID : new FormControl("", Validators.required),
      tglBerlakuSampai : new FormControl(""),

      // detail data nasabah
      jenisKelamin : new FormControl("", Validators.required),
      pendidikan : new FormControl("", Validators.required),
      statusPerkawinan : new FormControl("", Validators.required),
      namaPasangan : new FormControl(""),
      tglLahirPasangan : new FormControl(""),
      jmlTanggungan : new FormControl(""),
      noTelp : new FormControl(""),
      noTelp_validation : new FormControl("unique:noTelp"),
      noHP : new FormControl("", Validators.required),
      noHP_validation : new FormControl("unique:noHP"),
      email : new FormControl(""),
      email_validation : new FormControl("unique:email"),
      noNPWP : new FormControl(""),
      noNPWP_validation : new FormControl("unique:noNPWP"),
      kewarganegaraan : new FormControl("", Validators.required),
      tipeKependudukan : new FormControl("", Validators.required),
      sumberDana : new FormControl("", Validators.required),
      pekerjaan : new FormControl("", Validators.required),
      agama : new FormControl("", Validators.required),
      pendapatan : new FormControl("", Validators.required),
      
      // Alamat Sesuai KTP
      alamat : new FormControl("", Validators.required),
      rt : new FormControl("", Validators.required),
      rw : new FormControl("", Validators.required),
      kodePos : new FormControl("", Validators.required),
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
      rt2 : new FormControl("", Validators.required),
      rw2 : new FormControl("", Validators.required),
      kodePos2 : new FormControl("", Validators.required),
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

  // Client
  getEducation(){
    this.clientEducation.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.education = response;
      } 
    });
  }
  getMaritalStatus(){
    this.clietnMarital.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.status = response;
      } 
    });
  }
  getProfession(){
    this.clientProfession.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.pekerjaan = response;
      } 
    });
  }
  getClientReligion(){
    this.clientReligion.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.agama = response;
      } 
    });
  }
  getClientIdType(){
    this.clientIdType.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.IdType = response;
      } 
    });
  }

  getClientFunds(){
    this.clientFunds.list("?_hash=1").subscribe((response:any) => {
      if (response != false) {
        this.sumberDana = response;
      }
    });
  }

  getNationality(){
    this.clientNationality.list("?_hash=1").subscribe((response:any) => {
      if (response != false) {
        this.warganegara = response;
      }
    });
  }

  getPopulation(){
    this.clientPopulationType.list("?_hash=1").subscribe((response:any) => {
      if (response != false) {
        this.tipePenduduk = response;
      }
    });
  }

  getType(){
    this.clientType.list("?_hash=1").subscribe((response:any) => {
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
  
  getTipe(value: any){
    if (value == 1) {
      this.tipe = false;
    } else if (value == 2) {
      this.tipe = true;
    }
  }

  masaBerlakuID(val: any){
    if (val == "SH") {
      this.tglberlakuS=false;
    } else {
      this.tglberlakuS=true;
    }

  }

  // Wilayah Indonesia
  getProvinsi(){
    this.provinceService.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.province = response;
        this.province.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
      })
      }      
    });
  }

  getRegency(val:string, col:any){
    
    const params = "?parent="+val+"&parent_encoded=int&_hash=1";
    this.regencyService.list(params).subscribe((response: any) => {
      if (response != false) {
        if (col == '1') {
          this.regency=null;
          this.district=null;
          this.village=null;

          this.regency = response;
          this.regency.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
          })
        } else {
          this.regency2=null;
          this.district2=null;
          this.village2=null;

          this.regency2 = response;
          this.regency2.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
          })
        }
        
      }      
    });
  }

  getDistrict(val:string, col:any){
    const params = "?parent="+val+"&parent_encoded=int&_hash=1";
    this.districtService.list(params).subscribe((response: any) => {
      if (response != false) {
        if (col == '1') {
          this.district = response;
          this.district.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
          })
        } else {
          this.district2 = response;
          this.district2.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
          })
        }        
      }      
    });
  }

  getVillage(val:string, col:any){
    const params = "?parent="+val+"&parent_encoded=int&_hash=1";
    this.villageService.list(params).subscribe((response: any) => {
      if (response != false) {
        if (col == '1') {
          this.village = response;
          this.village.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
          })
        } else {
          this.village2 = response;
          this.village2.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
          })
        }        
      }      
    });
  }
  
  
}


