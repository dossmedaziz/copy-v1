import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import jsPDF from 'jspdf' ;
import 'jspdf-autotable';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  vis = false
  clients
  clientForm: FormGroup;
  slectedClientId
  selectedClients
  
  selectedBills: User[];
  displayModal: boolean;
  displayModal1: boolean;
  displayModal3: boolean;
  displayModal4: boolean;
  exportColumns:[];


   doc = new jsPDF()
  constructor(private clientService: ClientService,private fb:FormBuilder,private toastr: ToastrService) {
    let formControls = {
      
      client_name : new FormControl('',[
         Validators.required,
         Validators.pattern("[A-Z a-z 0-9 .'-]+"),
         Validators.minLength(4),
         Validators.maxLength(16)
           ]),
  
      email : new FormControl ('',[
            Validators.required,
            Validators.email
          ]),
      matFisc : new FormControl ('',[
            Validators.required,
            Validators.pattern("[A-Z a-z 0-9 .'-]+"),
            Validators.minLength(4),
            Validators.maxLength(16)
          ]),
          address : new FormControl ('',[
            Validators.required,
            Validators.pattern("[A-Z a-z 0-9 .'-]+"),
            Validators.minLength(4),
          ]),
          phone : new FormControl ('',[
            Validators.required,
            Validators.pattern("[0-9 .'-]+"),
            Validators.minLength(4),
          ]),
          fax : new FormControl ('',[
            Validators.required,
            Validators.pattern("[A-Z a-z 0-9 .'-]+"),
            Validators.minLength(4),
          ])}
          
          this.clientForm = this.fb.group(formControls) ;
   }
      get name() { return this.clientForm.get('name') }
      get email() { return this.clientForm.get('email') }
      get matFisc() { return this.clientForm.get('matFisc')}
      get address() { return this.clientForm.get('address')}
      get fax() { return this.clientForm.get('fax')}
      get phone() { return this.clientForm.get('phone')}



      ngOnInit(): void {

        this.clientService.clientWithContacts().subscribe(
          res=>{
            this.clients = res

          },err=>{
            console.log(err)
          }
        )
  }

addClient(){
  let data = this.clientForm.value
  this.clientService.addClient(data).subscribe(
    res=>{
    this.toastr.success('client added successfully')
 this.displayModal3= false

 this.ngOnInit()
 
 },err=>{
   console.log(err)
   
 })

 }

 getSelectedClient(client)
{
this.displayModal = true
this.slectedClientId= client.id
this.clientForm.patchValue({
  client_name: client.client_name,
  email:client.email,
  matFisc : client.matFisc,
  address : client.address,
  fax : client.fax
})
}

updateUser()
{
 let data = this.clientForm.value

  this.clientService.updateClient(this.slectedClientId,data).subscribe(
    res=>{
      this.toastr.success("updated !")
      this.ngOnInit()
    }, err => {
      console.log(err)
    }
  )
  this.displayModal = false;

}
deleteClients(){
  Swal.fire({
    title: 'Are you sure?',
    text: 'You Have Project for that client Do you want to delete it!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!', 
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {

      let clients_id = []
      this.selectedClients.map(el=>{
       clients_id.push({
         "client_id": el.id
       })
      })
      console.log(clients_id)

      this.clientService.deleteClient(clients_id).subscribe(
        res=>{
          console.log(res)
          this.toastr.success("deleted")
          this.ngOnInit()
        }, err=>{
          console.log(err)
        }
      )


      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success',
       )
    
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
    
  })

 }
 
  showModalDialog3() {
  this.displayModal3 = true;
  this.clientForm.reset()

  }
  
  showModalDialog4() {
    this.displayModal4 = true;
  }

  
  
 
test()
{
  this.vis = true
}
  
  
}
