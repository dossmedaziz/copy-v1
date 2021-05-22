import { Component, OnInit } from '@angular/core';
import pdfMake  from "pdfmake/build/pdfmake";
import pdfFonts  from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ClientService } from 'src/app/services/client.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BillService } from 'src/app/services/bill.service';
import { ToastrService } from 'ngx-toastr';
import { style } from '@angular/animations';
import { Column } from 'jspdf-autotable';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from'src/app/services/company.service';
import { NgxNumToWordsService, SUPPORTED_LANGUAGE } from 'ngx-num-to-words';
import date from 'date-and-time';
import * as CryptoJS from 'crypto-js'
import { ConfigService } from 'src/app/services/config.service';



class Product{
  designation: string;
  u_price: number;
  quantity: number = 1;
  total_price: number;
}
class Tva{
  ht_price: number;
  rate_tva: number;
  fiscal_timber: number;
  price_tva: number;
  total_ttc: number;
  clientid : number ;
  DateFacturation: Date;
  billNum: number;
  description: String;
  inWord : String;
}

class Invoice{
  customerName: string;
  address: string;
  contactNo: number;
  email: string;
  clientid : number ;
  matFisc: string;
  other: string;


  products: Product[] = [];
  tvaTab : Array<Tva> = [];
  tvaObj: any = {};

  constructor(){
    // Initially one empty product row we will show
    this.products.push(new Product());
    this.tvaTab.push(this.tvaObj);
  }
}
@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit {

  selectedClient
  clientId
  clients
  clientForm: FormGroup;
  total=0
  totalPrice
  company =  {}
  num
  tax 
  rate_tva
  logoDataUrl: string;
  numberInWords!: string;
  lang: SUPPORTED_LANGUAGE = 'fr';
  date 
  numBill
  minDate 
  remise
  type = 0
  constructor(private ngxNumToWordsService: NgxNumToWordsService,
    private router : Router, private fb:FormBuilder,private billService: BillService,
               private clientService : ClientService,
               private toaster:ToastrService,
               private activeRoute : ActivatedRoute,
               private companyService : CompanyService,
               private configService : ConfigService) {

                let formControls = {

                  client_id : new FormControl('',[
                      Validators.required,
                      ]),
                    }
                    this.clientForm = this.fb.group(formControls) ;

                }
       get client_id() { return this.clientForm.get('client_id')
               }

           async    ngOnInit() {

                this.clientService.getClients().subscribe(
                 res=>{
                     this.clients=res
                   },err=>{
                  console.log(err);
                 }
               )
                  this.companyService.getCompanyInfo().then(
                 res => {
                   this.company = res
                   this.tax = this.company[0].tax
                   this.rate_tva = this.company[0].tva
                 }, err => {
                 console.log(err);
           
                 }
               )
               this.minDate = await this.dateFormat()
               
               this.num = this.invoice.tvaObj.billNum
               this.date = this.invoice.tvaObj.date
           
      let privileges = JSON.parse(this.configService.decryptString(localStorage.getItem('privileges')))
      let user = JSON.parse(this.configService.decryptString(localStorage.getItem('user')))
      let role_id = user.role_id 
      let  reslt  = privileges.find(element =>{
        let action = "create"
        let space = "bill"
        let space_name = element.space.space_name
        let action_name = element.action.action_name
        let i = action.indexOf(action_name)
        let j = space.indexOf(space_name)
       
        if((i != -1) && (j != -1))
        {
          return element.space
        }
        
       });


       if(role_id == 1 )
       {

       }else if(!reslt){
         this.router.navigate(['/dashboard'])

       }

       
           
             }

           
             caclucTotalOfOneItem(ele,i){
              if(
                typeof ele.quantity !== 'undefined' &&
                typeof ele.u_price !== 'undefined'
              ){
                ele.total_price = ele.quantity * ele.u_price
                this.sumofTotalPrice()
                this.calculTVAprice()
                this.calculTTCprice()
                this.inWord()
          
              }}
            sumofTotalPrice(){
          
              this.total= this.invoice.products.reduce((acc, val) => acc += val.total_price, 0)
              this.invoice.tvaObj.ht_price = this.total
          
            }
            calculTVAprice(){
              this.invoice.tvaObj.price_tva = (this.invoice.tvaObj.ht_price * this.rate_tva) / 100
            }
            calculTTCprice(){

              this.invoice.tvaObj.total_ttc =  this.invoice.tvaObj.ht_price * ((this.rate_tva/100)+1)   + ( parseFloat(this.tax) ? parseFloat(this.tax) : 0)
              if( this.type == 1 && this.remise){

                this.invoice.tvaObj.total_ttc = this.invoice.tvaObj.total_ttc - this.remise   
              this.invoice.tvaObj.total_ttc = this.invoice.tvaObj.total_ttc.toFixed(3) 

              }else if(this.type == 2 && this.remise ){
                this.invoice.tvaObj.total_ttc = this.invoice.tvaObj.total_ttc - ((this.invoice.tvaObj.total_ttc* this.remise)/100)
              this.invoice.tvaObj.total_ttc = this.invoice.tvaObj.total_ttc.toFixed(3) 

                }else if(this.type == 0 || !this.remise){
                  this.invoice.tvaObj.total_ttc = this.invoice.tvaObj.total_ttc
              this.invoice.tvaObj.total_ttc = this.invoice.tvaObj.total_ttc.toFixed(3) 

                }
            }
          updateTTC()
          {
            this.calculTTCprice()
            this.inWord()
          }
            saveBill() {
          
              this.invoice.tvaObj.clientid = this.selectedClient.id
          
            let config = {
              "billNum" : this.num,
              "clientId": this.clientId,
              "tax" : this.tax,
              "tva" : this.rate_tva
            }
          
            
                this.billService.saveBill(this.invoice.tvaObj,this.invoice.products,config).subscribe(
                  res=>{
                    this.toaster.success('Bill Created!')
                    this.router.navigate(['/bills'])
          
                  },err=>{
                    console.log(err)
                  }
                )
          
              }
              close(){
                this.router.navigate(['/Bills'])
              }
              inWord(){
                let  splitted =  this.invoice.tvaObj.total_ttc.split("."); 
                let beforeC = splitted[0]
                let afterC = splitted[1]
                beforeC =  parseFloat(beforeC)
                afterC =  parseFloat(afterC)
                beforeC = this.ngxNumToWordsService.inWords(beforeC, this.lang);
                afterC = afterC ? ","+ this.ngxNumToWordsService.inWords(afterC, this.lang) + " millimes ": ""
                this.invoice.tvaObj.inWord = beforeC + " DINARS " + afterC 
                             
                           
              }
          
          
            invoice = new Invoice();
          
           

            addProduct(){
              this.invoice.products.push(new Product());
            }
          
            deleteProduct(index){
              if(this.invoice.products.length ==1) {
                return false;
          
            } else {
                this.invoice.products.splice(index, 1);
              this.sumofTotalPrice()
              this.updateTTC()
                return true;
            }
          

            }
          
            client(){
             
               this.clientService.getClientInfo(this.invoice.clientid).then(
                res=>{
                  this.selectedClient = res
                  this.clientId = res.id
                  console.log(res);
                  
                },err=>{
                  console.log(err)
                }
              )
              
            }
          
            async formBillNum(){
          
              let date = new Date(this.invoice.tvaObj.DateFacturation).getFullYear()
              await this.billService.calcNumBills(date).then
              (
                res=>{
                  this.numBill = res.numBill ? res.numBill : 0
                  this.numBill++
                },
                err=>{
                  console.log(err);
                }
              )
          
              let number
              let num = this.numBill
          
              if( (num > 0) && ( num <= 9))
              {
                number = '0000'+num
              }
              else if ((num >= 10) && ( num <= 99 )){
                number = '000'+num
              }else if ((num >= 100) && (num <= 999)){
                number = '00'+num
              }else if ( (num >= 1000) && ( num  <= 9999)){
                  number = '0'+num
              }else if((num >= 10000) && (num <= 99999))
              {
                number = num
              }
            number = date+"-"+number
            this.num = number
          
          
          
            }

            select()
            {
            this.selectedClient = false
              
            }
 async dateFormat()
{
  let formatedDate = ""
 await this.billService.getLastBill().then(
    res => {
      if(res){
        
        formatedDate = date.format(new Date(res.DateFacturation), 'YYYY-MM-DD')
         }
      
    }, err =>{
      console.log(err);
      
    }
  )

 return formatedDate
 
}

OpenPdf()
{
  let sercretKey = "nachd-it"
  let config = {
    "billNum" : this.num,
    "clientId": this.clientId,
    "tax" : this.tax,
    "tva" : this.rate_tva
  }
  let object = {
   "client": this.selectedClient,
   "config": config,
   "invoice": this.invoice.tvaObj,
   "products" : this.invoice.products


  }
  let  cryptedObject = CryptoJS.AES.encrypt(JSON.stringify(object),sercretKey).toString();
localStorage.setItem('dataPdf',cryptedObject)
window.open('/pdf')


}
}
