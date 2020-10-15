import { Component, OnInit } from '@angular/core';

// pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare let require: any;

// rupiah terbilang
import { HargaTerbilangService } from '../../../lib/helper/harga-terbilang.service';
import { TanggalService } from '../../../lib/helper/tanggal.service';

@Component({
  selector: 'app-export-korporasi-proforma',
  templateUrl: './export-korporasi-proforma.component.html',
  styleUrls: ['./export-korporasi-proforma.component.scss']
})
export class ExportKorporasiProformaComponent implements OnInit {

  innerDoc = {};
  transactionList = [];
  noItem = 0;
  constructor(
    private tanggalService:TanggalService,
    private hargaTerbilangService:HargaTerbilangService
  ) { }

  ngOnInit(): void {
  }

  PDFData(idTransaction){
    
  }

  thisContent(data){
    
    // tanggal
    let tgl =data.makerDate;
    let tglSplit = tgl.split("/");
    let bulan = Number(tglSplit["0"]);
    let hari = tglSplit["1"];
    let tahun = tglSplit["2"];
    let bulanTerbilang = this.tanggalService.bulanGenerate(bulan);
   // let hariTerbilang = this.tanggalService.hariGenerate(Number(hari));
    // // Barcode
    // const JsBarcode = require('jsbarcode');
    // JsBarcode("#barcode", data.idTransaction,{height:17, width:1,fontSize: 11, margin:0,displayValue:false});
    // const canvas = this.barcode.nativeElement as HTMLCanvasElement;
    // const jpegUrl = canvas.toDataURL('image/jpeg');

    // Content
    delete this.innerDoc;
    let hargaFormat = new Intl.NumberFormat(['ban', 'id']).format(data.jumlahTerima);
    this.innerDoc ={pageSize: 'A5', pageOrientation: 'landscape',pageMargins: [ 20, 20, 20, 40 ],};
    this.innerDoc['info'] = {title: data.client.cif+" - "+data.idTransaction }; 

    let namaKasir = data.maker.name
    let namaDistro = data.maker.unit.nama

    let printAlamat : any;
    let printnoHp : any;
    if (data.client.tipeClient.code == 1) {
      printAlamat = data.client.alamatSaatIni.alamat
      printnoHp = data.client.noHP
    } else if(data.client.tipeClient.code == 2) {
      printAlamat = data.client.alamatSaatIni.alamat
      printnoHp = data.client.hpPJ1
    }

    // footer    
    this.innerDoc['footer'] = function(currentPage, pageCount) {
      return {
          margin:[0, 0, 0, 40],
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
        
        style: 'head',
			  columns: [
				  {text: 'ID Transaksi : '+data.idTransaction}
				  // {image: jpegUrl}
			  ]
      },
      '\n',
      {
        
        style:'detail',
        columns:[
          {
            columns:[
              {width:88,bold:true,text:'Nama Unit'},{width:5,bold:true,text:': '},{width:'*',text:data.unit.nama}
            ]
          },
          {
            columns:[
              {width:88,bold:true,text:'Nama Nasabah'},{width:5,bold:true,text:': '},{width:'*',text:data.client.name}
            ]
          }
			  ]
      },
      {
        style:'detail',
        columns:[
          {
            columns:[
              {width:88,bold:true,text:'Tanggal Pembelian'},{width:5,bold:true,text:': '},{width:'*',text:hari+' '+bulanTerbilang+' '+tahun}
            ]
          },
          {
            columns:[
              {width:88,bold:true,text:'Alamat'},{width:5,bold:true,text:': '},{width:'*',text:printAlamat}
            ]
          }
			  ]
      },
      {
        style:'detail',
        columns:[
          {
            columns:[
              {width:88,bold:true,text:'CIF'},{width:5,bold:true,text:': '},{width:'*',text:data.client.cif}
            ]
          },
          {
            columns:[
              {width:88,bold:true,text:'No. Hp'},{width:5,bold:true,text:': '},{width:'*',text:printnoHp}
            ]
          }
			  ]
      },'\n'  
    ];
            
    // style
    this.innerDoc['styles']={
      detail: {
        fontSize: 9,
        bold: false,
        alignment: 'left',
      },
      head:{
        fontSize: 9,
        bold: true,
        alignment: 'left',
      },
      footer:{
        fontSize: 6,
        alignment: 'left',
        italics: true,
      },
      kek:{
        fontSize: 9,
        alignment: 'center',
       
      }

    };

    // End Content

    this.ExportPDF(this.innerDoc);
  }

  ExportPDF(content){
  pdfMake.createPdf(content).open(); 
  }


}
