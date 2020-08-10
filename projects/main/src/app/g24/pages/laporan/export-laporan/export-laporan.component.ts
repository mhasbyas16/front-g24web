import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
    const canvas = document.getElementById('barcode') as HTMLCanvasElement;
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
    this.innerDoc['content'].push([
      {
        style:'head', alignment:'left',text:'Logam Mulia'
      },
      {
        style:'detail',
        text: 'emas'
      },'\n'
    ]);

    // footer content
    this.innerDoc['content'].push([
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
        fontSize: 8,
        bold: true,
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
