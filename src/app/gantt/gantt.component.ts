import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { editingData, projectNewData  } from './data';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {
projectId
start_date
date 
  public data: object[];
  public resources: object[];
  public resourceFields: object ;
  public taskSettings: object;
  public columns: object[];
  public timelineSettings: object;
  public gridLines: string;
  public labelSettings: object;
  public projectStartDate: Date;
  public projectEndDate: Date;
  public editSettings: object;
  public eventMarkers: object[];
  public toolbar: string[];
  public splitterSettings: object;
        constructor(private taskService : TaskService, 
            private activatedRoute : ActivatedRoute,
            private projectService : ProjectService,
            private router : Router){}
  async ngOnInit() {

      this.projectId = this.activatedRoute.snapshot.params.projectId
      
      
   
    this.data = projectNewData;
    this.taskSettings = {
        id: 'id',
        name: 'task_name',
        startDate: 'start_date',
        endDate: 'end_date',
        duration: 'duration',
        progress: 'progress',
        dependency: 'predecessor',
        child: 'subtasks'
    };
    this.columns = [
        { field: 'id', width: 60 },
        { field: 'task_name', width: 250 },
        { field: 'start_date' },
        { field: 'end_date' },
        { field: 'duration' },
        { field: 'predecessor' },
        { field: 'progress' },
    ];
    this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Search', 'Indent', 'Outdent'];
    this.editSettings = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
    };
    this.labelSettings = {
        leftLabel: 'task_name',
    };
    this.splitterSettings = {
        columnIndex: 2
    };
this.date = await this.dateFormat()

    this.projectStartDate = new Date(this.date);
    this.projectEndDate = new Date('12/31/2021');
    this.labelSettings = {
        taskLabel: '${progress}%'
    }
 
 }




dataBound() {
   this.taskService.getTaskByproject(this.projectId).subscribe(
       res => {
         this.data = res
           
       }, err =>{
           console.log(err);
           
       }
   )
    
  

    
}


endEdit(): void {
    console.log('Gantt <b>endEdit</b> event called<hr>');
}

taskbarEdited(): void {
    console.log(this.data);
}





async dateFormat()
{
  let date = ''
  await  this.projectService.getProjectById(this.projectId).then(
    res =>  {
      if(res){
        
        
      
      date = new Date(res.start_date).getMonth() + 1 < 9 ? date+'0'+(new Date(res.start_date).getMonth() + 1)+'/' :
      date+(new Date(res.start_date).getMonth()+ 1) +'/'
      date = new Date(res.start_date).getDate() < 9 ?  date+'0'+new Date(res.start_date).getDate() +'/':
      date+new Date(res.start_date).getDate() +'/'
      date = date + new Date(res.start_date).getFullYear() 
           
     }
     
    }, err =>{
      console.log(err);
      
    }
  )

return date
 
}
}
