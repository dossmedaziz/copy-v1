import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api } from '../api';
import { ConfigService }from './config.service'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  api = new Api();
  configService = new ConfigService()
  myToken = this.configService.getToken()
  header = {headers: new HttpHeaders().append('Authorization','Bearer '+this.myToken )}
  constructor(private http:HttpClient) { }



  
  getCompanyInfo()
  {
    return this.http.get<any>(this.api.api+'/getCompanyInfo',this.header).toPromise()
  }




  updateCompany(id,company,path,emails)
  {
    return this.http.put<any>(this.api.api+'/updateCompany/'+id , {company : company, path:path,emails:emails},this.header) ;
  }

}
