import { Component, OnInit, ViewChild } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { environment } from 'src/environments/environment';
import { Observable, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoadingSpinnerComponent } from '../../../../g24/nav/modal/loading-spinner/loading-spinner.component';

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

inputUpdate : any = {};

modaltambah : boolean = false;
modalupdate : boolean = false;



  constructor(private seriesservice : ProductSeriesService, private toastr : ToastrService) { }
  @ViewChild('spinner',{static:false}) spinner : LoadingSpinnerComponent;

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
	  this.spinner.SetSpinnerText("Mohon Tunggu...");
	  this.spinner.Open();
	  let params = "?";

  	for(let key in this.search){
  		if(this.search[key]==""||this.search[key]==null)continue;
  			switch (key) {
  				case "code":
  					params += "code="+this.search.code.toUpperCase()+"&";
				break;

				case "name":
					params += "name="+this.search[key]+"&";
				break;
  				
  				default:
  					params += key+="="+this.search[key]+"&";
  				break;
  			}
  		}
  		this.seriesservice.list(params).subscribe(data=>{
  			if(data==false){
  				if(this.seriesservice.message()!=""){
					this.spinner.Close
					  this.toastr.info("Data tidak ditemukan","Informasi");
					  this.listseries = [];
  					return;
  				}
			  }
			this.toastr.success("Data ditemukan "+data.length,"Sukses");
			this.spinner.Close();
  			this.listseries = data;
		  })
		  
		
		//   let myString = '  tHE QuICk GrEEn alliGATOR...  ';
		//   console.log("String",myString.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))));
  }


  Tambah(){
	  this.input = {};
  	this.modaltambah = true;
  }

  Simpan(){
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
  	let code = this.input["code"];
  	let name = this.input["name"];
	let ket  = this.input["ket"];
	let validate = /^[a-zA-Z ]+$/;
	  
	  if(!code || !name || !ket){
		this.spinner.Close();
		this.toastr.warning("Kode, nama series atau note belum di isi","Peringatan");
		return;
	  }else if(!code.match(validate)){
	  this.spinner.Close();
	  this.toastr.info("Input harus huruf","Informasi");
	  return;
	}

	  for(let i = 0; i < this.dataseries.length; i++){
		  if(this.dataseries[i].code == code.toUpperCase()){
			  this.spinner.Close();
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
				this.spinner.Close();
				this.toastr.error("Data gagal disimpan","Gagal");
  				return;
  			}
		  }
		this.spinner.Close();
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
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
  	for(let i = 0; i < this.uptodate.length; i++){
  		console.log(this.uptodate[i]._id);
  		let data = {
  			_id 	: this.uptodate[i]._id,
  			name 	: this.inputUpdate["name_series"],
  			note	: this.inputUpdate["ket_series"]
  		}

		  console.log(data);
		  
		//   if(!this.inputUpdate.ket_series){
		// 	  this.toastr.warning("Note belum di isi","Peringatan");
		// 	  this.spinner.Close();
		// 	  return;
		//   }else if(!this.inputUpdate.name_series){
		// 	this.toastr.warning("Name series belum di isi","Peringatan");
		// 	this.spinner.Close();
		// 	return;
		//   }

  		let upd = DataTypeUtil.Encode(data);
  		this.seriesservice.update(upd).subscribe(data=>{
  			if(data==false){
  				if(this.seriesservice.message()!=""){
					this.toastr.error("Data gagal dirubah","Gagal");
					this.spinner.Close();
  					return;
  				}
			  }
			this.spinner.Close();
  			this.toastr.success("Data berhasil diubah","Sukses");
  			this.listseries = [];
  			this.loadData();
  			this.modalupdate = false;
  		})
  	}
  }

  Hapus(){
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
	if(!this.data_view){
		this.spinner.Close();
		this.toastr.warning("Data belum dipilih","Peringatan");
		return;
	}else if(Object.keys(this.data_view).length==0){
		this.spinner.Close();
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
					this.toastr.error("Data gagal dihapus","Gagal");
					this.spinner.Close();
  					return;
  				}
			  }
			this.spinner.Close();
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
