import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import jsPDF from 'jspdf' ;
import 'jspdf-autotable';
import { User } from 'src/app/user';
@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
users:User[];
selectedBills: User[];
displayModal: boolean;
displayModal1: boolean;
displayModal2: boolean;
displayModal3: boolean;
displayModal4: boolean;
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

showModalDialog2() {
  this.displayModal2 = true;
}

showModalDialog3() {
  this.displayModal3 = true;
}

showModalDialog4() {
  this.displayModal4 = true;
}
exportPdf() {
  //  this.doc.default(0,0) ; 
  //  this.doc.autoTable(this.exportColumns,this.selectedBills)
  
  this.doc.save('table.pdf')
}



}
