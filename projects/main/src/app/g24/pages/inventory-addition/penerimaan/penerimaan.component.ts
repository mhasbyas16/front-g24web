import { Component, OnInit } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { ProductCategoryService } from '../../../services/product/product-category.service';

@Component({
  selector: 'app-penerimaan',
  templateUrl: './penerimaan.component.html',
  styleUrls: ['./penerimaan.component.scss']
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

    console.debug(products);

    for(let i = 0; i < products.length; i++)
    {
      this.products.push(products[i]);
    }
    this.products.sort((a, b) => ('' + a.name).localeCompare(b.name));
  }

  ngOnInit(): void {
    this.LoadProductCategory();
  }

}
