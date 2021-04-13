import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  passWordForm: FormGroup

  constructor(private fb: FormBuilder,private activatedRoute : ActivatedRoute ,private userService : UserService) { 

    let formControls = {

      password: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Z a-z 0-9 .'-]+"),
        Validators.minLength(4),
        Validators.maxLength(16)
      ]),
      Confirm_password: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Z a-z 0-9 .'-]+"),
        Validators.minLength(4),
        Validators.maxLength(16)
      ]),
    }
    this.passWordForm = this.fb.group(formControls);

  }
  get password() { return this.passWordForm.get('password') }
  get Confirm_password() { return this.passWordForm.get('Confirm_password') }
  ngOnInit(): void {
  }


save()
{

  let password = this.passWordForm.get('password').value
  this.userService.changePassword(password).subscribe(

  res => {
        console.log(res);
        
  }, err =>{
    console.log(err);
    
  })
}



}
