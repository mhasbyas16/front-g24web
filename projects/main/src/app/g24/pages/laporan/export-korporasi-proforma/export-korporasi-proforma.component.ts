import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
// pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare let require: any;

// rupiah terbilang
import { HargaTerbilangService } from '../../../lib/helper/harga-terbilang.service';
import { TanggalService } from '../../../lib/helper/tanggal.service';
import { SplitDateServiceService } from '../../../services/split-date-service.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';

@Component({
  selector: 'app-export-korporasi-proforma',
  templateUrl: './export-korporasi-proforma.component.html',
  styleUrls: ['./export-korporasi-proforma.component.scss'],
  providers: [DatePipe]
})
export class ExportKorporasiProformaComponent implements OnInit {

  innerDoc = {};
  transactionList = [];
  noItem = 0;
  isiTable =[];
  dateNow:any;
  constructor(
    private tanggalService:TanggalService,
    private hargaTerbilangService:HargaTerbilangService,
    private splitDateServiceService:SplitDateServiceService,
    private datePipe:DatePipe,
    private sessionService:SessionService
  ) { }

  ngOnInit(): void {
  }

  PDFData(idTransaction,totalGram){
    // this.transactionService.list('?_hash=1&idTransaction='+idTransaction).subscribe((response:any)=>{
    //   if (response != false) {
    //     this.transactionList = response;
    //     this.thisContent(this.transactionList[0]);
    //   }
    // })
    console.log(idTransaction);
    this.thisContent(idTransaction,totalGram);
  }

  thisContent(data,gram){
    
    let user = this.sessionService.getUser();
    let nameUser = user.name;
    let codeUser = user.username;
    // // tanggal
    // let tgl =data.makerDate;
    // let tglSplit = tgl.split("/");
    // let bulan = Number(tglSplit["0"]);
    // let hari = tglSplit["1"];
    // let tahun = tglSplit["2"];
    // let bulanTerbilang = this.tanggalService.bulanGenerate(bulan);
   // let hariTerbilang = this.tanggalService.hariGenerate(Number(hari));
    // // Barcode
    // const JsBarcode = require('jsbarcode');
    // JsBarcode("#barcode", data.idTransaction,{height:17, width:1,fontSize: 11, margin:0,displayValue:false});
    // const canvas = this.barcode.nativeElement as HTMLCanvasElement;
    // const jpegUrl = canvas.toDataURL('image/jpeg');

    // Content
    this.dateNow = this.splitDateServiceService.splitBulanTerbilang(this.datePipe.transform(Date.now(), 'yyyy-MM-dd'));
    delete this.innerDoc;
    let hargaFormat = new Intl.NumberFormat(['ban', 'id']).format(data.totalHarga);
    this.innerDoc ={pageSize: 'A4', pageOrientation: 'portrait',pageMargins: [ 38, 133, 38, 30 ],};
    this.innerDoc['info'] = {title: "Penjualan Korporasi Proforma"}; 

    // footer    
    this.innerDoc['footer'] = function(currentPage, pageCount) {
      return {
          margin:[0, 0, 0, 60],
          columns: [
          {
              fontSize: 9,
              text:[
              {
              text: '--------------------------------------------------------------------------' +
              '\n',
              margin: [0, 20]
              },
              {
              text: 'Halaman ' + currentPage.toString() + ' dari ' + pageCount,
              }
              ],
              alignment: 'center'
          }
          ]
      };

  },
      
   

    // Head Content
    this.innerDoc['content'] = [
      {
        text: ['BUKTI PEMBAYARAN PELUNASAN\n\n',
                'PEMBELIAN EMAS BATANGAN'],
        style: 'head',
      },'\n'
    ];

    // Detail Content
    this.innerDoc['content'].push([
      {
        style: 'detail',
        alignment: 'justify',
        text: [
                'Telah diterima pembayaran pelunasan atas pembelian emas batangan sebesar ',
                'Rp. '+hargaFormat,
                ' ( '+this.hargaTerbilangService.terbilang(Number(data.totalHarga))+' )',
                ' melalui transfer ke nomor rekening '+data.rekening['mata-anggaran']+' - '+data.rekening.code+' atas nama '+'PT. PEGADAIAN GALERI DUA EMPAT ',
                'pada tanggal '+this.splitDateServiceService.splitBulanTerbilang(data.tglPengajuan)+', '+'dengan data transaksi sebagai berikut :'
              ],        
      },'\n\n\n',
      {
        style:'detail',
        columns:[
          {width:160,text:[
            'Nama Nasabah\n\n',
            'No. Perjanjian Jual Beli\n\n',
            'Total Harga Pembelian\n\n',
            'Total Gram Emas Batangan']
          },
          {width:10,text:[
            ':\n\n',
            ':\n\n',
            ':\n\n',
            ':']
          },
          {width:'*',text:[
            ' '+data.client.name+'\n\n',
            ' '+data._id+'\n\n',
            ' Rp. '+hargaFormat+'\n\n',
            ' '+gram+' Gram']}
        ]
      },'\n\n\n\n'
    ]);

    // Footer Content
    this.innerDoc['content'].push([
      {
        style: 'footer',
        columns: [
          {
            text:[
              '\n',
              'Mengetahui',
              '\n\n\n\n\n',
              '(........................................)'
            ]
          },
          {
            text:[
              'Jakarta, '+this.dateNow,
              '\nDibuat oleh,',
              '\n\n\n\n\n',
              nameUser+'\n',
              codeUser
            ],
            pageBreak: 'after'
          }
        ]
      }
    ]);

    this.isiTable.push([
      {text:'Nama Penerima',style:'tableDesignHeader'},
      {text:'ID Penerima', style:'tableDesignHeader'},
      {text:'Kode',style:'tableDesignHeader'},
      {text:'Vendor', style:'tableDesignHeader'},
      {text:'Denom', style:'tableDesignHeader'},
      {text:'Harga', style:'tableDesignHeader', noWrap: true},
      {text:'Unit', style:'tableDesignHeader'}]);
    for (let o of data.product) {
      this.isiTable.push([
        {text:o.name , style:'tableDesign'},
        {text:o.noId, style:'tableDesign'},
        {text:o.code, style:'tableDesign'},
        {text:o.vendor, style:'tableDesign'},
        {text:o.denom, style:'tableDesign'},
        {text:"Rp. "+new Intl.NumberFormat(['ban', 'id']).format(o.harga), style:'tableDesign'},
        {text:o.detail.unit.nama, style:'tableDesign'}])
    }

    // Footer Content
    this.innerDoc['content'].push([
      {
        style:'head',
        text: 'List Nasabah'
      },
      {
        style: 'table',
        table: {
          widths:['*','*','auto','auto','auto','auto','*'],
          body : this.isiTable
        }
      }
    ]);

    
            
    // style
    this.innerDoc['styles']={
      head:{
        fontSize: 14,
        bold: false,
        alignment: 'center',
      },
      detail: {
        fontSize: 12,
        bold: false,
        alignment: 'left',
      },      
      footer:{
        fontSize: 12,
        alignment: 'center'
      },
      table: {
        alignment : 'center',
        margin: [0, 5, 0, 15]
      },
      tableDesignHeader:{
        fontSize : 10,
        bold:true
      },
      tableDesign:{
        fontSize : 9,
      }
    };

    // End Content

    this.ExportPDF(this.innerDoc);
  }

  ExportPDF(content){
  pdfMake.createPdf(content).open(); 
  }


}
