import { Component, OnInit } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { environment } from 'src/environments/environment';
import { Observable, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//ALERT
import { ToastrService } from 'ngx-toastr';

//SERVICE
import { ProductSeriesService } from '../../../services/product/product-series.service';

@Component({
  selector: 'app-product-series',
  templateUrl: './product-series.component.html',
  styleUrls: ['./product-series.component.scss']
})

@DContent(ProductSeriesComponent.key)
export class ProductSeriesComponent implements OnInit {
static key = EMenuID.PARAM_SERIES;


search : any = {};
input : any = {};
data_view : any = {};
dataupdate : any = {};

dataseries : any[] = [];
listseries : any[] = [];
delete : any[] = [];
uptodate : any[] = [];


modaltambah : boolean = false;
modalupdate : boolean = false;



  constructor(private seriesservice : ProductSeriesService, private toastr : ToastrService) { }

  ngOnInit(): void {
  	let params = "?";
  	this.seriesservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.seriesservice.message()!=""){
  				return;
  			}
  		}
  		this.dataseries = data;
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
  		this.seriesservice.list(params).subscribe(data=>{
  			if(data==false){
  				if(this.seriesservice.message()!=""){
  					this.toastr.info("Data tidak ditemukan","Informasi");
  					return;
  				}
  			}
  			this.listseries = data;
  		})
  }

  Tambah(){
	  this.input = {};
  	this.modaltambah = true;
  }

  Simpan(){
  	let code = this.input["code"];
  	let name = this.input["name"];
	let ket  = this.input["ket"];
	  
	  if(!code || !name || !ket){
		this.toastr.warning("Kode, nama series atau note belum di isi","Peringatan");
		return;
	}

	  for(let i = 0; i < this.dataseries.length; i++){
		  if(this.dataseries[i].code == code.toUpperCase()){
			  this.toastr.warning("Kode sudah tersedia","Peringatan");
			  return;
		  }
	  }

	  let data = {
		code : code.toUpperCase(),
		name : name,
		note : ket,
		category : "product-series"
	}
  	let ff = DataTypeUtil.Encode(data);
  	this.seriesservice.add(ff).subscribe(data=>{
  		if(data==false){
  			if(this.seriesservice.message()!=""){
  				return;
  			}
  		}
  		this.toastr.success("Data berhasil ditambah","Sukses");
  		this.listseries = [];
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
  			note	: this.dataupdate["ket"]
  		}

  		console.log(data);

  		let upd = DataTypeUtil.Encode(data);
  		this.seriesservice.update(upd).subscribe(data=>{
  			if(data==false){
  				if(this.seriesservice.message()!=""){
  					return;
  				}
  			}
  			this.toastr.success("Data berhasil diubah","Sukses");
  			this.listseries = [];
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
  		this.seriesservice.delete(dlt).subscribe(data=>{
  			if(data==false){
  				if(this.seriesservice.message()!=""){
  					return;
  				}
  			}
  			this.toastr.success("Data berhasil dihapus","Sukses");
  			this.listseries = [];
  			this.loadData();
  		})
  	}
  }

  async loadData(){
  	let params = "?";
  	this.seriesservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.seriesservice.message()!=""){
  				return;
  			}
  		}
  		this.dataseries = data;
  	})
  }

}
