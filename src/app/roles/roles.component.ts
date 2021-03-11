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
  
  
  groupedCities
  selectedCities4
  constructor(private userService: UserService) {}

  ngOnInit(): void {

    this.userService.getusers().subscribe(data => this.users = data)


    


    

   
    this.groupedCities = [

      {
          label: 'Client', value: '1', 
          items: [
              {label: 'Create', value: [{"action_id":"1"},{"space_id":"1"}]},
              {label: 'Read', value: '2'},
              {label: 'Update', value: '3'},
              {label: 'Delete', value: '4'}
          ]
      },
      {
        label: 'Client', value: '1', 
        items: [
            {label: 'Create', value: '1'},
            {label: 'Read', value: '2'},
            {label: 'Update', value: '3'},
            {label: 'Delete', value: '4'}
        ]
    },
     

  ];




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

  test()
  {
    let test = this.selectedCities4
      console.log(test['items'])

  }
 
}
