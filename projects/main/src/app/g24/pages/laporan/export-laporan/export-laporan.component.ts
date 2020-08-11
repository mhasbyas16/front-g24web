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
    console.debug(data, data.idTransaction,"isi data PDF")

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
				  {text: data.idTransaction},
				  {image: jpegUrl}
			  ]
      },
      '\n',
      {
        style:'detail',
        columns:[
          {text: 'Nama Unit : '+data.unit.nama},
          {text: ' Nama Nasabah : '+ data.client.name}
			  ]
      },
      {
        style:'detail',
        columns:[
          {text: 'Tanggal Pembelian : '+data.makerDate+', '+data.makerTime},
          {text: 'Alamat : '+data.client.alamatSaatIni.alamat}
			  ]
      },
      {
        style:'detail',
        columns:[
          {text: 'CIF : '+data.client.cif},
          {text: 'No. Hp : '+data.client.noHP}
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
            table: {
              headerRows: 1,
              widths: ['auto','auto','auto','auto','auto','auto','auto',80],
              body: [
                [
                  {text:perhiasan.detail.code},
                  {text:perhiasan.detail.vendor.name},
                  {text:perhiasan.detail['product-jenis'].name},
                  {text:perhiasan.detail['product-gold-color'].name},
                  {text:perhiasan.kadar},
                  {text:perhiasan.berat},
                  {text:'Harga : Rp. '+new Intl.NumberFormat(['ban', 'id']).format(perhiasan.harga), noWrap: true}, 
                  {fillColor: '#ede5ce',fontSize:3,alignment: 'center', text:'tanggal buyback'}
                ],
                [{colSpan: 6,text: ''},'','','','','',{colSpan: 2,fontSize:5,text: 'Diskon :'},''],
                [{colSpan: 6,text: ''},'','','','','',{colSpan: 2,fontSize:5,text: 'Voucher :'},''],
                [{colSpan: 6,text: ''},'','','','','',{colSpan: 2,fontSize:5,text: 'Harga :'},''],
              ]
            },
            layout: 'noBorders'
          }
        ]);   
      }
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
            table: {
              headerRows: 1,
              widths: ['auto','auto','auto','auto','auto','auto','auto','auto','auto','auto',80],
              body: [
                [
                  {text:berlian.detail.code},
                  {text:berlian.detail.vendor.name},
                  {text:berlian.detail['product-jenis'].name},
                  {text:berlian.detail['product-gold-color'].name},
                  {text:berlian.detail['product-diamond-color'].name},
                  {text:berlian.detail['product-clarity'].name},
                  {text:berlian.detail.carat},
                  {text:berlian.kadar},
                  {text:berlian.berat},
                  {text:'Harga : Rp. '+new Intl.NumberFormat(['ban', 'id']).format(berlian.harga), noWrap: true}, 
                  {fillColor: '#ede5ce',fontSize:3,alignment: 'center', text:'tanggal buyback'}
                ],
                [{colSpan: 9,text: ''},'','','','','','','','',{colSpan: 2,fontSize:5,text: 'Diskon :'},''],
                [{colSpan: 9,text: ''},'','','','','','','','',{colSpan: 2,fontSize:5,text: 'Voucher :'},''],
                [{colSpan: 9,text: ''},'','','','','','','','',{colSpan: 2,fontSize:5,text: 'Harga :'},''],
              ]
            },
            layout: 'noBorders'
          }
        ]);   
      }
    }
    

    // footer content
    this.innerDoc['content'].push([
      '\n',
      {
        table: {
          headerRows: 1,
          widths: [180, '*'],
          body: [
            [{text:'* harga Termasuk pajak',style:'footer'}, 
              {
                fontSize: 7,
							  rowSpan: 3,
							  border: [true, true, true, true],
                text:[
                {text:'Total Harga :', bold:true},
                ' Rp. '+hargaFormat,
                {text:'\n Terbilang : ', bold:true},
                this.terbilangService.terbilang(Number(data.jumlahTerima))
                ]                
              }
            ],
            [{text:'* bukti pembelian ini merupakan kuitansi pembelian emas',style:'footer'}],
            [{text:'* harap bukti pembelian ini disimpan jangan sampai hilang/rusak',style:'footer'}],
          ]
        },
        layout: 'noBorders'
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
        fontSize: 12,
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
