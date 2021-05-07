import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verif-new-email',
  templateUrl: './verif-new-email.component.html',
  styleUrls: ['./verif-new-email.component.css']
})
export class VerifNewEmailComponent implements OnInit {
token
password
isChecked 
  constructor(private userService :UserService,
              private activatedRoute : ActivatedRoute,
              private toastr :ToastrService,
              private router : Router) { }

  
 async  ngOnInit() {
  let isLogged = this.userService.islogged();
  if(isLogged)
  {
       this.router.navigate(['/'])
  }



    this.token = this.activatedRoute.snapshot.params.token

 await    this.userService.checkToken(this.token).then(
      res => {
        this.isChecked = res.isChecked
      }, err => {
        console.log(err);
        
      }
    )
  }




  updateEmail()
  {
    this.userService.updateEmail(this.token,this.password).subscribe(
      res => {
        let isChanged = res.isChanged
        if(!isChanged)
        {
          this.toastr.error('wrong password')
        }else {
          this.toastr.success("Email changed!")
          this.router.navigate(['/login'])
        }
        
      }, err => {
        console.log(err);
        
      }
    )
   }
}
