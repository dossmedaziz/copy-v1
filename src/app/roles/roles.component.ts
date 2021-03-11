import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  displayModal: boolean;
  displayModal1: boolean;
  displayModal2: boolean;
  displayModal3: boolean;
  users: User[];
  selectedUsers: User[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getusers().subscribe(data => this.users = data)
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
 
}
