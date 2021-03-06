import { Component, OnInit } from '@angular/core';

// pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { TanggalService } from '../../../../lib/helper/tanggal.service';

import { MutasiService } from '../../../../services/stock/mutasi.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { UserService } from '../../../../services/user.service';
import { ServerDateTimeService } from '../../../../services/system/server-date-time.service';
import { ToastrService } from 'ngx-toastr';
import { returnOrFallthrough } from '@clr/core/internal';

@Component({
  selector: 'cetak-terima-mutasi',
  templateUrl: './cetak-terima-mutasi.component.html',
  styleUrls: ['./cetak-terima-mutasi.component.scss']
})
export class CetakTerimaMutasiComponent implements OnInit {

  constructor(private mutasiservice : MutasiService,
              private session : SessionService,
              private user : UserService,
              private toastr : ToastrService,
              private timeservice : ServerDateTimeService) { }

  innerDoc = {};
  date : String  = "";
  time : String = "";
  datamutasi : any = {};
  noItem : number = 0;


  MutasiTerima : any[] = [];
  itemsTerima : any[] = [];

  ngOnInit(): void {
  }

  DelimiterComma(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  async Makepdf(dataCetak)
    {
      this.noItem = 0;

      let data = await this.mutasiservice.list("?_id="+dataCetak._id).toPromise();
      if(data==false){
        this.toastr.error("Data gagal dicetak","Error");
        return;
      }

      console.log("Jumlah Data "+data.length);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",dataCetak);
      this.MutasiTerima = data;
      this.itemsTerima = dataCetak;
      console.log("Tes 123",this.itemsTerima);

      for(let i = 0; i < dataCetak.length; i++){
        console.log("ALLAH MAHA BESAR",dataCetak[i]);
      }

      // const id =  data.map(el => el.key);
      // console.log(id.lastIndexOf(data.length));



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
                {alignment : 'center', fontSize : 22, bold : true, text : "TERIMA MUTASI "+ this.MutasiTerima[0]["product-category"].name.toUpperCase()}
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
                {alignment : 'center', fontSize : 12, text : "ID Mutasi " +dataCetak._id + " / Tanggal : "+this.date, lineHeight : 5}
              ]
            }
          ]
        }
      ];

        //CONTENT DATA
        //COLUMN
        if(this.MutasiTerima[0]["product-category"].name == "Permata"){
          this.innerDoc['content'].push([
            {
              layout : 'lightHorizontalLines',
              fillColor : "turquoise",
              table : {
                
                headerRows : 1,
                widths: [ 30, 160, 60, 80, 100, 100, 115, 60],

                body : [
                  [{text : "No", bold : true},
                   {text : "_Id Product", bold : true},
                   {text : "Berat", bold : true},
                   {text : "HPP Emas", bold : true},
                   {text : "HPP Berlian", bold : true},
                   {text : "HPP Batu", bold : true},
                   {text : "Ongkos Pembuatan", bold : true},
                   {text : "Tipe Stock", bold : true}]
                ]
              }
            }
          ]);
        }else{
          this.innerDoc['content'].push([
            {
              layout : 'lightHorizontalLines',
              fillColor : "turquoise",
              table : {
                headerRows : 1,
                widths: [ 45, 200, 190, '*', '*'], 
                
                body : [
                      [{text:"No", bold : true},{text : "_id Product", bold : true},{text : "Berat",bold : true},{text : "HPP", bold : true},{text : "Tipe Stock", bold : true}]
                ]
              }
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
              layout : 'lightHorizontalLines',
              fillColor : "turquoise",
              fillOpacity : 0.5,
              table:{
                headerRows : 1,
                widths: [ 45, 200, 190, '*', '*'], 
                
                body : [
                    // {alignment : 'center', width:40,text: "(" +this.noItem+ ")"},
                    // {alignment : 'center', width:'*',text:produk._id},
                    // {alignment : 'center', width:40,text:' '+produk.berat == undefined ? "-" : produk.berat},
                    // {alignment : 'center', width:'*',text:' '+produk.hpp == undefined ? "-" : produk.hpp},
                    // {alignment : 'center', width:'*',text:' '+produk.flag == undefined ? "-" : produk.flag},
                    // {alignment : 'center', width:'*',text:' Dalam Pengiriman '}

                    [this.noItem,produk._id,produk.berat,produk.hpp == undefined ? "-" : this.DelimiterComma(produk.hpp),produk.tipe_stock == undefined ? "-" : produk.tipe_stock]
                  ]
                }
            }
          ]);
          }else if(produk["product-category"].name == "Souvenir"){
            this.innerDoc['content'].push([
              {
                layout : 'lightHorizontalLines',
                fillColor : "turquoise",
                fillOpacity : 0.5,
                table:{
                  headerRows : 1,
                  widths: [ 45, 200, 190, '*', '*'], 
                
                  body : [
                    [this.noItem,produk._id,produk['product-denom'].value,produk.hpp == undefined ? "-" : this.DelimiterComma(produk.hpp),produk.tipe_stock == undefined ? "-" : produk.tipe_stock]
                  ]
                }
              }
            ]);
          }else if(produk["product-category"].name == "Gift"){
            this.innerDoc['content'].push([
              {
                layout : 'lightHorizontalLines',
                fillColor : "turquoise",
                fillOpacity : 0.5,
                table:{
                  headerRows : 1,
                  widths: [ 45, 200, 190, '*', '*'], 
                
                  body : [
                    [this.noItem,produk._id,produk['product-denom'].value,produk.hpp == undefined ? "-" : this.DelimiterComma(produk.hpp),produk.tipe_stock == undefined ? "-" : produk.tipe_stock]
                  ]
                }
              }
            ]);
          }else if(produk["product-category"].name == "Emas Batangan"){
            this.innerDoc['content'].push([
              {
                layout : 'lightHorizontalLines',
                fillColor : "turquoise",
                fillOpacity : 0.5,
                table:{
                  headerRows : 1,
                  widths: [ 45, 200, 190, '*', '*'], 
                
                  body : [
                    [this.noItem,produk._id,produk['product-denom'].value,produk.hpp == undefined ? "-" : this.DelimiterComma(produk.hpp),produk.tipe_stock == undefined ? "-" : produk.tipe_stock]
                  ]
                }
              }
            ]);
          }else if(produk["product-category"].name == "Permata"){
            this.innerDoc['content'].push([
              {
                layout : 'lightHorizontalLines',
                fillColor : "turquoise",
                fillOpacity : 0.5,
                table:{
                  headerRows : 1,
                  widths: [ 30, 160, 60, 80, 100, 100, 115, 60], 
                
                body : [
                  [this.noItem,
                   produk._id,
                   produk['total_berat'],
                   produk.hpp == undefined ? "-" : this.DelimiterComma(produk.hpp),
                   produk.hpp_berlian == undefined ? "-" : this.DelimiterComma(produk.hpp_berlian),
                   produk.hpp_batu == undefined ? "-" : this.DelimiterComma(produk.hpp_batu),
                   produk.ongkos_pembuatan == undefined ? "-" : this.DelimiterComma(produk.ongkos_pembuatan),
                   produk.tipe_stock
                  ]
                ]
              }
            }
          ]);
          }else if(produk["product-category"].name == "Dinar"){
            this.innerDoc['content'].push([
              {
                layout : 'lightHorizontalLines',
                fillColor : "turquoise",
                fillOpacity : 0.5,
                table:{
                  headerRows : 1,
                  widths: [ 45, 200, 190, '*', '*'], 
                
                  body : [
                    [this.noItem,produk._id,produk['product-denom'].value,produk.hpp == undefined ? "-" : this.DelimiterComma(produk.hpp),produk.tipe_stock == undefined ? "-" : produk.tipe_stock]
                  ]
                }
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
                {width:600, bold:true, text : this.MutasiTerima[0].total_berat + " Gram"},
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
                {width : 600, bold:true, text : this.DelimiterComma(this.MutasiTerima[0].total_hpp)},
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
                  {width:120, bold:true, text: "Branch Pengirim"},
                  {width:15, text: " : "},
                  {width:50, text: this.MutasiTerima[0].unit_asal.code},
                  {width:10, text : "-"},
                  {width:400, text : this.MutasiTerima[0].unit_asal.nama}
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
                  {width:120, bold:true, text: "Keterangan"},
                  {width:15, text: " : "},
                  {width:500, text: this.MutasiTerima[0].keterangan}
                ]
              }
            ]
          }
        ]);

        this.innerDoc['content'].push([
          {
            style : 'detail',
            lineHeight : 5,
            columns : [
              {
                columns : [
                  {alignment : 'center', bold:true, text: "Mengetahui,"},
                  {width : 100, bold:true, text: "Penerima,"},
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
                  // {alignment : 'center', text: this.MutasiTerima[0].unit_asal.nama},
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


pdfMake.createPdf(this.innerDoc).open()
}

}
