import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare let require: any;

// service
import { BuybackTransactionService } from '../../../services/buyback/buyback-transaction.service';
// rupiah terbilang
import { HargaTerbilangService } from '../../../lib/helper/harga-terbilang.service';
import { TanggalService } from '../../../lib/helper/tanggal.service';


@Component({
  selector: 'app-export-laporan-buyback-bycode',
  templateUrl: './export-laporan-buyback-bycode.component.html',
  styleUrls: ['./export-laporan-buyback-bycode.component.scss']
})
export class ExportLaporanBuybackBycodeComponent implements OnInit {

  innerDoc = {};
  transactionList = [];
  noItem = 0;

  constructor(
    private buybackTransactionService: BuybackTransactionService,
    private terbilangService: HargaTerbilangService,
    private tanggalService:TanggalService,
  ) { }

  ngOnInit(): void {
    
  }

  PDFData(idTransactionBB){
    this.buybackTransactionService.get('?_hash=1&idTransactionBB='+idTransactionBB).subscribe((response:any)=>{
      if (response != false) {
        this.transactionList = response;
        this.thisContent(this.transactionList);
        
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
    let hariTerbilang = this.tanggalService.hariGenerate(Number(hari));
    // Barcode
  
    // Content
    delete this.innerDoc;
    
    this.innerDoc ={pageSize: 'A4', pageOrientation: 'potrait',pageMargins: [ 40, 40, 30, 40 ],};
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
          {text: 'PT. PEGADAIAN GALERI 24 \n BUKTI PEMBAYARAN BUYBACK KEPADA NASABAH'}
        ],
        fontSize: 16,
        bold:true,
        alignment: 'center',
        defaultStyle: {
          font: 'Helvetica'
        }
      },
      '\n',
      {
        style:'detail',
        columns:[
          {
            columns:[
              {
                width:98,
                
                text:'Nama Unit'
              },
              {
                width:5,
               
                text:': '
              },
              {
                width:'*',
                text:data.unit.nama
              }
            ],
            fontSize: 12,
            width: 277,
          },
          {
            columns:[
              {
                width:98,
                
                text:'Nama Nasabah'
              },
              {
                width:5,
               
                text:': '
              },
              {
                width:'*',
                text:data.client.name
              },
            ],
            fontSize: 12
          }
			  ]
      },
      {
        style:'detail',
       
        columns:[
          {
            columns:[
              {
                width:98,
                // bold:true,
                text:'Tanggal Buyback'
              },
              {
                width:5,
                // bold:true,
                text:': '
              },
              {
                width:'*',
                text:hari+' '+bulanTerbilang+' '+tahun
              }
            ],
            fontSize: 12,
            width: 277
          },
          {
            columns:[
              {
                width:98,
               
                text:'Alamat'
              },
              {
                width:5,
               
                text:': '
              },
              {
                width:'*',
                text:printAlamat
              }
            ],
            fontSize: 12,
            width: 277
          }
			  ]
      },
      {
        style:'detail',
        columns:[
          {
            columns:[
              {
                width:98,
                
                text:'CIF'
              },
              {
                width:5,
                
                text:': '
              },
              {
                width:'*',
                text:data.client.cif
              }
            ],
            fontSize: 12,
            width: 277
          },
          {
            columns:[
              {
                width:98,
                
                text:'No. Hp'
              },
              {
                width:5,
                
                text:': '
              },
              {
                width:'*',
                text:printnoHp
              }
            ],
            fontSize: 12,
            width: 277
          }
			  ]
      },'\n'  
    ];

    this.innerDoc['content'].push([
      {
        style:'head',
        alignment:'left',
        text:'Hari ini Tanggal '+ hari+' '+bulanTerbilang+' '+tahun +''
      }
    ]);
  

    this.ExportPDF(this.innerDoc);

  }
  ExportPDF(content){
    pdfMake.createPdf(content).open(); 
    }
}
