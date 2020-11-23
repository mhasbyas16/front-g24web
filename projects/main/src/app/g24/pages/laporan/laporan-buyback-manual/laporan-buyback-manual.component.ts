import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { DatePipe } from "@angular/common";
import { ToastrService } from 'ngx-toastr';

// services
import { BuybackTransactionService } from '../../../services/buyback/buyback-transaction.service';
import { ProductService } from '../../../services/product/product.service';
import { SplitDateServiceService } from '../../../services/split-date-service.service';

//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ContentPage } from '../../../lib/helper/content-page';
import { BuybackManualService } from '../../../services/keuangan/jurnal/buyback-manual/buyback-manual.service';

@Component({
  selector: 'app-laporan-buyback-manual',
  templateUrl: './laporan-buyback-manual.component.html',
  styleUrls: ['./laporan-buyback-manual.component.scss'],
  providers:[DatePipe],
})
@DContent(LaporanBuybackManualComponent.key)
export class LaporanBuybackManualComponent implements OnInit {

  // ClrDatagrid
  loadingDg: boolean = false;
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  search: FormGroup = null;
  selected:any;
  testarr =[];

  // Harga
  totalP=0;
  totalBerlian=0;
  totalHargaLM=0;
  totalHargaGS=0
  totalHargaDinar=0
  listTotalHarga=[];
  idTransaction : any
  nikUser : any

  //
  transactions = [];
  fromPick:any;

  approveds: boolean = false
  rejecteds: boolean = false

  constructor(
    private buybackTransactionService: BuybackTransactionService,
    private productService: ProductService,
    
    private toastrService:ToastrService,
    //session
    private sessionService: SessionService,
    private datePipe: DatePipe,
    private splitDateServiceService:SplitDateServiceService,
    private jurnalBuybackManual:BuybackManualService

  ) { }

  ngOnInit(): void {
    this.form();
    this.datepick();
    this.filterTransaction('id');
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"role":this.nikUser.role.name} ;
  }

  totalHarga(val){
    this.totalP = this.totalP+Number(val);
  }
  form(){
    this.search = new FormGroup({
      from: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy')),
      to: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy')),
      // from: new FormControl(""),
      // to: new FormControl(""),
      text: new FormControl("")
    });
  }

  datepick(){
    let bulan= Number(this.datePipe.transform(Date.now(),'MM'))-3;
    let hari = this.datePipe.transform(Date.now(),'dd');
    let tahun = this.datePipe.transform(Date.now(),'yyyy');
    this.fromPick = tahun+'-'+bulan+'-'+hari;
    // console.debug(,"format tanggal");
  }


  filterTransaction(val){
    // CLR Datagrid loading
    this.loadingDg = true;

    let data = this.search.getRawValue(); 
    data.from = this.splitDateServiceService.split(data.from);
    data.to = this.splitDateServiceService.split(data.to);
    let params = "";
    let paramTransaction = "&_or=transaction-type.code:b02,b03,b04"

    // Session
    const getUnit = this.sessionService.getUnit();
    params = params+"&maker.unit.code="+getUnit["code"];

    if (data.from == "" && data.text == "") {
      this.toastrService.error("Please Complete Fill This From", "Transaction");
      this.loadingDg = false;
       return;
    }

    if (data.from != "") {
      if (data.to == "") {
        this.toastrService.error("Complete Range Date", "Transaction");
        this.loadingDg = false;
        return;
      }else if(data.to != ""){
        params = params+paramTransaction+"&_between=makerDate&_start="+data.from+"&_end="+data.to;
        
      }
    }

    if (data.text != "") {
      if (val == 'id') {
        this.buybackTransactionService.list("?"+params+"&idTransactionBB_regex=1&idTransactionBB="+data.text).subscribe((response:any)=>{
          if (response["length"] != 0) {
            params = params+"&idTransactionBB_regex=1&idTransactionBB="+data.text;
            this.getTransaction(params);
            return
          }else{
            this.filterTransaction('name');
            return
          }
        })
      }else if (val == 'name'){
        this.buybackTransactionService.list("?"+params+"&client.name_regex=1&client.name="+data.text).subscribe((response:any)=>{
          if (response["length"] != 0) {
            params = params+"&client.name_regex=1&client.name="+data.text;
            this.getTransaction(params);
            return
          }else{
            this.filterTransaction('cif');
            return
          }
        })
      }else if (val == 'cif'){
        this.buybackTransactionService.list("?"+params+"&client.cif_regex=1&client.cif="+data.text).subscribe((response:any)=>{
          if (response["length"] != 0) {
            params = params+"&client.cif_regex=1&client.cif="+data.text;
            this.getTransaction(params);
            return
          }else{
            this.toastrService.error("Data Not Found", "Transaction");
            this.loadingDg = false;
            this.transactions = [];
            return
          }
        })
      }
    }else{
      this.getTransaction(params);
      return
    }

  }

  getTransaction(params){       
    this.listTotalHarga.splice(0);
    this.buybackTransactionService.list("?"+params).subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Data Not Found", "Transaction");
        this.loadingDg = false;
        this.transactions = [];
        return;
      }  
      if (response["length"] == 0) {
        this.toastrService.error("Data Not Found", "Transaction");
        this.loadingDg = false;
        this.transactions = [];
        return;
      }
      
      this.loadingDg = false;
      this.transactions = response;
      console.debug(this.transactions, "wewe")
      this.toastrService.success("Load "+this.transactions.length+" Data", "Transaction");

      for (let isi of this.transactions) {
        this.totalP = 0;
        this.totalBerlian=0;
        this.totalHargaLM=0;
        this.totalHargaGS=0;
        this.totalHargaDinar=0;
        if ( isi.product["PERHIASAN"] != null) {
          for (let hp of isi.product["PERHIASAN"]) {
            this.totalP = this.totalP + hp.hargaBB;
          }
        }
        // for (let hb of isi.product["BERLIAN"]) {
        //   this.totalBerlian = this.totalBerlian + hb.hargaBB;
        // }
        if ( isi.product["LM"] != null) {
          for (let hLM of isi.product["LM"]) {
            this.totalHargaLM = this.totalHargaLM + hLM.hargaBB;
          }
        }
        if ( isi.product["GS"] != null) {
          for (let hGS of isi.product["GS"]) {
            this.totalHargaGS = this.totalHargaGS + hGS.hargaBB;
          }
        }
        // for (let hDN of isi.product["DINAR"]) {
        //   this.totalHargaDinar = this.totalHargaDinar + hDN.hargaBB;
        // }
        
        this.listTotalHarga.push({
          "idTransactionBB":isi.idTransactionBB,
          "hargaP":this.totalP,
          "hargaB":this.totalBerlian,
          "hargaLM":this.totalHargaLM,
          "hargaGS":this.totalHargaGS,
          "hargaDinar":this.totalHargaDinar
        });
      }
    })
  }

  sumP(){
    this.totalP += 1;
  }

  approvedFlag(idTransaction){
    let data = {_id: idTransaction, flag: "approved" , approval: this.nikUser._hash, approval_encoded: "base64", approvalDate: this.datePipe.transform(Date.now(),'yyyy-MM-dd') }
    let detailProduct : any
    let paramDetail = "?_id="+idTransaction
    this.buybackTransactionService.update(data).subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Approve data Failed");
        return;
      }
      this.buybackTransactionService.get(paramDetail).subscribe((response:any)=>{
        if (response.product.LM != null) {
          detailProduct = response.product.LM
        }else if (response.product.GS != null){
          detailProduct = response.product.GS
        }else if (response.product.PERHIASAN != null){
          detailProduct = response.product.PERHIASAN
        }

        let dataDetail : any
        let data = {batch_counter : detailProduct.length }
        for (let index = 0; index < detailProduct.length; index++) {
          dataDetail = btoa(JSON.stringify(detailProduct[index].detail))
          data[index+1] = dataDetail
          data[index+1+"_encoded"] = "base64"
        }
        this.productService.batchAdd(data).subscribe((response:any)=>{
        })
      })
      if (response != false) {
      this.jurnalBuybackManual.jurnal(data._id).subscribe((response:any)=>{
        if(response == true){
          this.toastrService.success("Jurnal Buyback Manual berhasil.");
        }
      })
    }
    })  
    this.toastrService.success("Approve data Success");
    this.filterTransaction('id');
    this.approveds = false
    this.ChangeContentArea("10010")
    
  }

  rejectedFlag(idTransaction){
    let data = {_id: idTransaction, flag: "rejected" , approval: this.nikUser._hash, approval_encoded: "base64", approvalDate: this.datePipe.transform(Date.now(),'yyyy-MM-dd') }

    this.buybackTransactionService.update(data).subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Approve data Failed");
       
        return;
      }
      this.toastrService.success("Approve data Success");
      this.ChangeContentArea('10010');
    })  

  }

  closeModal(){
    this.approveds = false
    this.rejecteds = false
  }

  approved(dataId){
    this.approveds = true
    this.idTransaction = dataId
  }
  rejected(dataId){
    this.rejecteds = true
    this.idTransaction = dataId
  }
  ChangeContentArea(pageId: string) {
    if (pageId.startsWith("x")) return;
    ContentPage.ChangeContent(pageId, true)
  }
  static key = EMenuID.LAPORAN_BUYBACK_MANUAL;
}
