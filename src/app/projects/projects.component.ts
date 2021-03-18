import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { ClientService } from '../services/client.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { ProjectService } from '../services/project.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  clients
  projects
  projectForm: FormGroup;
  selectedUsers: User[];
  displayModal: boolean;
  displayModal1: boolean;
  displayModal2: boolean;
  addNewProjectModal: boolean;
  displayModal4: boolean;

              constructor(private  clientService : ClientService,
                private fb:FormBuilder,
                private projectService :ProjectService,
                private toastr :ToastrService) {
                let formControls = {
      
                  project_name : new FormControl('',[
                     Validators.required,
                     Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                     Validators.minLength(4),
                     Validators.maxLength(16)
                       ]),
                  start_date : new FormControl('',[
                      Validators.required,
                     
                          ]),
                 status : new FormControl('',[
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
                        
                  client_id : new FormControl('',[
                          Validators.required,
                          Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                          Validators.minLength(4),
                              ]),        
  
                      
                          }
                   this.projectForm = this.fb.group(formControls) ;

               }

               get project_name() { return this.projectForm.get('project_name') }
               get status() { return this.projectForm.get('status') }
               get start_date() { return this.projectForm.get('start_date')}
               get description() { return this.projectForm.get('description')}
               get client_id() { return this.projectForm.get('client_id')}
         

    ngOnInit(): void {

      // fetch all clients from API =>
              this.clientService.getClients().subscribe(
                res => {
                  this.clients = res;
                
                }, err =>  {
                  console.log(err)
                }
              )

      // fetch projects with client form api =>
      
             this.projectService.getProjectsWithClient().subscribe(
               res=>{
                 this.projects = res
                 console.log(this.projects)
               }, err=>{
                 console.log(err)
               }
             )
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
  showAddProjectModal() {
    this.addNewProjectModal = true;
  }

  showModalDialog4() {
    this.displayModal4 = true;
  }



  addProject()
  {
let project = (this.projectForm.value)
console.log(project)
this.projectService.createProject(project).subscribe(
  res=>{
    console.log(res)
    this.addNewProjectModal = false
    this.toastr.success("new Project is added!")
    this.ngOnInit()
  }, err => {
    console.log(err)
  }
)
  }

}
