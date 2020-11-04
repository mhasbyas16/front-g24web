import { Component, OnInit, ViewChild } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { LoadingSpinnerComponent } from '../../../../g24/nav/modal/loading-spinner/loading-spinner.component';

//ALERT
import { ToastrService } from 'ngx-toastr';

//SERVICE
import { ProductGoldColorService } from '../../../services/product/product-gold-color.service';
import { AlphaNumeric } from '../../../lib/helper/alpha-numeric';

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
  @ViewChild('spinner',{static:false}) spinner : LoadingSpinnerComponent;

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
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
  	let params = "?";
  	for(let key in this.search){
  		if(this.search[key]==""||this.search[key]==null)continue;
  			switch (key) {
  				case "code":
  					params += "code="+this.search[key]+"&";
				break;

				case "code" : 
					params += "code="+this.search[key]+"&";
				break;

				case "name":
					params += "name="+this.search[key]+"&";
				break;
  				
  				default:
  					params += key+="="+this.search[key]+"&";
  				break;
  			}
  		}
  		this.goldservice.list(params).subscribe(data=>{
  			if(data==false){
  				if(this.goldservice.message()!=""){
					this.spinner.Close();
					  this.toastr.info("Data tidak ditemukan","Informasi");
					  this.listgold = [];
  					return;
  				}
			  }
			this.toastr.success("Data ditemukan "+data.length,"Sukses");
			this.spinner.Close();
  			this.listgold = data;
  		})
  }

  Tambah(){
	this.input = {};
  	this.modaltambah = true;
  }

  Simpan(){
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
	let num = AlphaNumeric.Encode(this.datagold.length);  
	if(num.length >= 1){
		num = "0"+num;
	}
  	let name = this.input["name"];
  	let data = {
  		code : num,
  		name : name,
  		category : "product-color"
  	}
	  let ff = DataTypeUtil.Encode(data);
	  if(!name){
		  this.toastr.warning("Nama gold color belum diisi","Peringatan");
		  this.spinner.Close();
		  return;
	  }
  	this.goldservice.add(ff).subscribe(data=>{
  		if(data==false){
  			if(this.goldservice.message()!=""){
				this.toastr.error("Data gagal disimpan","Gagal");
				this.spinner.Close();
  				return;
  			}
  		}
		  this.toastr.success("Data berhasil ditambah","Sukses");
		  this.spinner.Close();
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
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
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
					this.toastr.error("Data gagal dirubah","Gagal");
					this.spinner.Close();
  					return;
  				}
			  }
			this.spinner.Close();
  			this.toastr.success("Data berhasil diubah","Sukses");
  			this.listgold = [];
  			this.loadData();
  			this.modalupdate = false;
  		})
  	}
  }

  Hapus(){
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
	if(!this.data_view){
		this.toastr.warning("Data belum dipilih","Peringatan");
		this.spinner.Close();
		return;
	}else if(Object.keys(this.data_view).length==0){
		this.toastr.warning("Data belum dipilih","Peringatan");
		this.spinner.Close();
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
					this.toastr.error("Data gagal dihapus","Gagal");
					this.spinner.Close();
  					return;
  				}
  			}
			  this.toastr.success("Data berhasil dihapus","Sukses");
			  this.spinner.Close();
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
