import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api } from '../api';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  api = new Api();
  myToken = localStorage.getItem('token')
  header = {headers: new HttpHeaders().append('Authorization','Bearer '+this.myToken )}
  constructor(private http:HttpClient) { }



  
  getCompanyInfo()
  {
    return this.http.get<any>(this.api.api+'/getCompanyInfo',this.header)
  }




  updateCompany(id,company,path,emails)
  {
    return this.http.put<any>(this.api.api+'/updateCompany/'+id , {company : company, path:path,emails:emails},this.header) ;
  }

}
