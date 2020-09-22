import { Component, OnInit } from '@angular/core';
import { DContent } from 'projects/main/src/app/g24/decorators/content/pages';
import { EMenuID } from 'projects/main/src/app/g24/lib/enums/emenu-id.enum';

// services
import { RekeningKoranService } from '../../../services/keuangan/jurnal/rekening-koran.service';
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rekening-koran',
  templateUrl: './rekening-koran.component.html',
  styleUrls: ['./rekening-koran.component.scss'],
  providers:[DatePipe],
})
@DContent(RekeningKoranComponent.key)

export class RekeningKoranComponent implements OnInit {

  // ClrDatagrid
  loadingDg: boolean = false;
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  search: FormGroup = null;
  header: FormGroup = null;
  formDetail: FormGroup = null;
  selected:any;
  testarr =[];
  modalDetailDialog: boolean = false;
  transactions = [];
  fromPick:any;

  maxDate = null;
  minDate = null;
  // Total Amount
  amountD=0;
  amountK=0;
  listTotal=[];
  cek=[];

  datatext = "";
  dk= [];

  

  constructor(
    private rekeningKoranService: RekeningKoranService,
    private toastrService:ToastrService,
    //session
    private sessionService: SessionService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.from();
    this.datepick();
    this.head();
    
  }

  startDate(data){
    this.maxDate = new Date(data.getFullYear(), data.getMonth() + 3, data.getDate()) ;
    this.minDate = data;
  }

  // modal detail 
  mainDetail(isi) {
    this.formDetail = new FormGroup({
      trxCode: new FormControl(""),
      keterangan: new FormControl("")
      
    });
    this.formDetail.patchValue({keterangan:isi.keterangan, trxCode:isi.trxCode, postDate:isi.postDate, trxDate:isi.trxDate,
                    noRek:isi.noRek, noCoa:isi.noCoa, createBy:isi.createBy,createDate:isi.createDate, authorizedBy:isi.authorizedBy,
                  authorizedDate:isi.authorizedDate, unit:isi.unit});
    isi:this.transactions;
    this.modalDetailDialog = true;

    // tslint:disable-next-line:no-console
    // console.debug('mainDetail', this.modalDetailDialog);
  }

  from(){
    this.search = new FormGroup({
      // from: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy')),
      // to: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy')),
      from: new FormControl(""),
      to: new FormControl(""),
      text: new FormControl("")
    });
  }
  head(){
    this.header = new FormGroup({
      // from: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy')),
      // to: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy')),
      unit: new FormControl(""),
      deskripsi: new FormControl(""),
      saldoAwal: new FormControl("")
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
    let params = "";

    let mulai = this.datePipe.transform(data.from, 'yyyy-MM-dd');
    let selesai = this.datePipe.transform(data.to, 'yyyy-MM-dd');
    // Session
    const getUnit = this.sessionService.getUnit();
    params = params+"&unit="+getUnit["code"];

    if (data.from == "" && data.text == "") {
      this.toastrService.error("Please Complete Fill This From", "Rekening Koran");
      this.loadingDg = false;
       return;
    }

    if (data.from != "") {
      if (data.to == "") {
        this.toastrService.error("Complete Range Date", "Rekening Koran");
        this.loadingDg = false;
        return;
      }else if(data.to != ""){
        params = params+"&_between=createDate&_start="+mulai+"&_end="+selesai;
      }
    }

    if (data.text != "") {
      if (val == 'noRek') {
        this.rekeningKoranService.list("?"+params+"&detail.noRek_regex=1&detail.noRek="+data.text).subscribe((response:any)=>{
          if (response["length"] != 0) {
            params = params+"&detail.noRek_regex=1&detail.noRek="+data.text;
            this.getJurnal(params);
            this.datatext = data.text;
            return
          }else{
            this.filterTransaction('idJurnal');
            return
          }
        })
      } 
      // else if (val == 'noRek') {
      //   this.rekeningKoranService.list("?"+params+"&detail.noRek_regex=1&detail.noRek="+data.text).subscribe((response:any)=>{
      //     if (response["length"] != 0) {
      //       params = params+"&detail.noRek_regex=1&detail.noRek="+data.text;
      //       this.getJurnal(params);
      //       return
      //     }
      //   })
      // }
    }
    else{
      this.getJurnal(params);
      return
    }
  }

   

  getJurnal(params){       
    // this.listTotalHarga.splice(0);
    this.rekeningKoranService.list("?"+params).subscribe((response:any)=>{
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
      let wew = response      
      this.transactions = response; 
      let no = 1;    

      
      
     
      this.toastrService.success("Load "+this.transactions.length+" Data", "Transaction");

      

      for (let index=0; index <  wew.length; index++) {        
        
        const debit = this.transactions[index].detail.find(x=>x.noRek == this.datatext).amountD;
        const kredit = this.transactions[index].detail.find(x=>x.noRek == this.datatext).amountK;
        const deskripsi = this.transactions[index].detail.find(x=>x.noRek == this.datatext).name;
        const noRek = this.transactions[index].detail.find(x=>x.noRek == this.datatext).noRek;
        const noCoa = this.transactions[index].detail.find(x=>x.noRek == this.datatext).noCoa;

        
        this.transactions[index].debit = debit
        this.transactions[index].kredit = kredit
        this.transactions[index].deskripsi = deskripsi
        this.transactions[index].noRek = noRek
        this.transactions[index].noCoa = noCoa
      }

      for(let header of this.transactions){
        this.header.patchValue({unit: header.unit, deskripsi: header.deskripsi, saldoAwal: header.saldoAwal})
      }

      console.debug(this.transactions,"transaksi")

      for (let isi of this.transactions) {
        
        console.debug(isi.debit ,"debit");
        console.debug(isi.kredit ,"kredit");      

        isi.no=no++;

      }
     // console.debug(this.listTotalHarga ,"alkjfdljajkladkljadkla")
    })
  }
  static key = EMenuID.REKENING_KORAN;

}
