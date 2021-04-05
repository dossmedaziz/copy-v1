import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { PaperTypeService } from 'src/app/services/paper-type.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-paper-type',
  templateUrl: './add-paper-type.component.html',
  styleUrls: ['./add-paper-type.component.css']
})
export class AddPaperTypeComponent implements OnInit {
  typeForm : FormGroup
  checked
  paperTypes 
  selectedTypes
  addTypeModal
  updateTypeModal

  constructor(private fb:FormBuilder,private paperTypeSrvice :PaperTypeService,private toastr : ToastrService) 
  {
    let formControls = {

    type_name  : new FormControl('',[
    Validators.required,
    Validators.pattern("[A-Z a-z 0-9 .'-]+"),
    Validators.minLength(4),
    Validators.maxLength(20)
    ]),
    alert  : new FormControl(false,[
      ]),
    receiver  : new FormControl('',[
      ]),

    subject  : new FormControl('',[
    ]),
    content  : new FormControl('',[
      Validators.required,
      Validators.pattern("[A-Z a-z 0-9 .'-]+"),
    ]),
   }

    this.typeForm = this.fb.group(formControls);

  }
              get type_name() { return this.typeForm.get('type_name')}
              get alert() { return this.typeForm.get('alert')}
              get receiver() { return this.typeForm.get('receiver')}
              get subject() { return this.typeForm.get('subject')}
              get content() { return this.typeForm.get('content')}



          
  

  ngOnInit(): void {
    this.paperTypeSrvice.getPaperTypes().subscribe(
      res =>{ 
        this.paperTypes = res          
      }, err => {
        console.log(err);
        
      }
      
    )

    
  }




  addType()
  {
     let type = {
       paper_type : this.typeForm.get('type_name').value,
       is_renewing : this.typeForm.get('alert').value
     }
     let email = {
      subject : this.typeForm.get('subject').value,
      content : this.typeForm.get('content').value
     }
    this.paperTypeSrvice.createType(type,email).subscribe(
      res => {
        console.log(res);
        this.toastr.success("Type added!")
        this.ngOnInit()
        this.addTypeModal = false
        
        }, err => {
          console.log(err);
          
        }
    )

    console.log(email);
    
 }


 openTypeModal()
 {
   this.addTypeModal = true
 }



 getSelectedType(type)
 {

  this.updateTypeModal = true
   console.log(type);
   
   this.typeForm.patchValue({
     type_name : type.paper_type,
     alert : type.is_renewing
   })
   
 }


 
}
