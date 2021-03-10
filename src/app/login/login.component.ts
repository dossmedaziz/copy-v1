import { Component, OnInit } from '@angular/core';
import { Api } from '../api';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
pass;
email;
url =  new Api()
  constructor(private userService : UserService,private router : Router) { }

  ngOnInit(): void {
    let isLogged = this.userService.islogged();
    if(isLogged)
    {
         this.router.navigate(['/'])
    }
  }



  login()
  {
 
   this.userService.login(this.email,this.pass).subscribe(res => {



    let token = res.token
    let user = res.user
    let privileges = res.privileges
 
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('privileges',JSON.stringify(privileges));
    this.router.navigate(['/'])

   },err=>{
console.log(err) ;
   })
  }



}
