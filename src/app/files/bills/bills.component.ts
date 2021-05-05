import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { BillService } from 'src/app/services/bill.service';
import { ConfigService } from 'src/app/services/config.service';


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  number
  bills = Array()
  selectedBill
  years = Array()
  year
  selectedYear = new Date().getFullYear()
  num = 0
  searchKey
  allBills = Array()
  constructor(private billService : BillService,private toastr:ToastrService ,
     private configService : ConfigService ,
    private router : Router) { }

  async ngOnInit() {

    for ( let i = 2017 ;  i < 2050 ; i++  )
    {
      this.years.push({
       year : i
      })
    }
    await this.billService.getBills().then(
    res=>{
      this.allBills = res.bills
      this.bills = res.bills
      
        },err=>{
      console.log(err)
    }
  )
  await this.filterByYear()

  }

  updateBill(id){
    this.router.navigate(['/updateBill', id])

  }

  deleteBill(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do You Really Want To Delete The Bill!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        let bills_id = []
        this.selectedBill.map(el=>{
          bills_id.push({
          "bill_id": el.id
        })
        })
        this.billService.deleteBill(bills_id).subscribe(
          res=>{
            this.toastr.success('Bill is deleted')
            this.ngOnInit()
          }, err=>{
            console.log(err)
          }
          )
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
          )

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your file is safe :)',
            'error'
          )
        }})}



 addBill()
{

this.router.navigate(['/addBill'])

}



filterActions(action_name,space_name)
{
 if( this.configService.filterActions(action_name,space_name)){
   return true
 }else{
   return false
 }
}

  async filterByYear()
{

    this.allBills = []
  await this.bills.map(el => {
    let year = new Date(el.DateFacturation).getFullYear()
if(year == this.selectedYear)
   {
 
      this.allBills.push(
           el
          )
          
   }
   
    });




  }
  changeStatus(bill_id , status)
  {
    this.billService.changeStatus(bill_id,status).subscribe(
      res => {
        console.log(res);
        this.ngOnInit()
      }, err => {
        console.log(err);
        
      }
    )
  }
}
