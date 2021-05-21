import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-pdf-form',
  templateUrl: './pdf-form.component.html',
  styleUrls: ['./pdf-form.component.css']
})
export class PdfFormComponent implements OnInit {
  sercretKey = "nachd-it"
  client
  invoice
  items
  config
  company
  constructor(private activatedRoute : ActivatedRoute,private companyService :CompanyService) { }

  async ngOnInit() {
 
  await this.decrypt()
  await this.companyService.getCompanyInfo().subscribe(
    res => {
      this.company = res[0]
      console.log(res);
      
    }, err => {
      console.log(err);
      
    }
  )
  }

  decrypt()
  {
    let dataInfo = localStorage.getItem('dataPdf') ? localStorage.getItem('dataPdf') : null
    if(dataInfo){
  var bytes  = CryptoJS.AES.decrypt(dataInfo,this.sercretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.client = decryptedData.client
      this.invoice = decryptedData.invoice
      this.config = decryptedData.config
      this.items =  decryptedData.products
     
    }
  }
}
