import { Component, OnInit } from '@angular/core';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { Key } from 'protractor';
import { StringHelper } from '../../../lib/helper/string-helper';

//ALERT
import { ToastrService } from 'ngx-toastr';

//SERVICES
import { TokoPenyediaService } from '../../../services/toko-penyedia.service'

@Component({
  selector: 'app-toko-penyedia',
  templateUrl: './input-toko-penyedia.component.html',
  styleUrls: ['./input-toko-penyedia.component.scss']
})

@DContent(TokoPenyediaComponent.key)
export class TokoPenyediaComponent implements OnInit {
  static key = EMenuID.TOKO_PENYEDIA;

  input : any = {};
  update : any = {};
  search : any = {};

  idToko : any[] = [];

  data_view : any[] = [];
  data_delete : any[] = [];
  data_update : any[] = [];
  showSearch : any[] = [];
  modaltambah : boolean = false;
  modalupdate : boolean = false;

  constructor(private tokopenyedia : TokoPenyediaService, private toastr : ToastrService) { }

  ngOnInit(): void {
    let params = "?";
    this.tokopenyedia.list(params).subscribe(data=>{
      if(data==false){
        if(this.tokopenyedia.message()!=""){
          return;
        }
      }
      this.idToko = data;
    })
  }

  SearchData(){
    let params = "?";
    for(let key in this.search){
      if(this.search[key]==null||this.search[key]=="")continue;
      switch(key){
        case "id":
          params += "id_toko="+this.search[key].id_toko+"&";
          break;

        default:
          params += key+="="+this.search[key]+"&";
          break;
      }
    }

    this.tokopenyedia.list(params).subscribe(data=>{
      if(data==false){
        if(this.tokopenyedia.message()!=""){
          return;
        }
      }
      this.showSearch = data;
    })
  }

  Tambah(){
    this.modaltambah = true;
  }

  async save(){
    if(!this.input["name"]||!this.input["ket"]){
      this.toastr.warning("Name atau keterangan belum di isi","Peringatan");
      return;
    }
    let data = await this.tokopenyedia.count("").toPromise();
    let json = JSON.stringify(data);
    if(data == false)
    {
      return;
    }else{

    let data1 = {
      id_toko : "TK"+StringHelper.LeftZeroPad(data.count,3),
      name : this.input["name"],
      keterangan : this.input["ket"]
    }

    console.log(data1);
    console.log(data.count);
    

    let dt = DataTypeUtil.Encode(data1);
    this.tokopenyedia.add(dt).subscribe(data=>{
      if(data==false){
        if(this.tokopenyedia.message()!=""){
          return;
        }
      }
      this.toastr.success("Data berhasil disimpan","Sukses");
      this.modaltambah = false;
    })
  }

    // console.log(data);
  }

  Ubah(){
    if(!this.data_view){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }else if(Object.keys(this.data_view).length==0){
		  this.toastr.warning("Data belum dipilih","Peringatan");
		  return;
	  }
    this.modalupdate = true;
    this.data_update.push(this.data_view);
    for(let i = 0; i < this.data_update.length; i++){
      this.update = this.data_update[i];
    }
  }

  Update(){
    if(!this.update["name_upd"]||!this.update["ket_upd"]){
      this.toastr.warning("Name atau keterangan belum di isi","Peringatan");
      return;
    }
    for(let i = 0; i < this.data_update.length; i++){
      console.log(this.data_update[i]._id);

      let update2 = {
        _id : this.data_update[i]._id,
        name : this.update["name_upd"],
        keterangan : this.update["ket_upd"]
      }

      let dt = DataTypeUtil.Encode(update2);
      this.tokopenyedia.update(dt).subscribe(data=>{
        if(data==false){
          if(this.tokopenyedia.message()!=""){
            return;
          }
        }
        this.toastr.success("Data berhasil diupdate","Sukses");
        this.modalupdate = false;
        this.showSearch = [];
        this.loadData();
      })
    }
  }

  Hapus(){

    if(!this.data_view){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }else if(Object.keys(this.data_view).length==0){
		  this.toastr.warning("Data belum dipilih","Peringatan");
		  return;
	  }

    this.data_delete = [];
    this.data_delete.push(this.data_view);
    for(let i = 0; i < this.data_delete.length; i++){
      let data = {_id:this.data_delete[i]._id};
      let dlt = DataTypeUtil.Encode(data);
      this.tokopenyedia.delete(dlt).subscribe(data=>{
        if(data==false){
          if(this.tokopenyedia.message()!=""){
            return;
          }
        }
        this.toastr.success("Data berhasil dihapus","Sukses");
        this.loadData();
        this.showSearch = [];
      })
    }

  }

  async loadData(){
    let params = "?";
    this.tokopenyedia.list(params).subscribe(data=>{
      if(data==false){
        if(this.tokopenyedia.message()!=""){
          return;
        }
      }
      this.idToko = data;
    })
  }

}
