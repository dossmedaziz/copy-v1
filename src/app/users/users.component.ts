import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:User[];
selectedUsers: User[];
displayModal: boolean;
displayModal1: boolean;
displayModal2: boolean;
displayModal3: boolean;
displayModal4: boolean;

  constructor(private  userService:UserService) { }

  ngOnInit(): void {

    this.userService.getusers().subscribe(
      res=>{
console.log(res)
      },err=>{
        console.log(err)
      }
    )
  }


  showModalDialog() {
    this.displayModal = true;
}


showModalDialog1() {
  this.displayModal1 = true;
}

showModalDialog2() {
  this.displayModal2 = true;
}
showModalDialog3() {
  this.displayModal3 = true;
}

showModalDialog4() {
  this.displayModal4 = true;
}



}
