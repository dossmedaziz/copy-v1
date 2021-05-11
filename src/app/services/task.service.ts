import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api } from '../api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  api = new Api();
  myToken = localStorage.getItem('token')
  header = {headers: new HttpHeaders().append('Authorization','Bearer '+this.myToken )}
  constructor(private http:HttpClient) { }


  getTaskByproject(id)
  {
      return this.http.get<any>(this.api.api+'/getTaskByproject/'+id,this.header)
  }


  addTask(task,project_id)
  {
    return this.http.post<any>(this.api.api+'/addTask',{task : task , project_id: project_id},this.header)
  }
  editTask(newTask,task_id)
  {
    return this.http.put<any>(this.api.api+'/editTask',{newTask :newTask , task_id:task_id},this.header)
  }

  deleteTask(task_id)
  {
    return this.http.post<any>(this.api.api+'/deleteTask', {task_id : task_id}, this.header )
  }
  taskRelation(task_id,parent_id)
  {
    return this.http.post<any>(this.api.api+'/taskRelation',{task_id : task_id , parent_id : parent_id},this.header)
  }
}
