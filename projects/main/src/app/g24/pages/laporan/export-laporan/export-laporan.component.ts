import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-export-laporan',
  templateUrl: './export-laporan.component.html',
  styleUrls: ['./export-laporan.component.scss']
})
export class ExportLaporanComponent implements OnInit {

  innerDoc = {};

  constructor() { }

  ngOnInit(): void {
    const JsBarcode = require('jsbarcode');
    JsBarcode("#barcode", "1234567890123456",{height:17, width:1,fontSize: 11, margin:0,displayValue:false});
    this.thisContent();
  }
  @ViewChild('barcode') barcode: ElementRef; 

  PDFData(){
    this.thisContent();
  }

  thisContent(){
    delete this.innerDoc;
    const canvas = document.getElementById('barcode') as HTMLCanvasElement;
    const jpegUrl = canvas.toDataURL('image/jpeg');

    this.innerDoc ={pageSize: 'A5', pageOrientation: 'portrait',pageMargins: [ 20, 60, 20, 40 ],};
    this.innerDoc['info'] = {title: 'awesome Document' }; 

    // Head Content
    this.innerDoc['content'] = [
      {
        style: 'head',
			  columns: [
				  {text: '1234567890123456'},
				  {image: jpegUrl}
			  ]
      },
      '\n',
      {
        style:'detail',
        columns:[
          {text: 'Nama Unit : Unknown'},
          {text: ' Nama Nasabah : Unknown'}
			  ]
      },
      {
        style:'detail',
        columns:[
          {text: 'Tanggal Pembelian : Unknown'},
          {text: 'Alamat : asdasd dasdasdasdas dasd adaasdafsgfsdg dgdfg dfgh fdhfh h fh f'}
			  ]
      },
      {
        style:'detail',
        columns:[
          {text: 'CIF : Unknown'},
          {text: 'No. Hp : unknown'}
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
        text: 'Alamat : asdasd dasdasdasdas dasd adaasdafsgfsdg dgdfg dfgh fdhfh h fh f'
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
                fontSize: 9,
                bold:true,
							  rowSpan: 3,
							  border: [true, true, true, true],
							  text: 'Total Harga : \n Terbilang :\n'
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

    this.ExportPDF(this.innerDoc);
  }

  ExportPDF(content){
  pdfMake.createPdf(content).open(); 
  }

}
