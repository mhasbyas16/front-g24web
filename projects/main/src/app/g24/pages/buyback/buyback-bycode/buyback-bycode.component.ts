import { Component, OnInit, EventEmitter } from '@angular/core';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


// services
import { TransactionService } from '../../../services/transaction/transaction.service';

import { TanggalService } from '../../../lib/helper/tanggal.service';
import { PrmJualService } from '../../../services/parameter/prm-jual.service';


@Component({
  selector: 'app-buyback-bycode',
  templateUrl: './buyback-bycode.component.html',
  styleUrls: ['./buyback-bycode.component.scss']
})

@DContent(BuybackBycodeComponent.key)
export class BuybackBycodeComponent implements OnInit {

  //Form Search
  searchTrans: FormGroup = null;
  
  //id response
  detailTransaction : any;
  totalDetail : any;
  

  //perhiasan
  isiPerhiasan : any[];
  totalIsiPerhiasan : any;
  

  //emas batangan
  isiEmasBatangan: any;
  totalIsiEmasBatangan: any;

  //berlian
  isiBerlian : any[];
  totalIsiBerlian : any;
  
  //souvenir
  isiSouvenir : any[];
  totalIsiSouvenir : any;

  //dinar
  isiDinar : any[];
  totalIsiDinar : any;

  //global
  total : any
  hargaBB = 0;
 
  //tanggal
  tanggalTerbilang : any;

  loadingDg: boolean = false;
  placeholderDatagrid = "Silahkan Cari Transaksi Berdasarkan Parameter";
  perhiasanParent: any;
  hargaTotalPerhiasan: any = 0
  hargaTotalEmasBatangan : any = 0
  hargaTotalBerlian : any = 0
  hargaTotalSouvenir : any = 0
  hargaTotalDinar : any = 0


  totalCart: any = 0
  totalIsiCartPerhiasanBBC: any = 0
  totalIsiCartEmasBatanganBBC: any = 0
  totalIsiCartBerlianBBC: any = 0
  totalIsiCartSouvenirBBC: any = 0
  totalIsiCartDinarBBC: any = 0

  productCategoryMulia= "product-category.code=c05";

  constructor(
    private toastrService:ToastrService,
    private transactionService: TransactionService,
    // private sessionService: SessionService,
    private tanggalService:TanggalService,
    private prmJualService: PrmJualService
  ) { }

  ngOnInit(): void {
    this.isiForm();
  }
  static key = EMenuID.BUYBACK

  isiForm(){
    this.searchTrans = new FormGroup({
      text: new FormControl("")
    });
  }

  searchTransaction(){
    this.loadingDg = true;
    this.totalDetail = 0;
    this.totalIsiPerhiasan = 0;
    this.isiPerhiasan = null
    this.isiEmasBatangan = null
    this.isiBerlian = null
    this.isiSouvenir = null
    this.isiDinar = null

    if (!this.searchTrans.valid) {
      this.toastrService.error("Harap Input Id", "Buyback");
      this.loadingDg = false;
      return;
    }
    let data = this.searchTrans.getRawValue();
     
    this.transactionService.get("?idTransaction="+data.text).subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Transaksi Tidak Ditemukan", "Buyback");
        this.loadingDg = false;
        return
      }
      this.detailTransaction = response
      this.totalDetail = 1

      let tgl =this.detailTransaction.makerDate;
      let tglSplit = tgl.split("/");
      let bulan = Number(tglSplit["0"]);
      let hari = tglSplit["1"];
      let tahun = tglSplit["2"];
      let bulanTerbilang = this.tanggalService.bulanGenerate(bulan);
      this.tanggalTerbilang = hari+" "+bulanTerbilang+" "+tahun
    
      //perhiasan
      this.isiPerhiasan =this.detailTransaction.product["PERHIASAN"] 
      this.totalIsiPerhiasan =  this.isiPerhiasan.length
      
      //mulia
      this.isiEmasBatangan =this.detailTransaction.product["LM"]
      for (let isi of this.isiEmasBatangan) {
       let hargass = 21323000
       isi.hargass = hargass
      //  console.debug(isi,"wews")
        this.prmJualService.get("?"+this.productCategoryMulia+"&flag=approved"+"&vendor.code="+isi.detail['vendor'].code).subscribe((BBresponse: any) => {
          console.debug(BBresponse,"wews")
        })
        
        // console.debug(this.isiEmasBatangan.detail['product-denom'].name , "denom")
        // console.debug(this.isiEmasBatangan.detail['vendor'].name , "vendor")
        // this.prmJualService.get("?"+this.productCategoryMulia+"&flag=approved"+"&vendor=").subscribe((BBresponse: any) => {
          
        // })
        
      } 
      this.totalIsiEmasBatangan=  this.isiEmasBatangan.length

      //berlian
      this.isiBerlian =this.detailTransaction.product["BERLIAN"] 
      this.totalIsiBerlian=  this.isiBerlian.length

      //souvenir
      this.isiSouvenir =this.detailTransaction.product["GS"] 
      this.totalIsiSouvenir=  this.isiSouvenir.length

       //souvenir
       this.isiDinar =this.detailTransaction.product["DINAR"] 
       this.totalIsiDinar=  this.isiSouvenir.length

      //loadingDG
      this.loadingDg = false;

    })
    
    
  }

  clearPerhiasan(data:any){
    this.totalIsiCartPerhiasanBBC  = data.length;
    this.hargaTotalPerhiasan = data.harga; 
  }

  clearEmasBatangan(data:any){
    this.totalIsiCartEmasBatanganBBC  = data.length;
    this.hargaTotalEmasBatangan = data.harga; 
  }

  clearBerlian(data:any){
    this.totalIsiCartBerlianBBC  = data.length;
    this.hargaTotalBerlian = data.harga; 
  }

  clearSouvenir(data:any){
    this.totalIsiCartSouvenirBBC  = data.length;
    this.hargaTotalSouvenir = data.harga; 
  }

  clearDinar(data:any){
    this.totalIsiCartDinarBBC  = data.length;
    this.hargaTotalDinar = data.harga; 
  }


  totalIsiCartPerhiasan(val){
    this.totalIsiCartPerhiasanBBC = val
  }
  
  totalIsiCartEmasBatangan(val){
    this.totalIsiCartEmasBatanganBBC = val
  }

  totalIsiCartBerlian(val){
    this.totalIsiCartBerlianBBC = val
  }

  totalIsiCartSouvenir(val){
    this.totalIsiCartSouvenirBBC = val
  }

  totalIsiCartDinar(val){
    this.totalIsiCartDinarBBC = val
  }

  totalJumlahCart(){
    this.totalCart = 0
    this.totalCart = this.totalIsiCartPerhiasanBBC + this.totalIsiCartEmasBatanganBBC + this.totalIsiCartBerlianBBC + this.totalIsiCartSouvenirBBC + this.totalIsiCartDinarBBC
    return this.totalCart
  }

  HTotalPerhiasan(harga: any){
    this.hargaTotalPerhiasan = harga;
  }

  HTotalEmasBatangan(harga: any){
    this.hargaTotalEmasBatangan = harga;
  }

  HTotalBerlian(harga: any){
    this.hargaTotalBerlian = harga;
  }

  HTotalSouvenir(harga: any){
    this.hargaTotalSouvenir = harga;
  }

  HTotalDinar(harga: any){
    this.hargaTotalDinar = harga;
  }
}

