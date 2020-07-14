import { Component, OnInit, Attribute } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { CifGeneratorService } from '../../../lib/helper/cif-generator.service';

@Component({
  selector: 'app-add-nasabah',
  templateUrl: './add-nasabah.component.html',
  styleUrls: ['./add-nasabah.component.scss']
})
export class AddNasabahComponent implements OnInit {
  tipe:boolean = true;

  cifHasil:any;
  
  tglberlakuS:boolean = false;

  addNasabahModal:boolean = false;

  badanUsaha: FormGroup = null;
  person: FormGroup = null;
  constructor(
    private cifNumber: CifGeneratorService,
  ) { }

  ngOnInit(): void {
  }
  
  getTipe(value: any){
    if (value == 'po') {
      this.tipe = false;
    } else if (value == 'bu') {
      this.tipe = true;
    }
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
      kabupaten : new FormControl("", Validators.required),
      kecamatan : new FormControl("", Validators.required),
      kelurahan : new FormControl("", Validators.required),
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
      rataPenghasilan : new FormControl("", Validators.required),
      
      // Alamat Sesuai KTP
      alamat : new FormControl("", Validators.required),
      rt : new FormControl("", Validators.required),
      rw : new FormControl("", Validators.required),
      kodePos : new FormControl("", Validators.required),
      provinsi : new FormControl("", Validators.required),
      kabupaten : new FormControl("", Validators.required),
      kecamatan : new FormControl("", Validators.required),
      kelurahan : new FormControl("", Validators.required),

      // Alamat Saat Ini
      alamat2 : new FormControl("", Validators.required),
      rt2 : new FormControl("", Validators.required),
      rw2 : new FormControl("", Validators.required),
      kodePos2 : new FormControl("", Validators.required),
      provinsi2 : new FormControl("", Validators.required),
      kabupaten2 : new FormControl("", Validators.required),
      kecamatan2 : new FormControl("", Validators.required),
      kelurahan2 : new FormControl("", Validators.required),
    });

    this.addNasabahModal = true;   
    
  }

  masaBerlakuID(val: any){
    if (val == "SH") {
      this.tglberlakuS=false;
    } else {
      this.tglberlakuS=true;
    }

  }

}


