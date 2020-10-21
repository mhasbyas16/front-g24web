import { Component, OnInit } from '@angular/core';

// pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


import { TanggalService } from '../../../../lib/helper/tanggal.service';

import { MutasiService } from '../../../../services/stock/mutasi.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ServerDateTimeService } from '../../../../services/system/server-date-time.service';

@Component({
  selector: 'cetak-mutasi',
  templateUrl: './cetak-mutasi.component.html',
  styleUrls: ['./cetak-mutasi.component.scss']
})
export class CetakMutasiComponent implements OnInit {

  constructor(private tanggalservice : TanggalService,
              private mutasiservice : MutasiService,
              private session : SessionService,
              private timeservice : ServerDateTimeService) { }

  innerDoc = {};
  date : String  = "";
  time : String = "";

  dataArray : any = [];

  ngOnInit(): void {
  }


  PDFData(){
    this.mutasiservice.list('?flag=accept').subscribe((response:any)=>{
      if (response != false) {
        this.mutasiservice = response;
        this.Content(this.mutasiservice[0]);
      }
    })
    
  }

  Content(data){

  }

  async Makepdf(data){

    for(let i = 0; i < data.length; i++){
      console.log(data);
    }

  let datetime = await  this.timeservice.task("").toPromise();
  let tgl = datetime.split("T");
  this.date = tgl[0];
  this.time = tgl[1].split("Z")[0];

  this.innerDoc ={pageSize: 'A4', pageOrientation: 'landscape',pageMargins: [ 20, 20, 20, 40 ],};
  this.innerDoc['content'] = [{
        
              style: 'head',
              columns: [
                {
                  text: 'PT Pegadaian Galeri 24'
                }
              ]
            },

            {
        
              style: 'detail',
              columns: [
                {
                  columns : [
                    {width : 38, bold : true, text : this.session.getUser().unit.code},
                    {width : 5, bold : true,text : '- '},
                    {width : '*', text : this.session.getUser().unit.nama}
                  ]
                }
              ]
            },
          
            {
              style : 'head',
              columns : [
                {
                  //SPACE
                  columns : [
                    {alignment : 'center', bold : true, text : ""}
                  ]
                }
              ]
            },

            {
              //JUDUL
              style : 'head',
              columns : [
                {
                  columns : [
                    {alignment : 'center', fontSize : 22, bold : true, text : "MUTASI"}
                  ]
                }
              ]
            },

            {
              //HEADER JUDUL
              style: 'head',
              columns : [
                {
                  columns : [
                    {alignment : 'center', fontSize : 12, text : "Tanggal : "+this.date, lineHeight : 5}
                  ]
                }
              ]
            },

            {
              
              //TABLE ITEMS
              layout: 'lightHorizontalLines', // optional
              table: {
                headerRows: 2,
                widths: [ 100, 200, 100, 100, 100, 100 ],
        
                body: [
                        this.dataArray = data[0]
                  // [ 'No', '_id', 'Berat', 'Harga', 'Flag', 'Status' ],
                  // ['','Total','','','','']
                ]
              }
            },

            {
              style : 'head',
              columns : [
                {
                  //SPACE
                  columns : [
                    {lineHeight : 14, alignment : 'center', bold : true, text : ""}
                  ]
                }
              ]
            },

            {
              //BRANCH TUJUAN
              style: 'head',
              columns : [
                {
                  columns : [
                    {width : 88, bold : true, text : 'Branch Tujuan'},
                    {width : 5, bold : true, text : ' : '},
                    {width : '*', bold : true, text :  this.session.getUser().unit.code}
                  ]
                }
              ]
            }

          ];

  pdfMake.createPdf(this.innerDoc).open()
}
}
