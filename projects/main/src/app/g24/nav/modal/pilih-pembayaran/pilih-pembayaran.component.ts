import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pilih-pembayaran',
  templateUrl: './pilih-pembayaran.component.html',
  styleUrls: ['./pilih-pembayaran.component.scss']
})
export class PilihPembayaranComponent implements OnInit {

  pilihPembayaran:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  openModal(){
    this.pilihPembayaran = true;
  }

}
