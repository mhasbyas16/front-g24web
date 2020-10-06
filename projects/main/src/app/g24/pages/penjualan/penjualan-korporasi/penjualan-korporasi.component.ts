import { Component, OnInit } from '@angular/core';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-penjualan-korporasi',
  templateUrl: './penjualan-korporasi.component.html',
  styleUrls: ['./penjualan-korporasi.component.scss']
})

@DContent(PenjualanKorporasiComponent.key)
export class PenjualanKorporasiComponent implements OnInit {

  formData: FormGroup = null;
  isiClientData:any;
  constructor() { }

  ngOnInit(): void {
    this.form();
  }

  form(){
    this.formData = new FormGroup ({
      cif: new FormControl ("", Validators.required),
      name: new FormControl ("", Validators.required),
      client: new FormControl ("", Validators.required),
      client_encoded: new FormControl ("base64"),
      nomorIdentitas: new FormControl ("", [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
      recipientName: new FormControl ("", Validators.required),
      typeId: new FormControl ("", Validators.required),
      numberId: new FormControl ("", Validators.required)
    })
  }

  getClientData(val) {
    if (val != null) {
      this.isiClientData = val;

      this.formData.patchValue({
        cif: val["cif"],
        client: btoa(JSON.stringify(val)),
        name: val["name"]
      })
    } else {
      this.formData.patchValue({
        cif: "",
        client: "",
        name: ""
      })
    }

    console.debug(val, "HASIL EMMMMMMIT")
  }
  static key = EMenuID.KORPORASI;

}
