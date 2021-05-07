import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

emailForm: FormGroup

  constructor(private fb: FormBuilder,
              private UserService : UserService,
              private toastr : ToastrService,
              private router : Router) {
    
    let formControls = {

      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])}
    this.emailForm = this.fb.group(formControls);

  }

  get email() { return this.emailForm.get('email') }

  ngOnInit(): void {
    let isLogged = this.UserService.islogged();
    if(isLogged)
    {
         this.router.navigate(['/'])
    }
  }


  send()
  {
let email = this.emailForm.get('email').value
this.UserService.sendMail(email).subscribe( 
  res => {
     this.toastr.success('Mail sent to '+email)
     this.emailForm.reset()
    
    }, err => {
      if(err.status == 403)
      {
       this.toastr.error('User not found')

      }else{
       this.toastr.error('serveur issues')

      }
      
    }
    )

  
  }

}
