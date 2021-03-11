import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/app/user';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  user : User ;
  users:User[];
  selectedUsers: User[];
  displayModal: boolean;
  displayModal1: boolean;
  displayModal2: boolean;
  displayModal3: boolean;
  displayModal4: boolean;

    constructor(private  userService:UserService) { }

    ngOnInit(): void {

      this.userService.getusers().subscribe(data=> this.users = data)
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

  editUser(user: User) {
    this.user = user
    console.log(this.user.name)
   this.displayModal = true;
  
  }

}
