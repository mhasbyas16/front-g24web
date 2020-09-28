import { Injectable } from '@angular/core';
import { TanggalService } from '../lib/helper/tanggal.service';


@Injectable({
  providedIn: 'root'
})
export class SplitDateServiceService {
  tgl :any;
  tglSplit :any;
  bulan :any;
  hari:any;
  tahun:any;
  fixDate:any;
  bulanTerbilang:any;
  terbilang:any
  constructor(private tanggalService:TanggalService) { }

  split(date){
    this.tgl = date;
    this.tglSplit = this.tgl.split("/");
    this.bulan = this.tglSplit["0"];
    this.hari = this.tglSplit["1"];
    this.tahun = this.tglSplit["2"];
    this.fixDate = this.tahun+"-"+this.bulan+"-"+this.hari;
    return this.fixDate;
  }
  splitBack(date){
    this.tgl = date;
    this.tglSplit = this.tgl.split("-");
    this.bulan = this.tglSplit["1"];
    this.hari = this.tglSplit["2"];
    this.tahun = this.tglSplit["0"];
    this.fixDate = this.bulan+"/"+this.hari+"/"+this.tahun;
    return this.fixDate;
  }

  splitBulanTerbilang(date){
    this.tgl =date;
    this.tglSplit = this.tgl.split("-");
    this.bulan = Number(this.tglSplit["1"]);
    this.hari = this.tglSplit["2"];
    this.tahun = this.tglSplit["0"];
    this.bulanTerbilang = this.tanggalService.bulanGenerate(this.bulan);
    this.terbilang = this.hari+' '+this.bulanTerbilang+' '+this.tahun;
    return this.terbilang;
  }
}
