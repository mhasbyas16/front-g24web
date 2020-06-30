import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { NgForm, Form, FormGroup } from '@angular/forms';
import { JenisPerhiasan } from '../../../lib/enums/jenis.enum';
import { PERHIASAN } from '../../../sample/dataperhiasan';
import { MULIA } from '../../../sample/dataemas';
import { VENDOR } from '../../../sample/datavendor';

// import { Perhiasan } from 'src/app/lib/enums/jenis.enum';


@Component({
  selector: 'app-penjualan-distro',
  templateUrl: './penjualan-distro.component.html',
  styleUrls: ['./penjualan-distro.component.css']
})

@DContent(PenjualanDistroComponent.key)
export class PenjualanDistroComponent implements OnInit {
  constructor() { }
  searchModel : any = {vendors:"all", jenisperhiasan: "all"};

  
  ngOnInit(): void {
  }
  static key = EMenuID.DISTRO;
  jeniss : any[] = [];
  perhiasans : any[] = [];
  ini = 5;
  pageSize: number = 5;
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  jenisperhiasan = Object.values(JenisPerhiasan);
  vendors = Object.values(VENDOR);
  
  getPerhiasan = PERHIASAN;
  // perhiasans = this.getPerhiasan;
  onCariPerhiasan(data)
    {
      let vendor = data.input_vendor_perhiasan;
      let jenis = data.input_jenis_perhiasan;
      let berat = data.input_berat_perhiasan;
      let filteredperhiasan = [];
      if (vendor != 'all' && jenis != 'all' && berat != null) {
          filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.jenis == jenis && produk.vendor == vendor && produk.berat == berat);
      }else if (vendor == 'all' && jenis != 'all' && berat != null) {
          filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.jenis == jenis && produk.berat == berat)
      }else if (vendor != 'all' && jenis == 'all' && berat != null) {
          filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.vendor == vendor && produk.berat == berat)
      }else if (vendor != 'all' && jenis != 'all' && berat == null) {
          filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.vendor == vendor && produk.jenis == jenis)
      }else if (vendor != 'all' && jenis == 'all' && berat == null) {
          filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.vendor == vendor )
      }else if (vendor == 'all' && jenis != 'all' && berat == null) {
          filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.jenis == jenis )
      }else if (vendor == 'all' && jenis == 'all' && berat != null) {
        filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.berat == berat )
      }else if (vendor == 'all' && jenis == 'all' && berat == null ) {
          filteredperhiasan = this.getPerhiasan
      }else{
        
      }

      
      // const filteredperhiasan = this.getPerhiasan.filter(kamu =>  kamu.jenis == jenis && kamu.vendor == vendor);
      this.perhiasans = filteredperhiasan;
      if (this.perhiasans.length == 0) {
        this.placeholderDatagrid = "Pencarian Tidak Ditemukan, Periksa Kembali Parameter Pencarian";
      }
      console.log(jenis);
      console.log(vendor);
      console.log(berat);
      // console.log(this.getPerhiasan);
      console.log(filteredperhiasan.length);
    }

    onCariMulia(data)
    {

    }
}

