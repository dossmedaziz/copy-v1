import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api } from '../api';
@Injectable({
  providedIn: 'root'
})
export class BillService {

  api = new Api();
  myToken = localStorage.getItem('token')
  header = {headers: new HttpHeaders().append('Authorization','Bearer '+this.myToken )}
  constructor(private http:HttpClient) { }


  getCompanyInfo()
  {
    return this.http.get<any>(this.api.api+'/getCompanyInfo',this.header)
  }

 
  getItems()
  {
    return this.http.get<any>(this.api.api+'/getItems',this.header)
  }

  GetItems(id)
  {
    return this.http.get<any>(this.api.api+'/getItems'+id,this.header)
  }

  saveBill(bill,items,config)
  {
    return this.http.post<any>(this.api.api+'/createBill' , {bill : bill,items : items, config : config},this.header) ;
  }
  saveItems(Item)
  {
    return this.http.post<any>(this.api.api+'/createItem' , {Item : Item},this.header) ;
  }

  getBills()
  {
    return this.http.get<any>(this.api.api+'/getBill',this.header).toPromise()
  }

  deleteBill(bills_id)
  {
    return this.http.post<any>(this.api.api+'/deleteBill' , {bills_id : bills_id},this.header) ;
  }

  selectedYear(selectedYear)
  {
    return this.http.get<any>(this.api.api+'/selectedYear/'+selectedYear ,this.header) ;
  }

  getBillById(id){
    return this.http.get<any>(this.api.api+'/getBill/'+id ,this.header) ;
  }

  updateBill(id,items,bill,config)
  {
    return this.http.put<any>(this.api.api+'/updateBill/'+id , {bill : bill,items : items, config : config},this.header) ;
  }
  calcNumBills(year){
    return this.http.post<any>(this.api.api+'/calcNumBills',{year:year},this.header).toPromise() ;
  }
  
  getLastBill()
  {
    return this.http.get<any>(this.api.api+'/getLastBill', this.header).toPromise()
  }

  getDateLimits(id)
  {
    return this.http.post<any>(this.api.api+'/getDateLimits',{id : id},this.header).toPromise()
  }


  changeStatus(bill_id,newStatus)
  {
    return this.http.post<any>(this.api.api+'/BillStatusUpdate',{bill_id : bill_id , newStatus: newStatus}, this.header)
  }
}
