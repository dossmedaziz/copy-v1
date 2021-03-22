import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { ProjectService } from '../services/project.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  
  status_table: any[]
  selectedProjectId
  clients
  projects
  projectForm: FormGroup;
  selectedProjects
  
 updateModal : boolean;
  displayModal1: boolean;
  addNewProjectModal: boolean;

  color = 'danger'

              constructor(private  clientService : ClientService,
                private fb:FormBuilder,
                private projectService :ProjectService,
                private toastr :ToastrService) {
                let formControls = {
      
                  project_name : new FormControl('',[
                     Validators.required,
                     Validators.pattern("[A-Z a-z 0-9 .'-]+"),
                     Validators.minLength(4),
                     Validators.maxLength(20)
                       ]),
                  start_date : new FormControl('',[
                      Validators.required,
                          ]),
                  status : new FormControl('',[
                      Validators.required,                    
                                ]),  
                  description : new FormControl('',[

                        ]), 
                        
                  client_id : new FormControl('',[
                    Validators.required,
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
               }, err=>{
                 console.log(err)
               }
             )


            
             this.status_table = [
             {
              "id":1,
              "status_name":"New",
              "color":"success",
              "icon" : "pi-check"
             },
             {
              "id":2,
              "status_name":"Canceled",
              "color":"danger",
              "icon":"pi-times"
               },
             {
              "id":3,
              "status_name":"Expired",
              "color":"warning",
              "icon":"pi-exclamation-triangle"
              }
          
            ]

       }


  


  showModalDialog1() {
    this.displayModal1 = true;
  }


  showAddProjectModal() {
    this.addNewProjectModal = true;
    this.projectForm.reset()
  }





  addProject()
  {
let project = (this.projectForm.value)

this.projectService.createProject(project).subscribe(
  res=>{
    this.addNewProjectModal = false
    this.toastr.success("new Project is added!")
    this.ngOnInit()
    this.projectForm.reset()
  }, err => {
    console.log(err)
  }
)

  }

  filterStatus(id)
  {
      let status =  this.status_table.find( el => el.id == id )
      return status
  }




  selectedProject(project)
  {
    this.updateModal = true
    this.selectedProjectId  = project.id
    this.projectForm.patchValue({
      project_name: project.project_name,
      status:project.status,
      description : project.description,
      client_id : project.client_id,
      start_date:new Date(project.start_date)
     })

     
  }



  updateProject()
  {
    let newProject = this.projectForm.value
    this.projectService.updateProject(this.selectedProjectId,newProject).subscribe(
      res=>{
         this.updateModal = false
        this.toastr.success('updated!')
        this.ngOnInit()
      }, err =>{
        console.log(err)
      }
    )
  }




deleteProject()
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
      let projects_id = []
      this.selectedProjects.map(el=>{
        projects_id.push({
         "project_id": el.id
       })
      })

      this.projectService.deleteProject(projects_id).subscribe(
        res=>{
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

  
}
