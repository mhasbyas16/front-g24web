import { Component, OnInit } from '@angular/core';

// pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


import { TanggalService } from '../../../lib/helper/tanggal.service';

import { MutasiService } from '../../../services/stock/mutasi.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ServerDateTimeService } from '../../../services/system/server-date-time.service';
import { ToastrService } from 'ngx-toastr';
import { returnOrFallthrough } from '@clr/core/internal';

@Component({
  selector: 'app-cetak-mutasi',
  templateUrl: './cetak-mutasi.component.html',
  styleUrls: ['./cetak-mutasi.component.scss']
})
export class CetakMutasiComponent implements OnInit {

  constructor(private tanggalservice : TanggalService,
    private mutasiservice : MutasiService,
    private session : SessionService,
    private timeservice : ServerDateTimeService,
    private toastr : ToastrService) { }

innerDoc = {};
date : String  = "";
time : String = "";
datamutasi : any = {};
noItem : number = 0;

dataArray : any = [];

addinput : any = {};

  ngOnInit(): void 
  {

  }


    DelimiterComma(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    async Makepdf(dataCetak)
    {
      this.noItem = 0;
      console.log(dataCetak);

      let params = "?";
      params += "unit_asal.code="+this.session.getUser().unit.code+"&";
      let data = await this.mutasiservice.list("?created_by="+this.session.getUser().username).toPromise();
      if(data==false){
        let msg = this.mutasiservice.message();
        this.toastr.error("Error mengambil id mutasi cetak "+msg);
        return;        
      }

      this.dataArray = data;



      let datetime = await  this.timeservice.task("").toPromise();
      let tgl = datetime.split("T");
      this.date = tgl[0];
      this.time = tgl[1].split("Z")[0];

      this.innerDoc ={pageSize: 'A4', pageOrientation: 'landscape',pageMargins: [ 20, 20, 20, 40 ],};
      this.innerDoc['content'] = 
      [

        {

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
                {alignment : 'center', fontSize : 22, bold : true, text : "KIRIM MUTASI "+ dataCetak["product-category"].name.toUpperCase()}
              ]
            }
          ]
        },

        {
          //HEADER
          style: 'head',
          columns : [
            {
              columns : [
                {alignment : 'center', fontSize : 12, text : "ID Mutasi " +this.dataArray[this.dataArray.length - 1]._id +" / Tanggal : "+this.date, lineHeight : 5}
              ]
            }
          ]
        }
      ];

        //CONTENT DATA
        //COLUMN
        if(dataCetak["product-category"].name == "Permata"){
          this.innerDoc['content'].push([
            {
              style : 'detail',
              columns : [
                {
                  layout: 'lightHorizontalLines',
                  columns : [
                    {alignment : 'center', lineHeight : 2, bold : true, text : "No",width : 40},
                    {alignment : 'center', lineHeight : 2, bold : true, text : "_Id Product",width : 180},
                    {alignment : 'center', lineHeight : 2, bold : true, text : "Berat",width : 60},
                    {alignment : 'center', lineHeight : 2, bold : true, text : "HPP Emas",width : 60},
                    {alignment : 'center', lineHeight : 2, bold : true, text : "HPP Berlian",width : 100},
                    {alignment : 'center', lineHeight : 2, bold : true, text : "HPP Batu",width : 100},
                    {alignment : 'center', lineHeight : 2, bold : true, text : "Ongkos Pembuatan",width : 120},
                    {alignment : 'center', lineHeight : 2, bold : true, text : "Flag",width : 80},
                    {alignment : 'center', lineHeight : 2, bold : true, text : "Status",width : 60},
                  ]
                }
              ]
            }
          ]);
        }else{
          this.innerDoc['content'].push([
            {
              style : 'detail',
              columns : [
                {
                  layout: 'lightHorizontalLines',
                  columns : [
                    {alignment : 'center', lineHeight : 2, bold : true, text : "No",width : 40},
                    {alignment : 'center', lineHeight : 2, bold : true, text : "_Id Product",width : '*'},
                    {alignment : 'center', lineHeight : 2, bold : true, text : "Berat",width : 40},
                    {alignment : 'center', lineHeight : 2, bold : true, text : "HPP",width : '*'},
                    {alignment : 'center', lineHeight : 2, bold : true, text : "Flag",width : '*'},
                    {alignment : 'center', lineHeight : 2, bold : true, text : "Status",width : '*'},
                  ]
                }
              ]
            }
          ]);
        }




    //ROW DATA    
    if(dataCetak.items.length != 0)
    {
        for (let produk of dataCetak.items) {
          this.noItem++;
          if(produk["product-category"].name == "Perhiasan"){
          this.innerDoc['content'].push([
            {
              style:'detail',
              columns:[
                {
                  width:"*",
                  columns:[
                    // {alignment : 'center', width:40,text: "(" +this.noItem+ ")"},
                    // {alignment : 'center', width:'*',text:produk._id},
                    // {alignment : 'center', width:40,text:' '+produk.berat == undefined ? "-" : produk.berat},
                    // {alignment : 'center', width:'*',text:' '+produk.hpp == undefined ? "-" : produk.hpp},
                    // {alignment : 'center', width:'*',text:' '+produk.flag == undefined ? "-" : produk.flag},
                    // {alignment : 'center', width:'*',text:' Dalam Pengiriman '}

                    {alignment : 'center', width:40,text: "(" +this.noItem+ ")"},
                    {alignment : 'center', width:'*',text:produk._id},
                    {alignment : 'center', width:60,text:' '+ produk.berat},
                    {alignment : 'center', width:'*',text:' '+produk.hpp == undefined ? "-" : this.DelimiterComma(produk.hpp)},
                    {alignment : 'center', width:'*',text:' '+produk.flag == undefined ? "-" : produk.flag},
                    {alignment : 'center', width:'*',text:' Dalam Pengiriman '}
                  ]
                }
              ]
            }
          ]);
          }else if(produk["product-category"].name == "Souvenir"){
            this.innerDoc['content'].push([
              {
                style:'detail',
                columns:[
                  {
                    width:"*",
                    columns:[

                      {alignment : 'center', width:40,text: "(" +this.noItem+ ")"},
                      {alignment : 'center', width:'*',text:produk._id},
                      {alignment : 'center', width:60,text:' '+produk["product-denom"].value},
                      {alignment : 'center', width:'*',text:' '+produk.hpp == undefined ? "-" : this.DelimiterComma(produk.hpp)},
                      {alignment : 'center', width:'*',text:' '+produk.flag == undefined ? "-" : produk.flag},
                      {alignment : 'center', width:'*',text:' Dalam Pengiriman '}
                    ]
                  }
                ]
              }
            ]);
          }else if(produk["product-category"].name == "Gift"){
            this.innerDoc['content'].push([
              {
                style : 'detail',
                columns : [
                  {
                    width:"*",
                    columns:[

                      {alignment : 'center', width:40,text: "(" +this.noItem+ ")"},
                      {alignment : 'center', width:'*',text:produk._id},
                      {alignment : 'center', width:60,text:' '+produk["product-denom"].value},
                      {alignment : 'center', width:'*',text:' '+produk.hpp == undefined ? "-" : this.DelimiterComma(produk.hpp)},
                      {alignment : 'center', width:'*',text:' '+produk.flag == undefined ? "-" : produk.flag},
                      {alignment : 'center', width:'*',text:' Dalam Pengiriman '}
                    ]
                  }
                ]
              }
            ]);
          }else if(produk["product-category"].name == "Emas Batangan"){
            this.innerDoc['content'].push([
              {
                style : 'detail',
                columns : [
                  {
                    width:"*",
                    columns:[

                      {alignment : 'center', width:40,text: "(" +this.noItem+ ")"},
                      {alignment : 'center', width:'*',text:produk._id},
                      {alignment : 'center', width:60,text:' '+produk["product-denom"].value},
                      {alignment : 'center', width:'*',text:' '+produk.hpp == undefined ? "-" : this.DelimiterComma(produk.hpp)},
                      {alignment : 'center', width:'*',text:' '+produk.flag == undefined ? "-" : produk.flag},
                      {alignment : 'center', width:'*',text:' Dalam Pengiriman '}
                    ]
                  }
                ]
              }
            ]);
          }else if(produk["product-category"].name == "Permata"){
            this.innerDoc['content'].push([
              {
                style : 'detail',
                columns : [
                  {
                    width:"*",
                    columns:[

                      {alignment : 'center', width:40,text: "(" +this.noItem+ ")"},
                      {alignment : 'center', width:180,text:produk._id},
                      {alignment : 'center', width:60,text:' '+produk["total_berat"]},
                      {alignment : 'center', width:60,text:' '+produk.hpp == undefined ? "-" : this.DelimiterComma(produk.hpp)},
                      {alignment : 'center', width:100,text:' '+produk.hpp_berlian == undefined ? "-" : this.DelimiterComma(produk.hpp_berlian)},
                      {alignment : 'center', width:100,text:' '+produk.hpp_batu == undefined ? "-" : this.DelimiterComma(produk.hpp_batu)},
                      {alignment : 'center', width:100,text:' '+produk.ongkos_pembuatan == undefined ? "-" : this.DelimiterComma(produk.ongkos_pembuatan)},
                      {alignment : 'center', width:100,text:' '+produk.flag == undefined ? "-" : produk.flag},
                      {alignment : 'center', width:60,text:' Dalam Pengiriman '}
                    ]
                  }
                ]
              }
            ]);
          }else if(produk["product-category"].name == "Dinar"){
            this.innerDoc['content'].push([
              {
                style : 'detail',
                columns : [
                  {
                    width:"*",
                    columns:[

                      {alignment : 'center', width:40,text: "(" +this.noItem+ ")"},
                      {alignment : 'center', width:'*',text:produk._id},
                      {alignment : 'center', width:60,text:' '+produk["product-denom"].value},
                      {alignment : 'center', width:'*',text:' '+produk.hpp == undefined ? "-" : this.DelimiterComma(produk.hpp)},
                      {alignment : 'center', width:'*',text:' '+produk.flag == undefined ? "-" : produk.flag},
                      {alignment : 'center', width:'*',text:' Dalam Pengiriman '}
                    ]
                  }
                ]
              }
            ]);
          }
      }
    }


      //SPACE KONTEN
      this.innerDoc['content'].push([
        {
          style : 'detail',
          lineHeight : 2,
          columns : 
          [
            {
              columns:
              [
                {width:40, text: "."},
                {width:'*', text: ""},
                {width:40, text:""},
                {width:'*', text:""},
                {width:'*', text:""},
                {width:'*', text:""}
              ]
            }
          ]
        }
      ]);


        this.innerDoc['content'].push([
          {
            style : 'detail',
            // lineHeight : 6,
            columns : 
            [
              {
                columns:
                [
                  {width:80, bold:true, text : "TOTAL BERAT"},
                  {width:200, bold:true, text : dataCetak.total_berat + " Gram"},
                  // {width:80, text:dataCetak.total_berat},
                  // {width:'*', text:dataCetak.total_hpp},
                  {width:'*', text:""}
                ]
              }
            ]
          }
        ]);

        this.innerDoc['content'].push([
          {
            style : 'detail',
            lineHeight : 2,
            columns : [
              {
                columns : [
                  {width : 80, bold:true, text : "TOTAL HPP"},
                  {width : 200, bold:true, text : this.DelimiterComma(dataCetak.total_hpp)},
                  {width : '*', text : ""}
                ]
              }
            ]
          }
        ]);

        this.innerDoc['content'].push([
          {
            style : 'detail',
            columns : 
            [
              {
                columns : 
                [
                  {width:88, bold:true, text: "Branch Tujuan"},
                  {width:15, text: " : "},
                  {width:50, text: dataCetak.unit_tujuan.code},
                  {width:10, text : "-"},
                  {width:400, text : dataCetak.unit_tujuan.nama}
                ]
              }
            ]
          }
        ]);

        this.innerDoc['content'].push([
          {
            style : 'detail',
            lineHeight : 2,
            columns : 
            [
              {
                columns : 
                [
                  {width:88, bold:true, text: "Keterangan"},
                  {width:15, text: " : "},
                  {width:500, text: dataCetak.keterangan}
                ]
              }
            ]
          }
        ]);

        this.innerDoc['content'].push([
          {
            style : 'detail',
            lineHeight : 4,
            columns : [
              {
                columns : [
                  {alignment : 'center', bold:true, text: "Mengetahui,"},
                  {width : 100, bold:true, text: "Pengirim,"},
                ]
              }
            ]
          }
        ]);

        this.innerDoc['content'].push([
          {
            style : 'detail',
            // lineHeight : 4,
            columns : [
              {
                columns : [
                  {alignment : 'center', text: "Kadep Stock"},
                  {width : 100, text : this.session.getUser().name}
                ]
              }
            ]
          }
        ]);

        this.innerDoc['content'].push([
          {
            style : 'detail',
            columns : [
              {
                columns : [
                  {alignment : 'center', text: "00005"},
                  {width : 100, text : this.session.getUser().unit.code}
                ]
              }
            ]
          }
        ]);


// this.innerDoc['content'].push([
//   {
//     style
//   }
// ])


pdfMake.createPdf(this.innerDoc).open()
}

}
