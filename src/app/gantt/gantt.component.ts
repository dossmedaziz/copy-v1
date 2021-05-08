import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { editingData, projectNewData  } from './data';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import date from 'date-and-time';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {
projectId
start_date
date 
selectedRow
allTasks = Array()
data = Array()
  // public data: object[];
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
      
      this.taskService.getTaskByproject(this.projectId).subscribe(
        res =>{

          
         this.data = res
         
        //  this.filter(this.data)
          
        }
      )   
      this.data = [] 
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




    
  

    


endEdit(args : any): void {
  // console.log(args.data);



}

taskbarEdited(args : any): void {
  if(this.selectedRow == args.data.id){

    console.log("edit2");
  }

}



async dateFormat()
{
  let formatedDate = ""
  await  this.projectService.getProjectById(this.projectId).then(
    res =>  {
      if(res){
      formatedDate = date.format(new Date(res.start_date), 'MM/DD/YYYY')      
     }
     
    }, err =>{
      console.log(err);
      
    }
  )

return formatedDate
 
}


public actionComplete(args: any) { 

  if (args.requestType == "add" ){ 

    // let task = [
    //  { 
    //   task_name :  args.data.taskData.task_name,
    //   start_date : args.data.taskData.start_date,
    //   end_date : args.data.taskData.end_date,
    //   progress : args.data.taskData.progress,
    //   duration : args.data.taskData.duration,
    //   predecessor : args.data.taskData.predecessor,
    // }
    // ]
    let task = {
      task_name :  args.data.taskData.task_name,
      start_date : args.data.taskData.start_date,
      end_date : args.data.taskData.end_date,
      progress : args.data.taskData.progress,
      duration : args.data.taskData.duration,
      predecessor : args.data.taskData.predecessor,
    }
    
    
    
   this.taskService.addTask(task,this.projectId).subscribe(
     res => {
       console.log(res);
       
     }, err => {
       console.log(err);
       
     }
   )
  
    
  }else if(args.requestType == "delete")
    { 
      let msg =  this.selectedRow
      console.log("delete");
      console.log(msg);
    }else if( args.requestType == "save" && (this.selectedRow != args.data.id))
    {
      console.log("edit1");
      console.log(args.data);
      
      
      
    }else if(args.requestType == "indented")
    {
      console.log(args.data);
      
    }else if(args.requestType == "outdented")
    {
      console.log(args.data);

    }
 
   

  
}
public actionBegin(args: any) { 
  if (args.requestType == "beforeSave" || args.requestType == "beforeAdd" || args.requestType == "beforeEdit") { 
    // console.log(args.data.id); 
  } 

}
public rowSelected(args: any) { 
 
  this.selectedRow = (args.data.id); 

  
  
  } 



//   filter(data)
//   {
  
// console.log(data);

//   // data.forEach(el => {
//   //   let element = {
//   //     id: el.id,
//   //     name: el.task_name,
//   //     start_date: el.start_date,
//   //     endDate: el.end_date,
//   //     duration: el.duration,
//   //     progress: el.progress,
//   //     dependency: el.predecessor,
//   //    }
//   //      this.allTasks.push(element)
//   //      if( el.subtasks.length )
//   //      {
//   //       this.filter(el.subtasks)
//   //      }

//   // })
//   // console.log(this.allTasks);
// }


}
