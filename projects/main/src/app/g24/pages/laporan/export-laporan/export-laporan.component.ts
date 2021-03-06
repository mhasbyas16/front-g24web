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
  noItem = 0;

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
  // function() { return currentPage.toString() + ' of ' + pageCount; },
  
  

  thisContent(data){
    
    let bulan;
    let hari;
    let tahun;
    let bulanTerbilang;
    let tgl;
    let tglSplit;
    // tanggal
    tgl =data.makerDate;
    tglSplit = tgl.split("/");
    bulan = Number(tglSplit["0"]);
    hari = tglSplit["1"];
    tahun = tglSplit["2"];
    bulanTerbilang = this.tanggalService.bulanGenerate(bulan);

    if (tglSplit.length <= 1) {
    tgl =data.makerDate;
    tglSplit = tgl.split("-");
    bulan = Number(tglSplit["1"]);
    hari = tglSplit["2"];
    tahun = tglSplit["0"];
    bulanTerbilang = this.tanggalService.bulanGenerate(bulan);
    }
   // let hariTerbilang = this.tanggalService.hariGenerate(Number(hari));
    // Barcode
    const JsBarcode = require('jsbarcode');
    JsBarcode("#barcode", data.idTransaction,{height:17, width:1,fontSize: 11, margin:0,displayValue:false});
    const canvas = this.barcode.nativeElement as HTMLCanvasElement;
    const jpegUrl = canvas.toDataURL('image/jpeg');

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

    // body Content
    if (data.product.PERHIASAN.length != 0) {
      this.innerDoc['content'].push([
        {
          style:'head', alignment:'left',text:'Perhiasan'
        }
      ]);
      for (let perhiasan of data.product.PERHIASAN) {
        this.noItem++
        //console.debug(data.product.PERHIASAN.length,product,"list product");  
        this.innerDoc['content'].push([
          {
            style:'detail',
            columns:[
              {
                width:"*",
                columns:[
                  {width:20,text: "(" +this.noItem+ ")"},
                  {width:85,text:perhiasan.detail.code},
                  {width:42,text:perhiasan.detail.vendor.name},
                  {width:41,text:perhiasan.detail['product-jenis'].name},
                  {width:23,text:perhiasan.kadar},
                  {width:25,text:perhiasan.berat}
                ]
              },
              {
                width:250,
                columns:[
                  {text:'Harga : Rp. '+new Intl.NumberFormat(['ban', 'id']).format(perhiasan.harga)},
                  {
                    table:{
                      widths: [85],
                      body:[
                        [{fillColor: '#ede5ce',alignment: 'center',fontSize:1,text:"tanggal buyback"}]
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
          fontSize: 7,
          columns:[
            {text:'Diskon :'},
            {text:'Voucher :'},
            {text:'Harga :'}
          ]
        },'\n'
      ]);
    }
    
    // Berlian
    if (data.product.BERLIAN.length != 0) {
      this.innerDoc['content'].push([
        {
          style:'head', alignment:'left',text:'Berlian'
        }
      ]);
      for (let berlian of data.product.BERLIAN) {
        this.noItem++
        //console.debug(data.product.PERHIASAN.length,product,"list product");  
        this.innerDoc['content'].push([
          {
            style:'detail',
            columns:[
              {
                width:"*",
                columns:[
                  {width:20,text: "(" +this.noItem+ ")"},
                  {width:70,text:berlian.detail.code},
                  {width:25,text:' '+berlian.detail.vendor.name},
                  {width:35,text:' '+berlian.detail['product-diamond-color'].name},
                  {width:25,text:' '+berlian.detail['product-cut'].name},
                  {width:38,text:' '+berlian.detail['product-clarity'].name},
                  // total berlian ,          
                  {width:20,text:' '+berlian.kadar},
                  {width:20,text:' '+berlian.berat},
                  // {width:40,text:'= '+berlian.detail.carat+' CT'},
                ]
              },
              {
                width:250,
                columns:[
                  {text:'Harga : Rp. '+new Intl.NumberFormat(['ban', 'id']).format(berlian.harga)},
                  {
                    table:{
                      widths: [85],
                      body:[
                        [{fillColor: '#ede5ce',alignment: 'center',fontSize:1,text:"tanggal buyback"}]
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
          fontSize: 7,
          columns:[
            {text:'Diskon :'},
            {text:'Voucher :'},
            {text:'Harga :'}
          ]
        },'\n'
      ]);
    }

    // Logam Mulia

    if (data.product.LM.length != 0){
      this.innerDoc['content'].push([
        {
          style:'head', alignment:'left',text:'Mulia'
        }
      ]);
      for (let mulia of data.product.LM) {
        this.noItem++
        //console.debug(data.product.PERHIASAN.length,product,"list product");  
        this.innerDoc['content'].push([
          {
            style:'detail',
            columns:[
              {
                width:"*",
                columns:[
                  {width:20,text: "(" +this.noItem+ ")"},
                  {width:60,text:mulia.detail.code},
                  {width:40,text:' '+mulia.detail.vendor.name},
                  {width:50,text:' '+mulia.detail['product-denom'].name},
                  {width:80,text:'No: '+mulia.noSeri},
                  // {width:25,text:' '+mulia.detail['product-cut'].name},
                  // {width:38,text:' '+mulia.detail['product-clarity'].name},
                  // total logam mulia ,          
                  // {width:20,text:' '+mulia.kadar},
                  // {width:20,text:' '+mulia.berat},
                  // {width:40,text:'= '+mulia.detail.carat+' CT'},
                ]
              },
              {
                width:250,
                columns:[
                  {text:'Harga : Rp. '+new Intl.NumberFormat(['ban', 'id']).format(mulia.harga)},
                  {
                    table:{
                      widths: [85],
                      body:[
                        [{fillColor: '#ede5ce',alignment: 'center',fontSize:1,text:"tanggal buyback"}]
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
          fontSize: 7,
          columns:[
            {text:'Diskon :'},
            {text:'Voucher :'},
            {text:'Harga :'}
          ]
        },'\n'
      ]);
    }

    //GS
    if (data.product.GS.length != 0){
      this.innerDoc['content'].push([
        {
          style:'head', alignment:'left',text:'Gift dan Souvenir'
        }
      ]);
      for (let gs of data.product.GS) {
        this.noItem++
        //console.debug(data.product.PERHIASAN.length,product,"list product");  
        this.innerDoc['content'].push([
          {
            style:'detail',
            columns:[
              {
                width:"*",
                columns:[
                  {width:20,text: "(" +this.noItem+ ")"},
                  {width:70,text:gs.detail.code},
                  {width:50,text:' '+gs.detail.vendor.name},
                  {width:50,text:' '+gs.detail['product-denom'].name},
                  {width:70,text:' '+gs.detail['product-series'].name},
                  
                ]
              },
              {
                width:250,
                columns:[
                  {text:'Harga : Rp. '+new Intl.NumberFormat(['ban', 'id']).format(gs.harga)},
                  {
                    table:{
                      widths: [85],
                      body:[
                        [{fillColor: '#ede5ce',alignment: 'center',fontSize:1,text:"tanggal buyback"}]
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
          fontSize: 7,
          columns:[
            {text:'Diskon :'},
            {text:'Voucher :'},
            {text:'Harga :'}
          ]
        },'\n'
      ]);
    }

    //Dinar
    if (data.product.DINAR.length != 0){
      this.innerDoc['content'].push([
        {
          style:'head', alignment:'left',text:'DINAR'
        }
      ]);
      for (let dn of data.product.DINAR) {
        this.noItem++
        //console.debug(data.product.PERHIASAN.length,product,"list product");  
        this.innerDoc['content'].push([
          {
            style:'detail',
            columns:[
              {
                width:"*",
                columns:[
                  {width:20,text: "(" +this.noItem+ ")"},
                  {width:70,text:dn.detail.code},
                  {width:50,text:' '+dn.detail.vendor.name},
                  {width:50,text:' '+dn.detail['product-denom'].name},
                  // {width:50,text:' '+dn.detail['product-series'].name},
                  // {width:25,text:' '+mulia.detail['product-cut'].name},
                  // {width:38,text:' '+mulia.detail['product-clarity'].name},
                  // total logam mulia ,          
                  // {width:20,text:' '+mulia.kadar},
                  // {width:20,text:' '+mulia.berat},
                  // {width:40,text:'= '+mulia.detail.carat+' CT'},
                ]
              },
              {
                width:250,
                columns:[
                  {text:'Harga : Rp. '+new Intl.NumberFormat(['ban', 'id']).format(dn.harga)},
                  {
                    table:{
                      widths: [85],
                      body:[
                        [{fillColor: '#ede5ce',alignment: 'center',fontSize:1,text:"tanggal buyback"}]
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
          fontSize: 7,
          columns:[
            {text:'Diskon :'},
            {text:'Voucher :'},
            {text:'Harga :'}
          ]
        },  
      ]);
    }

    // footer content
    this.innerDoc['content'].push([
      '\n',
      {
        unbreakable: true,
        fontSize: 9,
        columns:[
          
          [
            { 
              text: [
                namaKasir+'\n\n\n\n',
                namaDistro+'\n'
                ], 
              style: 'kek' 
            },
            { 
              text:
              [
              '\n* harga Termasuk pajak\n',
              '* bukti pembelian ini merupakan kuitansi pembelian emas\n',
              '* harap bukti pembelian ini disimpan jangan sampai hilang/rusak'
              ],
              style:'footer'
            },
          ],

          {
            columns:[
              {width:80,text:[
                'Harga\n',
                'Diskon\n',
                'Voucher\n',
                '\n',
                'Jumlah Bayar \n',
                'Terbilang'], bold:true},
              {width:5,text:[
                ':\n',
                ':\n',
                ':\n',
                '\n',
                ':\n',
                ':'],bold:true},
              {width:'*',text:[
                ' Rp. '+hargaFormat+'\n',
                ' Rp. - \n',
                ' Rp. - \n',
                '\n',
                ' Rp. '+hargaFormat+'\n',
                this.terbilangService.terbilang(Number(data.jumlahTerima))]}
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
