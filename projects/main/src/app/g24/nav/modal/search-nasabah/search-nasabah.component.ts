import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr" 

// Service
import { ClientTypeService } from '../../../services/client/client-type.service';
import { ClientService } from '../../../services/client/client.service';
@Component({
  selector: 'app-search-nasabah',
  templateUrl: './search-nasabah.component.html',
  styleUrls: ['./search-nasabah.component.scss']
})
export class SearchNasabahComponent implements OnInit {
  @Output() clientData:any = new EventEmitter();  

  loadDg:boolean = false;
  emitData:any;
  searchNasabahModal: boolean = false;
  selectClient: boolean =false;
  tipeClient:any;
  // select
  listClient = null;
  listTipeClient = null;
  // form
  formSearch: FormGroup = null;

  constructor(
    private clientType: ClientTypeService,
    private clientService: ClientService,

    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
  }
  
  form(){
    this.formSearch = new FormGroup ({
      tipeClient: new FormControl ("", Validators.required),
      // tipeClient_encoded: new FormControl ("base64"),
      cif: new FormControl (""),
      namaNasabah: new FormControl (""),
      tglLahir: new FormControl (""),
      namaIbuKandung: new FormControl (""),
    });

    this.getTipeClient();
  }
  openModal(){
    this.searchNasabahModal = true;
    this.form(); 
  }

  getTipeClient() {
    this.clientType.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.listTipeClient = response;
      }
    });    
  }

  getClient(){
    this.loadDg = true;

    if (!this.formSearch.valid) {
      this.toastrService.error("Form Not Valid", "Check Again");
      this.loadDg = false;
      return;
    }
    let Icif = this.formSearch.get("cif").value;
    let Iname = this.formSearch.get("namaNasabah").value;
    let ItipeC = this.formSearch.get("tipeClient").value;
    let params="";

    params ="?tipeClient.code="+ItipeC+"&tipeClient.code_encoded=int";

    if (Icif != "") {
      params =params+"&cif_regex=1&cif="+Icif;
    }  
    if (Iname != "") {
      params =params+"&name_regex=1&name="+Iname;
    } 
    if (Icif != "" && Iname != ""){
      params =params+"&name_regex=1&name="+Iname+"&cif_regex=1&cif="+Icif;
    }
    
    this.clientService.list(params).subscribe((response:any) => {
      this.listClient = response;
      this.loadDg = false;
      this.toastrService.success("Show "+this.listClient["length"]+" Data", "CLient Data");
    });
  }

  selectDg(event){

    let ECif = event["cif"];
    let EName = event["name"];
    let ETglLahir = event["tglLahir"];
    let EnamaIbu = event["namaIbuKandung"];

    this.formSearch.patchValue({
      cif: ECif,
      namaNasabah: EName,
      tglLahir: ETglLahir,
      namaIbuKandung: EnamaIbu
    });
      this.emitData = event;
  }
  

  clearForm(){
    this.form();
    this.listClient = null;
  }

  closeModal(val){
    if (val == 2) {
      this.clientData.emit(this.emitData);
    }else{
      this.clientData.emit(null);
    }
    console.debug(this.emitData,"CLIENTCSCS")
    this.tipeClient = null;
    this.listTipeClient = null;
    this.formSearch = null;
    this.listClient = null;
    this.searchNasabahModal = false;   
    this.emitData = null;
    
  }

}
