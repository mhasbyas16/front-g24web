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

  total:any;
  badge:any;
  price:any;

  // jumlah isi cart
  perhiasan:any;

  // total harga per kategori
  hargaPerhiasan:any;

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
  totalPerhiasan(isi: any){
    this.perhiasan = isi;
  }

  //total harga cart
  HPerhiasan(harga: any){
    this.hargaPerhiasan = harga;
  }

  // remove price
  RHPerhiasan(price: any){
  this.RPricePerhiasan = price;
  }
  static key = EMenuID.DISTRO;

}

