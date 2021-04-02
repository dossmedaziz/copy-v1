import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { PaperTypeService } from '../services/paper-type.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  text: string = '<h1>bonjour</h2>';

      emailEditModal
      moreInfoModal
      previewModal
      contractsModal

selectedContractsType
      contracts
      status_paper
      selectedContracts
      response
      maintContracts
      hostingtContracts
      updateContracts


  constructor(private paperTypeService:PaperTypeService,private configService:ConfigService) { }

  async ngOnInit() {
 await  this.paperTypeService.getJustContracts().subscribe(
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
    this.status_paper= this.configService.status_paper

  }







  showcContracts(selectedContracts)
{
  this.contractsModal = true
  this.selectedContractsType = selectedContracts
}


filterStatus(id)
{
  let status =  this.status_paper.find( el => el.id == id )
  return status
}



showEmail()
{
  this.emailEditModal = true
}

ShowContract(contract)
{
  this.moreInfoModal = true
}
preview()
{
  this.previewModal = true
}







}
