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
import { ProductClarityService } from '../../../services/product/product-clarity.service';

@Component({
  selector: 'app-product-cut',
  templateUrl: './product-cut.component.html',
  styleUrls: ['./product-cut.component.scss']
})
export class ProductCutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
