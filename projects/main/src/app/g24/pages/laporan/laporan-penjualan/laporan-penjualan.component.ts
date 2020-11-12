import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { DatePipe } from "@angular/common";
import { ToastrService } from 'ngx-toastr';

// services
import { TransactionService } from '../../../services/transaction/transaction.service';
import { SplitDateServiceService } from '../../../services/split-date-service.service';
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';

@Component({
  selector: 'app-laporan-penjualan',
  templateUrl: './laporan-penjualan.component.html',
  styleUrls: ['./laporan-penjualan.component.scss'],
  providers:[DatePipe],
})

@DContent(LaporanPenjualanComponent.key)
export class LaporanPenjualanComponent implements OnInit {

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

  //
  transactions = [];
  fromPick:any;

  constructor(
    private transactionService: TransactionService,
    
    private toastrService:ToastrService,
    //session
    private sessionService: SessionService,
    private datePipe: DatePipe,
    private splitDateServiceService:SplitDateServiceService
  ) { }

  ngOnInit(): void {
    this.form();
    this.datepick();
    this.filterTransaction('id');
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
        params = params+"&_between=makerDate&_start="+data.from+"&_end="+data.to;
      }
    }

    if (data.text != "") {
      if (val == 'id') {
        this.transactionService.list("?"+params+"&idTransaction_regex=1&idTransaction="+data.text).subscribe((response:any)=>{
          if (response["length"] != 0) {
            params = params+"&idTransaction_regex=1&idTransaction="+data.text;
            this.getTransaction(params);
            return
          }else{
            this.filterTransaction('name');
            return
          }
        })
      }else if (val == 'name'){
        this.transactionService.list("?"+params+"&client.name_regex=1&client.name="+data.text).subscribe((response:any)=>{
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
        this.transactionService.list("?"+params+"&client.cif_regex=1&client.cif="+data.text).subscribe((response:any)=>{
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
    this.transactionService.list("?"+params).subscribe((response:any)=>{
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
      this.toastrService.success("Load "+this.transactions.length+" Data", "Transaction");

      for (let isi of this.transactions) {
        this.totalP = 0;
        this.totalBerlian=0;
        this.totalHargaLM=0;
        this.totalHargaGS=0;
        this.totalHargaDinar=0;
        for (let hp of isi.product["PERHIASAN"]) {
          this.totalP = this.totalP + hp.harga;
        }
        for (let hb of isi.product["BERLIAN"]) {
          this.totalBerlian = this.totalBerlian + hb.harga;
        }
        for (let hLM of isi.product["LM"]) {
          this.totalHargaLM = this.totalHargaLM + hLM.harga;
        }
        for (let hGS of isi.product["GS"]) {
          this.totalHargaGS = this.totalHargaGS + hGS.harga;
        }
        for (let hDN of isi.product["DINAR"]) {
          this.totalHargaDinar = this.totalHargaDinar + hDN.harga;
        }
        this.listTotalHarga.push({
          "idTransaction":isi.idTransaction,
          "hargaP":this.totalP,
          "hargaB":this.totalBerlian,
          "hargaLM":this.totalHargaLM,
          "hargaGS":this.totalHargaGS,
          "hargaDinar":this.totalHargaDinar
        });
      }
     // console.debug(this.listTotalHarga ,"alkjfdljajkladkljadkla")
    })
  }

  sumP(){
    this.totalP += 1;
  }

  static key = EMenuID.LAPORAN;

}
