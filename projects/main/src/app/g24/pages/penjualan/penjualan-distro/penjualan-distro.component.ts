import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';


//toastr
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-penjualan-distro',
  templateUrl: './penjualan-distro.component.html',
  styleUrls: ['./penjualan-distro.component.css']
})

@DContent(PenjualanDistroComponent.key)
export class PenjualanDistroComponent implements OnInit {

  //list
  vendors = null;
  jenis = null;
  datalist = null;
  perhiasans = null;

  //params
  params = null;

  constructor( ) {}
 // searchModel : any = {vendors:"all", jenisperhiasan: "all"};

  addCart(){
    
  }
  ngOnInit(): void {}

  static key = EMenuID.DISTRO;

}

