import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import Swal from 'sweetalert2'
import { PaperTypeService } from '../services/paper-type.service';
import { ProjectService } from '../services/project.service';
@Component({
  selector: 'app-paper-manager',
  templateUrl: './paper-manager.component.html',
  styleUrls: ['./paper-manager.component.css']
})
export class PaperManagerComponent implements OnInit {

  addNewPaperModal
  paperForm : FormGroup
  papersType
  projects
  papers
  selectedPapers
  constructor( private fb:FormBuilder,private toastr :ToastrService,private paperTypeService:PaperTypeService,private projectService: ProjectService) { 


                  let formControls = {
                    
                    paper_name : new FormControl('',[
                      Validators.required,
                      Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                      Validators.minLength(4),
                      Validators.maxLength(16)
                        ]),
                        paper_type : new FormControl('',[
                        Validators.required,
                      
                            ]),
                        expiration_date : new FormControl('',[
                        Validators.required,
                        Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                        Validators.minLength(4),
                        Validators.maxLength(16)
                                  ]),  
                    description : new FormControl('',[
                      Validators.required,
                      Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                      Validators.minLength(4),
                          ]), 
                          
                          project_id : new FormControl('',[
                            Validators.required,
                            Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                            Validators.minLength(4),
                                ]),        

                        
                            }
                    this.paperForm = this.fb.group(formControls) ;

                }

              get paper_name() { return this.paperForm.get('paper_name') }
              get paper_type() { return this.paperForm.get('paper_type') }
              get expiration_date() { return this.paperForm.get('expiration_date')}
              get description() { return this.paperForm.get('description')}
              get project_id() { return this.paperForm.get('project_id')}


  ngOnInit(): void {

    this.paperTypeService.getPaperTypes().subscribe(
      res=>{
       this.papersType = res   
        }, err =>{
        console.log(err)
      }
    )
    this.projectService.getProjectsWithClient().subscribe(
      res =>{
      this.projects = res     
 }, err =>{
        console.log(err)
      }
    )

    this.paperTypeService.getPapers().subscribe(
      res=>{
        this.papers =  res
      }, err=>{
        console.log(err)
      }
    )
   
  }
  
  showAddPaperModal()
  {
    this.addNewPaperModal = true
  }

  addPaper()
  {
    let paper = (this.paperForm.value)
    console.log(paper)
    this.paperTypeService.createType(paper).subscribe(
      res=>{
        console.log(res)
        this.addNewPaperModal =  false
        this.toastr.success("Paper added!")
        this.ngOnInit()

      },err=>{
        console.log(err)

      }
    )
  }

}
