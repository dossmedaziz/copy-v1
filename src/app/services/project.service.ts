import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api } from '../api';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  api = new Api();
myToken = localStorage.getItem('token')
 header = {headers: new HttpHeaders().append('Authorization','Bearer '+this.myToken )}
  constructor(private http:HttpClient) { }



  createProject(project)
  {
      return this.http.post<any>(this.api.api+'/createProject',{project : project},this.header)
  }


  getProjectsWithClient()
  {
    return this.http.get<any>(this.api.api+'/getProjectsWithClient',this.header)
  }
}
