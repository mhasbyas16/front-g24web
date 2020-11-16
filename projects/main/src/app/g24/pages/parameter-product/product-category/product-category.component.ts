import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ProductCategoryService } from '../../../services/product/product-category.service';
import { AlphaNumeric } from '../../../lib/helper/alpha-numeric';
import { TransactionMethodService } from '../../../services/transaction/transaction-method.service';
import { LoadingSpinnerComponent } from '../../../../g24/nav/modal/loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})

@DContent(ProductCategoryComponent.key)
export class ProductCategoryComponent implements OnInit {
static key = EMenuID.PARAM_KATEGORI;


search : any = {};
input : any = {};
update : any = {};

datakategori : any[] = [];
data_view : any = {};
dataupdate : any = {};

updateInput : any = {};

delete : any[] = [];
uptodate : any[] = [];

listkategori : any[] = [];


modaltambah : boolean = false;
modalupdate : boolean = false;


//HITUNG DB KATEGORI
hitung : number = 0;
jumlah : number = 0;


  constructor(private kategoriservice : ProductCategoryService, 
			  private toastr : ToastrService) { }

  @ViewChild('spinner',{static:false}) spinner : LoadingSpinnerComponent;

  ngOnInit(): void {
  	let params = "?";
  	this.kategoriservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.kategoriservice.message()!=""){
  				return;
  			}
  		}
  		this.datakategori = data;
  	})
  }


  SearchData(){
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
  	let params = "?";
	  
	  if(!this.search["kategori"]){

		// for(let key in this.search){
		// 		if(this.search[key]==""||this.search[key]==null)continue;
		// 		switch(key){
		// 			case "code":
		// 			params += "code="+this.search[key].code+"&";
		// 			break;
	  
		// 			default:
		// 			 params += key+="="+this.search[key]+"&";
		// 			 break;
		// 		}
		// 	}

		this.kategoriservice.list(params).subscribe(data=>{
			if(data==false){
				if(this.kategoriservice.message()!=""){
					this.spinner.Close();
					this.toastr.info("Data tidak ditemukan","Informasi");
					this.listkategori = [];
					return;
				}
			}
			this.listkategori = data;
			this.toastr.success("Data ditemukan "+data.length,"Sukses");
			this.spinner.Close();
		})
		  return;
	  }
  	this.kategoriservice.list(params+"name_regex=1&name="+this.search["kategori"]).subscribe(data=>{
  		if(data==false){
  			if(this.kategoriservice.message()!=""){
				  this.spinner.Close();
				  this.toastr.info("Data tidak ditemukan","Informasi");
				  this.listkategori = [];
  				return;
  			}
  		}
		  this.listkategori = data;
		  this.toastr.success("Data ditemukan "+data.length,"Sukses");
		  this.spinner.Close();
  	})
  }

  Tambah(){
  	this.modaltambah = true;
  	this.input = {};
  }

  Ubah(){
	if(!this.data_view){
		this.toastr.warning("Data belum dipilih","Peringatan");
		return;
	}else if(Object.keys(this.data_view).length == 0){
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
	this.spinner.SetSpinnerText("Mohon tunggu...");
	this.spinner.Open();
  	for(let i = 0; i < this.uptodate.length; i++){
  		console.log(this.uptodate[i]._id);
  		let data = {
  			_id 	: this.uptodate[i]._id,
  			name 	: this.updateInput.name_kat
  		}

  		console.log(data);

  		let upd = DataTypeUtil.Encode(data);
  		this.kategoriservice.update(upd).subscribe(data=>{
  			if(data==false){
  				if(this.kategoriservice.message()!=""){
					this.spinner.Close();
					this.toastr.error("Data gagal diupdate","Gagal");
  					return;
  				}
			  }
			this.spinner.Close();
  			this.toastr.success("Data berhasil diubah","Sukses");
  			this.listkategori = [];
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
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
  	this.delete = [];
  	this.delete.push(this.data_view);
  	for(let i = 0; i < this.delete.length; i++){
  		let data = {_id : this.delete[i]._id}
  		let dlt = DataTypeUtil.Encode(data);
  		this.kategoriservice.delete(dlt).subscribe(data=>{
  			if(data==false){
  				if(this.kategoriservice.message()!=""){
					this.toastr.error("Data gagal dihapus","Gagal");
					this.spinner.Close();
  					return;
  				}
			  }
			  this.spinner.Close();
  			this.toastr.success("Data berhasil dihapus","Sukses");
  			this.listkategori = [];
  			this.loadData();
  		})
  	}
  }


  Simpan(){
	this.spinner.SetSpinnerText("Mohon Tunggu...");
	this.spinner.Open();
  	let name = this.input['name'];
	

			let num = AlphaNumeric.Encode(this.datakategori.length);
			if(num.length <= 1){
				num = "0"+num;
			}

			let v = {
				name : name,
				code : "c"+num,
				category : "product-category"
			}
			console.log(v);
			let dt = DataTypeUtil.Encode(v);

			if(!name){
				this.toastr.warning("Nama produk kategori belum diisi","Peringatan");
				this.spinner.Close();
				return;
			}
			//ADD DB 
			this.kategoriservice.add(dt).subscribe(data=>{
					if(data==false){
						if(this.kategoriservice.message()!=""){
							this.toastr.error("Data gagal disimpan");
							this.spinner.Close();
							return;
						}
					}
					this.spinner.Close();
					this.toastr.success("Data berhasil ditambah","Sukses");
					this.listkategori = [];
					this.loadData();
					this.modaltambah = false;
			    })
	
  }

  async loadData(){
  	let params = "?";
  	this.kategoriservice.list(params).subscribe(data=>{
  		if(data==false){
  			if(this.kategoriservice.message()!=""){
  				return;
  			}
  		}
  		this.datakategori = data;
  	})
  }

}
