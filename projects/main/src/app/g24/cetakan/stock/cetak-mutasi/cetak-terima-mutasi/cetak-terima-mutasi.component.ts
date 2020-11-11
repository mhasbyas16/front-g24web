import { Component, OnInit } from '@angular/core';

// pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { TanggalService } from '../../../../lib/helper/tanggal.service';

import { MutasiService } from '../../../../services/stock/mutasi.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ServerDateTimeService } from '../../../../services/system/server-date-time.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'cetak-terima-mutasi',
  templateUrl: './cetak-terima-mutasi.component.html',
  styleUrls: ['./cetak-terima-mutasi.component.scss']
})
export class CetakTerimaMutasiComponent implements OnInit {

  constructor(private mutasiservice : MutasiService,
              private session : SessionService,
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

  async Makepdf(dataCetak)
    {
      this.noItem = 0;
      // console.log("Id Terima mutasi "+dataCetak._id, "Unit TUjuan "+dataCetak.unit_tujuan.code);

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
                {alignment : 'center', fontSize : 22, bold : true, text : "TERIMA MUTASI"}
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

        //CONTENT DATA

        {
          style : 'detail',
          columns : [
            {
              layout: 'lightHorizontalLines',
              columns : [
                {alignment : 'center', lineHeight : 4, bold : true, text : "No",width : 40},
                {alignment : 'center', lineHeight : 4, bold : true, text : "_Id Product",width : '*'},
                {alignment : 'center', lineHeight : 4, bold : true, text : "Berat",width : 40},
                {alignment : 'center', lineHeight : 4, bold : true, text : "HPP",width : '*'},
                {alignment : 'center', lineHeight : 4, bold : true, text : "Flag",width : '*'},
                {alignment : 'center', lineHeight : 4, bold : true, text : "Status",width : '*'},
              ]
            }
          ]
        }
      ];

        for (let tul of dataCetak.items) {
            this.noItem++;
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
                      {alignment : 'center', width:'*',text:tul._id},
                      {alignment : 'center', width:40,text:' '+tul.berat == undefined ? "-" : tul.berat},
                      {alignment : 'center', width:'*',text:' '+tul.hpp == undefined ? "-" : tul.hpp},
                      {alignment : 'center', width:'*',text:' '+tul.flag == undefined ? "-" : tul.flag},
                      {alignment : 'center', width:'*',text:' Penerimaan '}
                    ]
                  }
                ]
              }
            ]);
        }


      //SPACE KONTEN
      this.innerDoc['content'].push([
        {
          style : 'detail',
          lineHeight : 4,
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
            lineHeight : 6,
            columns : 
            [
              {
                columns:
                [
                  {width:40, bold:true, text: "TOTAL"},
                  {width:"*", text:""},
                  {width:80, text:this.MutasiTerima[0].total_berat},
                  {width:'*', text:this.MutasiTerima[0].total_hpp},
                  {width:'*', text:""}
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
        ])

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
])

this.innerDoc['content'].push([
{
  style : 'detail',
  columns : [
    {
      columns : [
        {alignment : 'center', text: this.MutasiTerima[0].unit_asal.nama},
        {width : 100, text : ""}

      ]
    }
  ]
}
])

this.innerDoc['content'].push([
{
  style : 'detail',
  columns : [
    {
      columns : [
        {alignment : 'center', text: this.MutasiTerima[0].unit_asal.code},
        {width : 100, text : ""}
      ]
    }
  ]
}
])


pdfMake.createPdf(this.innerDoc).open()
}

}
