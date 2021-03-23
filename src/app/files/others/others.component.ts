import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf' ;
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {
  users:User[];
  selectedUser
  user : User ;

  selectedBills: User[];
  displayModal: boolean;
  displayModal1: boolean;
  displayModal3: boolean;
  exportColumns:[];
  doc = new jsPDF()

  @Input() client
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


showModalDialog3() {
  this.displayModal3 = true;
}





deleteItem()
{
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this imaginary file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'
      )
    // For more information about handling dismissals please visit
    // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })


}
}
