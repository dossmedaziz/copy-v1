import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { PaperTypeService } from 'src/app/services/paper-type.service';


@Component({
  selector: 'app-add-paper-type',
  templateUrl: './add-paper-type.component.html',
  styleUrls: ['./add-paper-type.component.css']
})
export class AddPaperTypeComponent implements OnInit {
  @Input()  addnewTypeModal
  typeForm : FormGroup
  alert = "Activated"
  checked
  @Output() updatePage : EventEmitter<any> = new EventEmitter()
  @Output() hideModal : EventEmitter<any> = new EventEmitter()


  constructor(private fb:FormBuilder,private paperTypeSrvice :PaperTypeService,) {}




  type_name : FormControl = new FormControl('',[
    Validators.required,
    Validators.pattern("[A-Z a-z 0-9 .'-]+"),
    Validators.minLength(4),
    Validators.maxLength(20)
    ])

  ngOnInit(): void {
  }




  addType()
  {
   let type_name = this.type_name.value
   this.paperTypeSrvice.createType(type_name,this.checked).subscribe(
     res=>{
       console.log(res)
       this.updatePage.emit()
       
     }, err =>{
       console.log(err)
     }
   )

 }

 check(event){
   this.checked = event.target.checked
 }

 

 hideTheModal()
{
  this.hideModal.emit()
}

}
