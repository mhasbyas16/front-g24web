import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'projects/platform/src/app/core-services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ParameterLookupService {
  
  key : string = "master-api/prm-lookup";

  map : Map<string, String> = new Map();
  mapDto : Map<string, string> = new Map();
  lookupMap : Map<string, POJOParameterLookup> = new Map();
  loadedCode : Set<string> = new Set();

  constructor
  (
    private commonService : CommonService,
    private toastr : ToastrService
  ) 
  {
    window['lookup'] = this
  }

  toPOJO(data : any) : POJOParameterLookup
  {
    let pojo : POJOParameterLookup = new POJOParameterLookup();
    for(let field in data)
    {
      if(pojo.hasOwnProperty(field))
      {
        pojo[field] = data[field];
      }
    }
    return pojo;
  }

  public refresh()
  {
    this.mapDto.clear();
    this.map.clear();
  }

  list(code : string)
  {
    let data = "?" + code;
    return this.commonService.list(this.key, data);
  }

  async listByObject(dto : ParameterLookupSearchDTO) : Promise<POJOParameterLookup[]>
  {
    let search = "?status=1&status_encode=int&code=" + dto.code+ "&value.code="+ dto.value_code;
    let result : any = await this.commonService.list(this.key, search).toPromise<POJOParameterLookup[]>();
    if(result == false)
    {
      return [];
    }
    
    for(let lookup of result)
    {
      this.mapDto.set(this.getKey(dto), lookup.value.name);
      this.map.set(lookup.code + "|" +lookup.value.code, lookup.value.name);
      this.lookupMap.set(dto.code, this.toPOJO(lookup))
    }

    return result;
  }

  async loadByCode(code : string)
  {
    if(this.loadedCode.has(code))
    {
      return;
    }

    this.loadedCode.add(code);
    console.debug("Get data for : "+ code);
    let params = "?code=" + code;
    let result = await this.commonService.list(this.key, params).toPromise();
    if(result == false)
    {
      this.toastr.warning("Display name group not found. Displaying defaults...");
    }

    for(let data of result)
    {
      let lookup = this.toPOJO(data)
      console.debug(lookup, data)
      let dto = new ParameterLookupSearchDTO();
      dto.code = code
      dto.value_code = lookup.value.code
      
      this.lookupMap.set(code, lookup);
      this.mapDto.set(this.getKey(dto), lookup.value.name);
      this.map.set(lookup.code+ "|" + lookup.value.code, lookup.value.name);
    }    
  }

  getKey(dto : ParameterLookupSearchDTO) : string
  {
    return dto.code + "|" + dto.value_code;
  }

  getName(dto : ParameterLookupSearchDTO) : string
  {
    let ret = this.mapDto.get(this.getKey(dto));
    if(ret != null)
    {
      return ret;
    }

    return dto.value_code; 

    // let params = "?status=1&status_encode=int&code=" + dto.code+ "&value.code="+ dto.value_code;
    // let result : any = await this.commonService.get(this.key, params).toPromise<POJOParameterLookup>();
    // if(result == false)
    // {
    //   return "No Name Found - " + dto.value_code;
    // }

    // this.mapDto.set(dto, result.value.name)
    // this.map.set(dto.code + "|" + dto.value_code, result.value.name);
    // this.lookupMap.set(dto.code, this.toPOJO(result))
    // return result.value.name;
  }

  async getLookupByCode(code : string) : Promise<POJOParameterLookup>
  {
    let lookup = this.lookupMap.get(code);
    if(lookup != null)
    {
      return lookup;
    }

    let search = "?status=1&code=" + code;
    let result = await this.commonService.get(this.key, search).toPromise();
    if(result == false)
    {
      throw new Error("Lookup not found");
    }

    return this.toPOJO(result);
  }

  async listAsPOJO(code : string) : Promise<POJOParameterLookup[]>
  {
    let data = "?" + code;
    return await this.commonService.list(data).toPromise<POJOParameterLookup[]>();
  }

  message() : string
  {
    return this.commonService.message;
  }

  format(obj : any)
  {
    let format = this.objectFormat();
    return Object.assign(format, obj);
  }

  objectFormat() {
    return {
       _id : "",
      create_by : {},
      create_date: "",
      create_time : "",
      update_by : {},
      update_date: "",
      update_time : "",

      code : "",
      name : "",
      value : {code : "", name : ""},
      status : 1
    };
  }
}

export class ParameterLookupSearchDTO {
  /**
   * Document's 'code' field
   */
  code : string = "";
  /**
   * The 'code' field of the 'value' field
   * 
   * {
   *     code : location-product
   *     value :
   *     {
   *         code : product
   *         name : Some Name
   *     }
   * }
   */
  value_code : string = "";
}

export class POJOParameterLookup {
  _id : string = "";
  code : string = "";
  name : string = "";
  value : POJOParameterLookupValue = new POJOParameterLookupValue();
  status : number = 0;
}

export class POJOParameterLookupValue {
  code : string = "";
  name : string = "";
}
