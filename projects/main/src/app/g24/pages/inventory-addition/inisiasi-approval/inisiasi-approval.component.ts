import { Component, OnInit } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { ProductCategoryService } from '../../../services/product/product-category.service';

@Component({
  selector: 'app-inisiasi-approval',
  templateUrl: './inisiasi-approval.component.html',
  styleUrls: ['./inisiasi-approval.component.scss']
})
@DContent(InisiasiApprovalComponent.key)
export class InisiasiApprovalComponent implements OnInit {
  static key = EMenuID.APP_INISIASI;

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
    }
    this.products.sort((a, b) => ('' + a.name).localeCompare(b.name));
  }

  ngOnInit(): void {
    this.LoadProductCategory();
  }

}
