import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {User} from'../user' ; 
import jsPDF from 'jspdf' ;
import 'jspdf-autotable';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  text: string = '<h1>bonjour</h2>';
  users: User[];
  selectedUser 
  selectedBills: User[];
  displayModal: boolean;
  displayModal1: boolean;
  displayModal2: boolean;
  displayModal3: boolean;
  exportColumns:[];
  doc = new jsPDF()
  constructor(private userService :UserService) { }

  ngOnInit(): void {

    this.userService.getusers().subscribe(
      data => {
        this.users = data
        
      }) ; 
  }


  showModalDialog() {
    this.displayModal = true;
}

// showModalDialog1() {
//   this.displayModal1 = true;
// }
showModalDialog2() {
  this.displayModal2 = true;
}
showModalDialog3() {
  this.displayModal3 = true;
}


exportPdf() {
  //  this.doc.default(0,0) ; 
  //  this.doc.autoTable(this.exportColumns,this.selectedBills)
  
  this.doc.save('table.pdf')
}

deleteContract()
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
      alert("deleted")
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

}
