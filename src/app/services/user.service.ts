import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api } from '../api';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient ) { }

api = new Api();
myToken = localStorage.getItem('token')
 header = {headers: new HttpHeaders().append('Authorization','Bearer '+this.myToken )}


getusers()
{
  return this.http.get<any>(this.api.api+'/getUsers',this.header)
}




login(email : string, pass:string)
{
  return this.http.post<any>(this.api.api+'/login' , {email : email , password : pass}) ; 
}


addUser(user)
{
  return this.http.post<any>(this.api.api+'/createUser' , {user : user},this.header) ; 
}

updateUser(id,user)
{
  return this.http.put<any>(this.api.api+'/updateUser/'+id , {user : user},this.header) ; 
}



deleteUser(table)
{
  return this.http.post<any>(this.api.api+'/deleteUser' , {users_id : table},this.header) ; 
}

islogged()
{
     let token = localStorage.getItem('token')
     if(token)
     {
       return true 
     }else{
       return false 
     }
}




search(searchKey)
{
  return this.http.post<any>(this.api.api+'/search',{searchKey:searchKey},this.header).toPromise()
}


changePassword(password, token)
{
  return this.http.put<any>(this.api.api+'/changePassword', {password :password, token : token},this.header)
}


sendMail(email)
{
  return this.http.post<any>(this.api.api+'/sendMail', {email : email})
}

resetPassword(password,token)
      {
        return this.http.post<any>(this.api.api+'/resetPassword', {newPassword : password, token : token})
        
      }




      checkToken(token)
      {
          return this.http.post<any>(this.api.api+'/checkToken',{ token : token }).toPromise()
      }
}
