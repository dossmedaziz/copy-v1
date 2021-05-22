import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { PaperTypeService } from '../services/paper-type.service';
import date from 'date-and-time';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 

      emailEditModal
      moreInfoModal
      previewModal
      contractsModal

      selectedContractsType
      contracts = new Array()
      contract_status
      paper_status
      selectedContracts
      response
      maintContracts
      hostingtContracts
      updateContracts
   
emailContent 
subject
receiver
selectedContract

  constructor(private paperTypeService:PaperTypeService,private configService:ConfigService,private toastr : ToastrService) { }

  async ngOnInit() {
 await  this.paperTypeService.getJustContracts().then(
    res => {
      this.response = res                  
        this.contracts = this.response.contracts
        
        this.maintContracts = this.response.maintenance
        this.hostingtContracts = this.response.hosting
        this.updateContracts =  this.response.update
      }, err => {
      console.log(err)
    }
  )   

    this.contract_status= this.configService.contract_status
    this.paper_status= this.configService.status_paper
    

  }







  showcContracts(selectedContracts)
{
  this.contractsModal = true
  this.selectedContractsType = selectedContracts
}



filterStatus(id)
{
  let status =  this.paper_status.find( el => el.id == id )
  return status
}
filterStatus1(id)
{
  if(id == 0){
    return this.contract_status['1']
  }else {
    return this.contract_status['0']
  }
}





ShowContract(contract)
{
  this.moreInfoModal = true
}
preview()
{
  this.previewModal = true
}


  dashboardAccess()
  {
    let user = JSON.parse(this.configService.decryptString(localStorage.getItem('user')))
    let role_id = user.role_id 
    if(role_id == 1)
    {
      return true
    }else {
      return false
    }
  }





  previewEmail(contract)
{

  this.selectedContract = contract
  this.receiver = (contract.project.client.email);
  this.emailContent = contract.type.email.content 
  this.subject = contract.type.email.subject 
  this.emailContent =  this.emailContent.replace('/client_name',contract.project.client.client_name)
  this.emailContent =  this.emailContent.replace('/type_name',contract.type.paper_type)
  this.emailContent =  this.emailContent.replace('/start_date',date.format(new Date(contract.start_date), 'YYYY-MM-DD'))
  this.emailContent =  this.emailContent.replace('/end_date',date.format(new Date(contract.end_date), 'YYYY-MM-DD'))
  this.emailEditModal = true
}




    sendMail()
    {
      let config = {
        contract_id  : this.selectedContract.id,
        client_name  : this.selectedContract.project.client.client_name,
        client_email : this.selectedContract.project.client.email,
        subject : this.subject,
        email_body : this.emailContent
      }
      this.paperTypeService.SendMailManu(config).subscribe(
        res => {
          console.log(res); 
          this.emailEditModal = false
          this.toastr.success('Email sent!')
          this.ngOnInit()


        }, err =>{
          console.log(err);
          
        }
      )

       
       
    }


}
