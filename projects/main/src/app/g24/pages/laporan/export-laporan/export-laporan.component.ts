import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare let require: any;

// service
import { TransactionService } from '../../../services/transaction/transaction.service';
// rupiah terbilang
import { HargaTerbilangService } from '../../../lib/helper/harga-terbilang.service';
import { TanggalService } from '../../../lib/helper/tanggal.service';


@Component({
  selector: 'app-export-laporan',
  templateUrl: './export-laporan.component.html',
  styleUrls: ['./export-laporan.component.scss']
})
export class ExportLaporanComponent implements OnInit {

  innerDoc = {};
  transactionList = [];

  constructor(
    private transactionService: TransactionService,
    private terbilangService: HargaTerbilangService,
    private tanggalService:TanggalService,
  ) { }

  ngOnInit(): void {
    console.debug(this.terbilangService.terbilang(101500000),"hasil persenan")
  
    //this.thisContent();
  }
  @ViewChild('barcode') barcode: ElementRef; 

  PDFData(idTransaction){
    this.transactionService.list('?_hash=1&idTransaction='+idTransaction).subscribe((response:any)=>{
      if (response != false) {
        this.transactionList = response;
        this.thisContent(this.transactionList[0]);
      }
    })
    
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
    // Barcode
    const JsBarcode = require('jsbarcode');
    JsBarcode("#barcode", data.idTransaction,{height:17, width:1,fontSize: 11, margin:0,displayValue:false});
    const canvas = this.barcode.nativeElement as HTMLCanvasElement;
    const jpegUrl = canvas.toDataURL('image/jpeg');

    // Content
    delete this.innerDoc;
    let hargaFormat = new Intl.NumberFormat(['ban', 'id']).format(data.jumlahTerima);
    this.innerDoc ={pageSize: 'A5', pageOrientation: 'portrait',pageMargins: [ 20, 60, 20, 40 ],};
    this.innerDoc['info'] = {title: data.client.cif+" - "+data.idTransaction }; 

    // Head Content
    this.innerDoc['content'] = [
      {
        style: 'head',
			  columns: [
				  {text: 'ID Transaksi : '+data.idTransaction},
				  {image: jpegUrl}
			  ]
      },
      '\n',
      {
        style:'detail',
        columns:[
          {
            columns:[
              {width:53,bold:true,text:'Nama Unit'},{width:5,bold:true,text:': '},{width:'*',text:data.unit.nama}
            ]
          },
          {
            columns:[
              {width:53,bold:true,text:'Nama Nasabah'},{width:5,bold:true,text:': '},{width:'*',text:data.client.name}
            ]
          }
			  ]
      },
      {
        style:'detail',
        columns:[
          {
            columns:[
              {width:53,bold:true,text:'Tanggal Pembelian'},{width:5,bold:true,text:': '},{width:'*',text:hari+' '+bulanTerbilang+' '+tahun}
            ]
          },
          {
            columns:[
              {width:53,bold:true,text:'Alamat'},{width:5,bold:true,text:': '},{width:'*',text:data.client.alamatSaatIni.alamat}
            ]
          }
			  ]
      },
      {
        style:'detail',
        columns:[
          {
            columns:[
              {width:53,bold:true,text:'CIF'},{width:5,bold:true,text:': '},{width:'*',text:data.client.cif}
            ]
          },
          {
            columns:[
              {width:53,bold:true,text:'No. Hp'},{width:5,bold:true,text:': '},{width:'*',text:data.client.noHP}
            ]
          }
			  ]
      },'\n'  
    ];

    // body Content
    if (data.product.PERHIASAN.length != 0) {
      this.innerDoc['content'].push([
        {
          style:'head',fontSize:8, alignment:'left',text:'Perhiasan'
        }
      ]);
      for (let perhiasan of data.product.PERHIASAN) {
        //console.debug(data.product.PERHIASAN.length,product,"list product");  
        this.innerDoc['content'].push([
          {
            style:'detail',
            columns:[
              {
                width:"*",
                columns:[
                  {width:55,text:perhiasan.detail.code},
                  {width:25,text:perhiasan.detail.vendor.name},
                  {width:25,text:perhiasan.detail['product-jenis'].name},
                  {width:25,text:perhiasan.detail['product-gold-color'].name},
                  {width:18,text:perhiasan.kadar},
                  {width:20,text:perhiasan.berat}
                ]
              },
              {
                width:160,
                columns:[
                  {text:'Harga : Rp. '+new Intl.NumberFormat(['ban', 'id']).format(perhiasan.harga)},
                  {
                    table:{
                      widths: [60],
                      body:[
                        [{fillColor: '#ede5ce',fontSize:3,alignment: 'center', text:'tanggal buyback'}]
                      ]
                    }
                  }
                ]
              }
            ]
          },
        ]);   
      }
      this.innerDoc['content'].push([
        {
          style:'detail',
          fontSize: 5,
          columns:[
            {text:'Diskon :'},
            {text:'Voucher :'},
            {text:'Harga :'}
          ]
        },'\n'
      ]);
    }
    

    if (data.product.BERLIAN.length != 0) {
      this.innerDoc['content'].push([
        {
          style:'head',fontSize:8, alignment:'left',text:'Berlian'
        }
      ]);
      for (let berlian of data.product.BERLIAN) {
        //console.debug(data.product.PERHIASAN.length,product,"list product");  
        this.innerDoc['content'].push([
          {
            style:'detail',
            columns:[
              {
                width:"*",
                columns:[
                  {width:55,text:berlian.detail.code},
                  {width:20,text:' '+berlian.detail.vendor.name},
                  {width:24,text:' '+berlian.detail['product-jenis'].name},
                  {width:19,text:' '+berlian.detail['product-gold-color'].name},
                  {width:20,text:' '+berlian.detail['product-diamond-color'].name},
                  {width:23,text:' '+berlian.detail['product-clarity'].name},
                  {width:15,text:' '+berlian.detail.carat},
                  {width:12,text:' '+berlian.kadar},
                  {width:12,text:' '+berlian.berat}
                ]
              },
              {
                width:160,
                columns:[
                  {text:'Harga : Rp. '+new Intl.NumberFormat(['ban', 'id']).format(berlian.harga)},
                  {
                    table:{
                      widths: [60],
                      body:[
                        [{fillColor: '#ede5ce',fontSize:3,alignment: 'center', text:'tanggal buyback'}]
                      ]
                    }
                  }
                ]
              }
            ]
          }
        ]);   
      }
      this.innerDoc['content'].push([
        {
          style:'detail',
          fontSize: 5,
          columns:[
            {text:'Diskon :'},
            {text:'Voucher :'},
            {text:'Harga :'}
          ]
        },'\n'
      ]);
    }
    

    // footer content
    this.innerDoc['content'].push([
      '\n',
      {
        fontSize: 7,
        columns:[
          {text:[
            '* harga Termasuk pajak\n',
            '* bukti pembelian ini merupakan kuitansi pembelian emas\n',
            '* harap bukti pembelian ini disimpan jangan sampai hilang/rusak'],style:'footer'},
          {
            columns:[
              {width:45,text:'Total Harga\nTerbilang', bold:true},
              {width:5,text:':\n:',bold:true},
              {width:'*',text:' Rp. '+hargaFormat+'\n'+this.terbilangService.terbilang(Number(data.jumlahTerima))}
            ]
            // text:[
            // {text:'Total Harga :', bold:true},
            // ' Rp. '+hargaFormat+'\n',
            // {text:'Terbilang : ', bold:true},
            // this.terbilangService.terbilang(Number(data.jumlahTerima))
            // ]
          }
        ]
      }
    ]);
            
    // style
    this.innerDoc['styles']={
      detail: {
        fontSize: 6,
        bold: false,
        alignment: 'left',
      },
      head:{
        fontSize: 10,
        bold: true,
        alignment: 'center',
      },
      footer:{
        fontSize: 6,
        alignment: 'left',
      }

    };

    // End Content

    this.ExportPDF(this.innerDoc);
  }

  ExportPDF(content){
  pdfMake.createPdf(content).open(); 
  }

}
