import { Component, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { PaperTypeService } from '../services/paper-type.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  
  constructor(private router:Router , private PaperTypeService :PaperTypeService,private configService : ConfigService) { }

  expiredContracts
  contracts = new Array()

 async ngOnInit() {

  await  this.PaperTypeService.getJustContracts().then(
    res => {
                  
        this.contracts = res.contracts
        
     
      }, err => {
      console.log(err)
    }
  ) 
  await this.sendMail()

    let url = this.router.url
    let privileges = JSON.parse(this.configService.decryptString(localStorage.getItem('privileges')))
    let user = JSON.parse(this.configService.decryptString(localStorage.getItem('user')))
    let role_name = user.role.role_name


         let  reslt  = privileges.find(element =>{
         let name = element.space.space_name
         let i = url.indexOf(name)
         if(i != -1)
         {
           return element.space
         }
         
        }) 


        if(role_name == "admin" )
        {

        }else if(!reslt){
          this.router.navigate(['/dashboard'])


    

        }
      if(localStorage.getItem('refresh'))
          {
            localStorage.removeItem('refresh')
            window.location.reload()
          }
          

   
   await  this.PaperTypeService.getExpiredContracts().then(
      res => {
        this.expiredContracts = res
      }, err => {
        console.log(err);
        
      }
    )

      
         this.PaperTypeService.changeStatus(this.expiredContracts,3).subscribe(
       res => {         
       }, err => {
         console.log(err);
         
       }
     )

  
     
    

   }
  async sendMail()
  {

    let autoContracts = new Array() 
    
   this.contracts.map(element => {
        if((element.auto_email == 1 ) && (element.isReminded == 0)){
          autoContracts.push(element)
        }
    })    
console.log(autoContracts.length);

if(autoContracts.length != 0)
    {
      
      
         this.PaperTypeService.sendMail(autoContracts).then(
       res => {
       }, err => {
         console.log(err);
         
       })
      

    }    
  }
}
