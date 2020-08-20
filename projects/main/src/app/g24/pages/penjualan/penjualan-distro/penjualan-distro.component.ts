import { Component, OnInit,Pipe, PipeTransform, EventEmitter, Output } from '@angular/core';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';


//toastr
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-penjualan-distro',
  templateUrl: './penjualan-distro.component.html',
  styleUrls: ['./penjualan-distro.component.css']
})

@DContent(PenjualanDistroComponent.key)
export class PenjualanDistroComponent implements OnInit {
  @Output () toCart= new EventEmitter();
  //list
  vendors = null;
  jenis = null;
  datalist = null;
  perhiasans = null;

  //params
  params = null;

  total = 0;
  badge:any;
  price:any;

  // jumlah isi cart
  perhiasanParent:any;
  berlian:any;

  // total harga per kategori
  hargaPerhiasan:any;
  hargaBatuMulia:any;

  //remove price
  RPricePerhiasan:any;
  constructor( ) {}
 // searchModel : any = {vendors:"all", jenisperhiasan: "all"};

  addCart(){ }
  ngOnInit(): void {}

  // total isi cart
  cartData(data: any){
    this.total = data;  
  }

  // total isi cart perhiasan
  totalPerhiasan(length: any){
    this.perhiasanParent = length;
    
  }

  // total isi cart berlian
  totalBerlian(isi: any){
    this.berlian = isi;
  }

  //CLEAR
  // clear total cart
  clearTotal(num){
    this.total = num;
    this.hargaPerhiasan = 0;
    this.hargaBatuMulia = 0;
  }
  clearBerlian(isi: any){
    this.berlian = isi;
    this.hargaBatuMulia = 0;
  }
  clearPerhiasan(data:any){
    this.perhiasanParent = data.length;
    this.hargaPerhiasan = data.harga;
    
    if (data.length == 0) {
      this.hargaPerhiasan = 0;
    }
  }

  
  //total harga cart
  HPerhiasan(harga: any){
    this.hargaPerhiasan = harga;
  }
  HBatuMulia(harga: any){
    this.hargaBatuMulia = harga;
  }
  
  static key = EMenuID.DISTRO;

}

