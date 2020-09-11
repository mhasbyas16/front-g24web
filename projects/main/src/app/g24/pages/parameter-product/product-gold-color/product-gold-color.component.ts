import { Component, OnInit } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { Key } from 'protractor';
import { environment } from 'src/environments/environment';
import { Observable, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//ALERT
import { ToastrService } from 'ngx-toastr';

//SERVICE
import { ProductGoldColorService } from '../../../services/product/product-gold-color.service';

@Component({
  selector: 'app-product-gold-color',
  templateUrl: './product-gold-color.component.html',
  styleUrls: ['./product-gold-color.component.scss']
})

@DContent(ProductGoldColorComponent.key)
export class ProductGoldColorComponent implements OnInit {
static key = EMenuID.PARAM_GOLD_COLOR;


search : any = {};
input : any = {};
data_view : any = {};
dataupdate : any = {};

datagold : any[] = [];
listgold : any[] = [];
delete : any[] = [];
uptodate : any[] = [];


modaltambah : boolean = false;
modalupdate : boolean = false;



  constructor(private goldservice : ProductGoldColorService, private toastr : ToastrService) { }

  ngOnInit(): void {
  	let params = "?";
  	this.goldservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.goldservice.message()!=""){
  				return;
  			}
  		}
  		this.datagold = data;
  	})
  }

  SearchData(){
  	let params = "?";
  	for(let key in this.search){
  		if(this.search[key]==""||this.search[key]==null)continue;
  			switch (key) {
  				case "code":
  					params += "code="+this.search[key].code+"&";
				break;

				case "name":
					params += "name="+this.search[key].name+"&";
				break;
  				
  				default:
  					params += key+="="+this.search[key]+"&";
  				break;
  			}
  		}
  		this.goldservice.list(params).subscribe(data=>{
  			if(data==false){
  				if(this.goldservice.message()!=""){
  					this.toastr.info("Data tidak ditemukan","Informasi");
  					return;
  				}
  			}
  			this.listgold = data;
  		})
  }

  Tambah(){
	this.input = {};
  	this.modaltambah = true;
  }

  Simpan(){
  	let code = this.input["code"];
  	let name = this.input["name"];
  	let data = {
  		code : code,
  		name : name,
  		category : "product-color"
  	}
	  let ff = DataTypeUtil.Encode(data);
	  if(!code || !name){
		  this.toastr.warning("Kode atau nama gold color belum diisi","Peringatan");
		  return;
	  }
  	this.goldservice.add(ff).subscribe(data=>{
  		if(data==false){
  			if(this.goldservice.message()!=""){
  				return;
  			}
  		}
  		this.toastr.success("Data berhasil ditambah","Sukses");
  		this.listgold = [];
  		this.loadData();
  		this.modaltambah = false;
  	})
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
  	this.uptodate = [];
  	this.uptodate.push(this.data_view);
  	for(let i = 0; i < this.uptodate.length; i++){
  		this.dataupdate = this.uptodate[i];
  	}
  }

  Update(){
  	for(let i = 0; i < this.uptodate.length; i++){
  		console.log(this.uptodate[i]._id);
  		let data = {
  			_id 	: this.uptodate[i]._id,
  			name 	: this.dataupdate["name"],
  			code 	: this.dataupdate["code"]
  		}

  		console.log(data);

  		let upd = DataTypeUtil.Encode(data);
  		this.goldservice.update(upd).subscribe(data=>{
  			if(data==false){
  				if(this.goldservice.message()!=""){
  					return;
  				}
  			}
  			this.toastr.success("Data berhasil diubah","Sukses");
  			this.listgold = [];
  			this.loadData();
  			this.modalupdate = false;
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
  	this.delete = [];
  	this.delete.push(this.data_view);
  	for(let i = 0; i < this.delete.length; i++){
  		let data = {_id : this.delete[i]._id}
  		let dlt = DataTypeUtil.Encode(data);
  		this.goldservice.delete(dlt).subscribe(data=>{
  			if(data==false){
  				if(this.goldservice.message()!=""){
  					return;
  				}
  			}
  			this.toastr.success("Data berhasil dihapus","Sukses");
  			this.listgold = [];
  			this.loadData();
  		})
  	}
  }

  async loadData(){
  	let params = "?";
  	this.goldservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.goldservice.message()!=""){
  				return;
  			}
  		}
  		this.datagold = data;
  	})
  }

}
