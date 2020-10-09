import { Component, OnInit } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { AlphaNumeric } from '../../../lib/helper/alpha-numeric';
import { environment } from 'src/environments/environment';
import { Observable, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//ALERT
import { ToastrService } from 'ngx-toastr';

//SERVICE
import { ProductDiamondColorService } from '../../../services/product/product-diamond-color.service';

@Component({
  selector: 'app-product-diamond-color',
  templateUrl: './product-diamond-color.component.html',
  styleUrls: ['./product-diamond-color.component.scss']
})

@DContent(ProductDiamondColorComponent.key)
export class ProductDiamondColorComponent implements OnInit {
static key = EMenuID.PARAM_DIAMOND_COLOR;


search : any = {};
input : any = {};
data_view : any = {};
dataupdate : any = {};

datadiamond : any[] = [];
listdiamond : any[] = [];
delete : any[] = [];
uptodate : any[] = [];


modaltambah : boolean = false;
modalupdate : boolean = false;


  constructor(private diamondservice : ProductDiamondColorService, private toastr : ToastrService) { }

  ngOnInit(): void {
  	let params = "?";
  	this.diamondservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.diamondservice.message()!=""){
  				return;
  			}
  		}
  		this.datadiamond = data;
  	})
  }

  SearchData(){
  	let params = "?";
  	for(let key in this.search){
  		if(this.search[key]==""||this.search[key]==null)continue;
  			switch (key) {
  				case "code":
  					params += "code="+this.search[key].code+"&code_encoded=int&";
				break;
  				
  				default:
  					params += key+="="+this.search[key]+"&";
  				break;
  			}
  		}
  		this.diamondservice.list(params).subscribe(data=>{
  			if(data==false){
  				if(this.diamondservice.message()!=""){
  					this.toastr.info("Data tidak ditemukan","Informasi");
  					return;
  				}
  			}
  			this.listdiamond = data;
  		})
  }

  Tambah(){
	  this.input = {};
  	this.modaltambah = true;
  }

  Simpan(){
	let name = this.input["name"];
	let num = AlphaNumeric.Encode(this.datadiamond.length);  
	if(num.length >= 1){
		num = "0"+num;
	}
  	let data = {
  		code : num,
  		name : name,
  		category : "product-color"
  	}
	  let ff = DataTypeUtil.Encode(data);
	  if(!this.input["name"]){
		  this.toastr.warning("Data name belum di isi","Peringatan");
		  return;
	  }
  	this.diamondservice.add(ff).subscribe(data=>{
  		if(data==false){
  			if(this.diamondservice.message()!=""){
  				return;
  			}
  		}
  		this.toastr.success("Data berhasil ditambah","Sukses");
  		this.listdiamond = [];
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
  			name 	: this.dataupdate["name"]
  		}

  		console.log(data);

  		let upd = DataTypeUtil.Encode(data);
  		this.diamondservice.update(upd).subscribe(data=>{
  			if(data==false){
  				if(this.diamondservice.message()!=""){
  					return;
  				}
  			}
  			this.toastr.success("Data berhasil diubah","Sukses");
  			this.listdiamond = [];
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
  		this.diamondservice.delete(dlt).subscribe(data=>{
  			if(data==false){
  				if(this.diamondservice.message()!=""){
  					return;
  				}
  			}
  			this.toastr.success("Data berhasil dihapus","Sukses");
  			this.listdiamond = [];
  			this.loadData();
  		})
  	}
  }

  async loadData(){
  	let params = "?";
  	this.diamondservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.diamondservice.message()!=""){
  				return;
  			}
  		}
  		this.datadiamond = data;
  	})
  }

}
