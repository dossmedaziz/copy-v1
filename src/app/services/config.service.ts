import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

secretKey= "nachd-it"
  status_project = [
    {
      "id":1,
      "status_name":"Open",
      "color":"#1973DC",
      "icon" : "pi-check"
     },

     {
      "id":2,
      "status_name":"Closed",
      "color":"#5C9FED",
      "icon":"pi-times"
       }

  ]


  status_paper= [
    {
      "id":1,
      "status_name":"New",
      "color":"#5C9FED",
      "icon" : "pi-check"
     },
     {
      "id":2,
      "status_name":"Canceled",
      "color":"#1973DC",
      "icon":"pi-times"
       },
       {
        "id":3,
        "status_name":"Expired",
        "color":"#1355A0",
        "icon":"pi-exclamation-triangle"
         }
         ,
       {
        "id":4,
        "status_name":"No Status",
        "color":"#778ca3",
        "icon":"pi-exclamation-triangle"
         }

  ]

  contract_status = [
    {
      "id": 1,
      "status_name" : "Sent",
      "color" : "#778ca3" ,
      "icon":"pi-check"
       },
       {
        "id": 2,
        "status_name" : "Not yet",
        "color" : "#5C9FED" ,
        "icon":"pi-exclamation-triangle"
         }
  ]
  constructor() { }


  filterActions(action_name,space_name)
  {
let privileges = JSON.parse(this.decryptString(localStorage.getItem('privileges')))
let user = JSON.parse(this.decryptString(localStorage.getItem('user')))
let role_id = user.role_id
let  reslt  = privileges.find(element =>{
let action = element.action.action_name
let space = element.space.space_name
let i = action_name.indexOf(action)
let j = space_name.indexOf(space)
if((i != -1) && (j != -1) )
{

return element
}
});
if(reslt || role_id == 1)
{
return true
}else{
return false
}

}


encryptString(string)
{
 return  CryptoJS.AES.encrypt(string,this.secretKey).toString();

}
decryptString(string)
{
  if(string){

    let  bytes  = CryptoJS.AES.decrypt(string, this.secretKey);
    return  bytes.toString(CryptoJS.enc.Utf8);
  }
 return string
}


getToken()
{
  return this.decryptString(localStorage.getItem('token'))
}
}
