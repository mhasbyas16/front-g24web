import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ParameterLookupSearchDTO, ParameterLookupService } from '../../../../services/system/parameter-lookup.service';

@Component({
  selector: 'detail-audit-log',
  templateUrl: './detail-audit-log.component.html',
  styleUrls: ['./detail-audit-log.component.scss']
})
export class DetailAuditLogComponent implements OnInit {

  constructor(
    private session : SessionService,
    private lookup : ParameterLookupService
  ) { }

  @Input('current-detail') current_detail : any;
  @Input('new-detail') new_detail : any;

  ngOnInit(): void {
    this.lookup.loadByCode("log-field-name");
  }

  getSortedField(obj : any)
  {
    if(!obj) return [];

    console.log(obj)

    let fields = Object.keys(obj);
    fields.sort((a, b) => ('' + a).localeCompare(b));
    return fields;
  }

  getNameFromLookupByFieldName(field : string)
  {
    let dto : ParameterLookupSearchDTO = new ParameterLookupSearchDTO();
    dto.code = "log-field-name";
    dto.value_code = field;

    return this.lookup.getName(dto);
  }

  getValue(obj : any)
  {
    let type = typeof obj;

    if(type == "object")
    {
      return JSON.stringify(obj, null, '\t')
    }
    else if(type == "symbol")
    {
      return JSON.stringify(obj, null, '\t');
    }

    return obj;
  }

  getType(obj : any)
  {
    return typeof obj;
  }

  isObjectOrSymbol(obj)
  {
    let isSymbol = typeof obj == "symbol";
    let isObject = typeof obj == "object";
    return isSymbol !== isObject
  }

}
