import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private configService : ConfigService) { }

  ngOnInit(): void {
  }


  filterRoutes(space_name)
{
  let privileges = JSON.parse(this.configService.decryptString(localStorage.getItem('privileges')))
  let user = JSON.parse(this.configService.decryptString(localStorage.getItem('user')))
  let role_id = user.role_id 
  let  reslt  = privileges.find(element =>{
    let name = element.space.space_name
    let i = space_name.indexOf(name)
    if(i != -1)
    {
      
      return element.space
    }    
   });
 if(reslt || role_id == 1)
   {
    return true
   }else{
     return false 
   }
}
}
