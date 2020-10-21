import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// pdfmake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare let require: any;

// database
import { MokerService } from "../../../services/transaction/moker.service";
import { TanggalService } from '../../../lib/helper/tanggal.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.scss'],
  providers: [DatePipe],
})
export class ExportPdfComponent implements OnInit {

  dataPdf = null;
  innerDoc = {};
  getRupiah = null;

  constructor(
    private mokerServices : MokerService,
    private tanggalService : TanggalService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
  }

  generatePdf(data){
    console.log(data,'pdf');

    //generateRupiah
    let numbString = data.nominal.toString();
    let sisa 	= numbString.length % 3;
	  let rupiah 	= numbString.substr(0, sisa);
    let ribuan 	= numbString.substr(sisa).match(/\d{3}/g);
    
    if (ribuan) {
      let separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    this.getRupiah = "Rp. "+rupiah;

    // tanggal
    let tgl =this.datePipe.transform(data.create_date, 'MM-dd-yyyy');
    let tglSplit = tgl.split("-");
    console.log(tglSplit, 'split');
    let bulan = Number(tglSplit["0"]);
    console.log(bulan, 'bulan');
    let hari = tglSplit["1"];
    console.log(hari, 'hari');
    let tahun = tglSplit["2"];
    console.log(tahun, 'tahun');
    let bulanTerbilang = this.tanggalService.bulanGenerate(bulan);

    //content
    delete this.innerDoc;
    let hargaFormat = new Intl.NumberFormat(['ban', 'id']).format(data.nominal);
    this.innerDoc ={pageSize: 'A4', pageOrientation: 'potrait',pageMargins: [ 40, 60, 40, 40 ],};
    this.innerDoc['info'] = {title: "Modal Kerja" +" - "+ data.id_transaksi}; 

    // Head Content
    this.innerDoc['content'] = [
      {
        style:'detail',
        columns:[
          {fontSize:14,width:150,bold:true,text:'PT Pegadaian Galeri 24'},
			  ]
      },'\n',
      {
        style:'detail',
        columns:[
          {width:80,text:'Cabang'},{width:'*',text:data.cabang_pengirim.nama}
			  ]
      },
      {
        style:'detail',
        columns:[
          {width:80,text:'Tanggal'},{width:'*',text:hari+' '+bulanTerbilang+' '+tahun}
			  ]
      },'\n',
      {
        style:'judul',
        columns:[
          {width:'100%',bold:true,text:'NOTA KIRIM MODAL KERJA'}
			  ]
      },'\n',
      {
        style:'detail',
        columns:[
          {width:100,text:'No. Rekening'},{width:10,text:':'},{width:'*',text:'550998897361672'}
			  ]
      },  
      {
        style:'detail',
        columns:[
          {width:100,text:'Nama Rekening'},{width:10,text:':'},{width:'*',text:'Piutang'}
			  ]
      },
      {
        style:'detail',
        columns:[
          {width:100,text:'Terbilang'},{width:10,text:':'},{width:'*',text: this.getRupiah}
			  ]
      },'\n',
      {
        style:'detail',
        columns:[
          {width:'100%',alignment:'right',text:'Pimpinan Cabang'}
			  ]
      },'\n','\n','\n','\n',
      {
        style:'detail',
        columns:[
          {width:'100%',alignment:'right',text:'AMIRA SORAYA'}
			  ]
      },
    ];

    // style
    this.innerDoc['styles']={
      detail: {
        fontSize: 12,
        bold: false,
        alignment: 'left',
      },
      judul: {
        fontSize: 16,
        bold: true,
        alignment: 'center',
      },
      head:{
        fontSize: 12,
        bold: true,
        alignment: 'left',
      },
      footer:{
        fontSize: 12,
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
