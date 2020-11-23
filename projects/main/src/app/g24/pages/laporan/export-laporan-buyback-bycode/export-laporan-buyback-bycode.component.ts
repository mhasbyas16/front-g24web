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

    //willchange
    let d = new Date(tahun+'-'+bulan+'-'+hari);
    let dayName = this.tanggalService.hariGenerate(d.getDay());
    console.debug(dayName,'day name');

    // let bulanTerbilang = this.tanggalService.bulanGenerate(bulan);
    let hariTerbilang = this.tanggalService.hariGenerate(Number(hari));
    // Barcode
  
    // Content
    delete this.innerDoc;
    let hargaFormat = new Intl.NumberFormat(['ban', 'id']).format(data.nominalTransaksi);
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
        text:'Hari ini '+dayName+' Tanggal '+ hari+' '+bulanTerbilang+' '+tahun +' dilakukan Pembayaran Buyback kepada nasabah atas nama '+ data.client.name +' dengan perincian sebagai berikut : \n \n'
      }
    ]);
    
    //perhiasan
    if (data.product.PERHIASAN.length != 0) {
      this.innerDoc['content'].push([
        {
          style:'head', alignment:'left',bold: true, text:'PERHIASAN'
        }
      ]);

      let rowPerhiasan = []
      rowPerhiasan.push(['No', 'Deskripsi', 'Berat', 'Kadar', 'Harga'])
      for (let perhiasan of data.product.PERHIASAN) {
        this.noItem++;
        rowPerhiasan.push([this.noItem, perhiasan.detail['product-jenis'].name+'/'+perhiasan.code, perhiasan.detail['berat'], perhiasan.detail['product-purity'].name , 'RP. '+ new Intl.NumberFormat(['ban', 'id']).format(perhiasan.hargaBB) ])
      }
      console.debug(rowPerhiasan)
        this.innerDoc['content'].push([
          {
            layout: 'lightHorizontalLines', // optional
            table: {
              headerRows: 1,
              widths: [ 25, 220, 50, 50, 100 ],
              body: rowPerhiasan
            }
          }
        ]);
      }


      // LM
      if (data.product.LM.length != 0) {
        this.innerDoc['content'].push([
          {
            style:'head', alignment:'left',bold: true, text:'\n LOGAM MULIA'
          }
        ]);
  
        let rowLM = []
        rowLM.push(['No', 'Deskripsi', 'Denom', 'Harga'])
        for (let lm of data.product.LM) {
          this.noItem++;
          rowLM.push([this.noItem, lm.detail.code+'/'+lm.noSeri, lm.detail['product-denom'].name, 'RP. '+ new Intl.NumberFormat(['ban', 'id']).format(lm.hargaBB) ])
        }
       
          this.innerDoc['content'].push([
            {
              layout: 'lightHorizontalLines', // optional
              table: {
                headerRows: 1,
                widths: [ 25, 220, 117, 100 ],
                body: rowLM
              }
            }
          ]);
      }


      // berlian
      if (data.product.BERLIAN.length != 0) {
        this.innerDoc['content'].push([
          {
            style:'head', alignment:'left',bold: true, text:'\n BERLIAN'
          }
        ]);
  
        let rowBerlian = []
        rowBerlian.push(['No', 'Deskripsi', 'Berat', 'Kadar', 'Harga'])
        for (let berlian of data.product.BERLIAN) {
          this.noItem++;
          rowBerlian.push([this.noItem, berlian.detail.code+'/'+berlian.detail['product-jenis'].name, berlian.detail.berat,berlian.detail['product-purity'].name,  'RP. '+ new Intl.NumberFormat(['ban', 'id']).format(berlian.hargaBB) ])
        }
       
          this.innerDoc['content'].push([
            {
              layout: 'lightHorizontalLines', // optional
              table: {
                headerRows: 1,
                widths: [ 25, 220, 50, 50, 100 ],
                body: rowBerlian
              }
            }
          ]);
      }
      
      // dinar
      if (data.product.DINAR.length != 0) {
        this.innerDoc['content'].push([
          {
            style:'head', alignment:'left',bold: true, text:'\n DINAR'
          }
        ]);
  
        let rowDinar = []
        rowDinar.push(['No', 'Deskripsi', 'Denom', 'Harga'])
        for (let dinar of data.product.DINAR) {
          this.noItem++;
          rowDinar.push([this.noItem, dinar.detail.code+'/', dinar.detail['product-denom'].name, 'RP. '+ new Intl.NumberFormat(['ban', 'id']).format(dinar.hargaBB) ])
        }
       
          this.innerDoc['content'].push([
            {
              layout: 'lightHorizontalLines', // optional
              table: {
                headerRows: 1,
                widths: [ 25, 220, 117, 100 ],
                body: rowDinar
              }
            }
          ]);
      }


      // GS
      if (data.product.GS.length != 0) {
        this.innerDoc['content'].push([
          {
            style:'head', alignment:'left',bold: true, text:'\n GIFT AND SOUVENIR'
          }
        ]);
  
        let rowGS = []
        rowGS.push(['No', 'Deskripsi', 'Denom', 'Harga'])
        for (let gs of data.product.GS) {
          this.noItem++;
          rowGS.push([this.noItem, gs.detail.code+'/', gs.detail['product-denom'].name, 'RP. '+ new Intl.NumberFormat(['ban', 'id']).format(gs.hargaBB) ])
        }
       
          this.innerDoc['content'].push([
            {
              layout: 'lightHorizontalLines', // optional
              table: {
                headerRows: 1,
                widths: [ 25, 220, 117, 100 ],
                body: rowGS
              }
            }
          ]);
      }

      this.innerDoc['content'].push([
        '\n',
        {
          unbreakable: true,
          fontSize: 12,
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
                  '\nTransaksi yang sudah diproses tidak dapat dibatalkan\n',
                  'Biaya transfer antar Bank sebesar Rp. 6.500,\n',
                  'Biaya RTGS sebesar Rp.25.000,- s/d Rp. 30.000,- (dibebankan kepada konsumen)',
               
                ],
                style:'footer',
                fontSize: 9,
                italic: true
              },
            ],
  
            {
              columns:[
                {width:80,text:[
                  'Harga\n',
                  'Terbilang'], bold:true},
                {width:5,text:[
                  ':\n',
                  ':'],bold:true},
                {width:'*',text:[
                  ' Rp. '+hargaFormat+'\n',
                  this.terbilangService.terbilang(Number(data.nominalTransaksi))]}
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
        fontSize: 12,
        alignment: 'center',
       
      }

    };


    this.ExportPDF(this.innerDoc);

  }
  ExportPDF(content){
    pdfMake.createPdf(content).open(); 
    }
}
