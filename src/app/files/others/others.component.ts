import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf' ;
import { UserService } from 'src/app/user.service';
import 'jspdf-autotable';
import { User } from 'src/app/user';
<<<<<<< HEAD
import Swal from 'sweetalert2'

=======
>>>>>>> 058f7a072ca3493cfe9d48a842d2dd9933fb2f97
@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {
  users:User[];
<<<<<<< HEAD
  selectedUser
  user : User ;

  selectedBills: User[];
  displayModal: boolean;
  displayModal1: boolean;
=======
  selectedBills: User[];
  displayModal: boolean;
  displayModal1: boolean;
  displayModal2: boolean;
>>>>>>> 058f7a072ca3493cfe9d48a842d2dd9933fb2f97
  displayModal3: boolean;
  exportColumns:[];
  doc = new jsPDF()

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

<<<<<<< HEAD

=======
showModalDialog2() {
  this.displayModal2 = true;
}
>>>>>>> 058f7a072ca3493cfe9d48a842d2dd9933fb2f97

showModalDialog3() {
  this.displayModal3 = true;
}

exportPdf() {
  //  this.doc.default(0,0) ; 
  //  this.doc.autoTable(this.exportColumns,this.selectedBills)
  
  this.doc.save('table.pdf')
}
<<<<<<< HEAD



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
ShowUser(user:User)
{
  this.selectedUser = [user]
  console.log(this.selectedUser)
  this.displayModal1 = true;
}
editUser(user: User) {
  this.user = user
  console.log(this.user.name)
 this.displayModal = true;

}
=======
>>>>>>> 058f7a072ca3493cfe9d48a842d2dd9933fb2f97
}
