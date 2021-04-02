import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { ConfigService } from 'src/app/services/config.service';
import { PaperTypeService } from 'src/app/services/paper-type.service';
import { ProjectService } from 'src/app/services/project.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {

  @Input() updatePaperModal 
  @Input() selectedPaper
  @Input() newTest
  @Output() hideModal: EventEmitter<any> = new EventEmitter()
  @Output() refreshPage: EventEmitter<any> = new EventEmitter()

  selectedPaperId
  selectedFilePath
  paperForm : FormGroup
  projects 
  papersType
  status_paper
  files
  fileGenralLink = 'http://localhost:8000/'

  constructor(private fb:FormBuilder, 
              private toastr :ToastrService,
              private projectService :ProjectService,
              private configService:ConfigService,
              private paperTypeService:PaperTypeService) { 
    


    
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
      start_date : new FormControl('',[
          Validators.required,
                    ]), 
      end_date : new FormControl('',[
        Validators.required,
                  ]),  
      description : new FormControl('',[
     
            ]), 
            
       project_id : new FormControl('',[
              Validators.required,
                  ]),   
        status : new FormControl('',[
                    Validators.required,
                        ]),      
                        file : new FormControl('',[
                        ]), 
          
              }
      this.paperForm = this.fb.group(formControls) ;
  }
  get paper_name() { return this.paperForm.get('paper_name') }
  get paper_type() { return this.paperForm.get('paper_type') }
  get start_date() { return this.paperForm.get('start_date')}
  get end_date() { return this.paperForm.get('end_date')}
  get description() { return this.paperForm.get('description')}
  get project_id() { return this.paperForm.get('project_id')}
  get status() { return this.paperForm.get('status')}
  get file() { return this.paperForm.get('file')}

  ngOnInit(): void {

    this.projectService.getProjectsWithinfo().subscribe(
      res =>{
      this.projects = res   
 }, err =>{
        console.log(err)
      }
    )

    this.paperTypeService.getPaperTypes().subscribe(
      res=>{
       this.papersType = res   
      
        }, err =>{
        console.log(err)
      }
    )

    this.status_paper= this.configService.status_paper
   this.test()
   console.log(this.newTest)

  }





  getSelectedPaper()
  { 
   
    this.updatePaperModal = true
  
  }




  async updatePaper()
  {
    this.selectedPaperId = this.selectedPaper.id  
    let path=''
    let formData = new FormData();
    if(this.files){
    (formData.append("file",this.files,this.files.name))
    await this.paperTypeService.uploadFile(formData).then( 
    res => {
      path = res.path
      console.log(path)
      }, err => { console.log(err);})
      
    }
    console.log("test")
    let newPaper = this.paperForm.value
                  this.paperTypeService.updatePaper(this.selectedPaperId,newPaper,path).subscribe(
                    res => {
                      console.log(res)

                      this.toastr.success('Paper Updated!')
                      this.updatePaperModal = false
                       this.refreshPage.emit()
                    }, err => {
                      console.log(err)
                    }
                  )
             
    }


    selectFile(event)
{
  this.files = event.target.files[0]
  
}

hideTheModal() {
  this.paperForm.reset()
  this.hideModal.emit()
}



test()
{

  this.paperForm.patchValue({
    paper_name: this.selectedPaper.paper_name,
    paper_type:  this.selectedPaper.paper_type.id ? this.selectedPaper.paper_type.id :this.selectedPaper.paper_type,
    start_date : new Date(this.selectedPaper.start_date),
    end_date : new Date(this.selectedPaper.end_date),
    project_id : this.selectedPaper.project_id,
    description : this.selectedPaper.description,
    status : this.selectedPaper.status,
    })

    this.selectedFilePath = this.selectedPaper.paper_file 
}
}
