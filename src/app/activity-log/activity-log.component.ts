import { Component, OnInit } from '@angular/core';
import { ActivityLogService } from '../services/activity-log.service';
import { UserService } from '../services/user.service';
import { Api } from '../api'
@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit {
users
selectedUser = "*"
activities
searchKey
api = new Api()
url = this.api.url
  constructor(private userService : UserService ,
     private activityLogService : ActivityLogService) { }

  ngOnInit(): void {
    this.userService.getusers().subscribe(
      res => {
        this.users =  res

      }, err => {
        console.log(err);

      }
    )

    this.activityLogService.getAllactivities().subscribe(
      res => {
        this.activities = res

      } , err => {
        console.log(err);

      }
    )
  }



  



}
