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
  mulia:any;
  perhiasanParent:any;
  berlianParent:any;
  souvenirParent:any;
  dinarParent:any;

  // total harga per kategori
  hargaLogamMulia:any
  hargaPerhiasan:any;
  hargaBatuMulia:any;
  hargaSouvenir:any;
  hargaDinar:any;

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

  // total isi cart logamMulia
  totallogamMulia(isi: any){
    this.mulia = isi;
  }

  // total isi cart perhiasan
  totalPerhiasan(length: any){
    this.perhiasanParent = length;
    
  }

  // total isi cart berlian
  totalBerlian(isi: any){
    this.berlianParent = isi;
  }

  totalSouvenir(isi: any){
    this.souvenirParent = isi;
  }
  totalDinar(isi: any){
    this.dinarParent = isi;
  }

  //CLEAR
  // clear total cart
  clearTotal(num){
    this.total = num;
    this.hargaPerhiasan = 0 ;
    this.hargaBatuMulia = 0 ;
    this.hargaLogamMulia = 0 ;
  }
 
  clearMulia(data: any){
    this.mulia = data.length;
    this.hargaLogamMulia = data.harga;
  }
  clearBerlian(data: any){
    this.berlianParent = data.length;
    this.hargaBatuMulia = data.harga;
  
  }

  clearPerhiasan(data:any){
    this.perhiasanParent = data.length;
    this.hargaPerhiasan = data.harga;
    
  }

  clearSouvenir(data:any){
    this.souvenirParent = data.length;
    this.hargaSouvenir = data.harga;
    
  }

  clearDinar(data:any){
    this.dinarParent = data.length;
    this.hargaDinar = data.harga;
    
  }

  
  //total harga cart
  HPerhiasan(harga: any){
    this.hargaPerhiasan = harga;
  }
  HBatuMulia(harga: any){
    this.hargaBatuMulia = harga;
  }
  HMulia(harga: any){
    this.hargaLogamMulia = harga;
  }
  HSouvenir(harga: any){
    this.hargaSouvenir = harga;
  }
  HDinar(harga: any){
    this.hargaDinar = harga;
  }
  
  static key = EMenuID.DISTRO;

}

