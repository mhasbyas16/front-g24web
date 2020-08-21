import { Component, OnInit } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { ProductCategoryService } from '../../../services/product/product-category.service';
import { VendorService } from '../../../services/vendor.service';
import { ProductPurityService } from '../../../services/product/product-purity.service';
import { ProductJenisService } from '../../../services/product/product-jenis.service';
import { ProductGoldColorService } from '../../../services/product/product-gold-color.service';

@Component({
  selector: 'app-penerimaan',
  templateUrl: './penerimaan.component.html',
  styleUrls: ['./penerimaan.component.css']
})
@DContent(PenerimaanComponent.key)
export class PenerimaanComponent implements OnInit {
  static key = EMenuID.PENERIMAAN;

  constructor(
    private productCatService : ProductCategoryService
  ) { }

  products : any[] = [];


  input = {};
  defaultInput()
  {
    return {
      no_po : null
    }
  }

  async LoadProductCategory()
  {
    while(this.products.length > 0)
    {
      this.products.pop();
    }
    let products = await this.productCatService.list("?").toPromise();

    console.log(products);

    for(let i = 0; i < products.length; i++)
    {
      this.products.push(products[i]);
      if(this.products[i].code.includes('00'))
      {
        this.input['product-category'] = this.products[i];
        console.log(this.input);
      }
    }
    this.products.sort((a, b) => ('' + a.name).localeCompare(b.name));
  }

  ngOnInit(): void {
    this.LoadProductCategory();
  }

}
