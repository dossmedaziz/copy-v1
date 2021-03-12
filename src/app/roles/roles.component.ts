import { Component, OnInit } from '@angular/core';
import { Privilege } from '../privilege';
import { PrivilegeService } from '../services/privilege.service';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  displayModal: boolean;
  displayModal1: boolean;
  displayModal2: boolean;
  displayModal3: boolean;
  roles
  users :User[]
  selectedUsers: User[];
  actions 
  spaces
  selectedPriv = new Array()

  role_name

  
  constructor(private userService: UserService,
              private privilegeService : PrivilegeService ,
              private toastr:ToastrService )  {}


  ngOnInit(): void {

    this.userService.getusers().subscribe(data => this.users = data) // stil not done
     

          // fetch actions from api
          this.privilegeService.getAllActions().subscribe(res=>{
          this.actions = res
          },err=>{
            console.log(err)
          })
          //fetch spaces from api
          this.privilegeService.getAllSpaces().subscribe(res=>{
            this.spaces = res
            },err=>{
              console.log(err)
            })


       // fetch all roles from api
            this.privilegeService.getAllRoles().subscribe(
              res=>{
               this.roles = res
               console.log(this.roles)

              },err=>{
                console.log(err)
              }
            )
        }
    

      showModalDialog1() {
        this.displayModal1 = true;
      }

        showModalDialog2() {
          this.displayModal2 = true;
        }

        showModalDialog3() {
          this.displayModal3 = true;
        }



        saveRole(){
          this.privilegeService.createRole(this.role_name,this.selectedPriv).subscribe(
            res=>{
                console.log(res)
                this.toastr.success('Role created successfully')
                this.displayModal3 = false;
                window.location.reload()

            },err=>{
              console.log(err)

            }
          )
        }




        selectPriv(space_id,action_id,event)
       {
        
      if(event.target.checked)
      {
        this.selectedPriv.push({
            "space_id" : space_id,
            "action_id":action_id
          })
        
      }else{
        let index = this.selectedPriv.findIndex(elt=> elt.action_id == action_id && elt.space_id == space_id);
        this.selectedPriv.splice(index , 1) ;
      }
      console.log(this.selectedPriv)


       }



       getSelectedRole() {
        this.displayModal = true;
    }
      
}
