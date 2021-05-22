import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { SearchResultComponent } from '../search-result/search-result.component';
import { Api} from '../../api'
import { ConfigService } from 'src/app/services/config.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  searchResult
    userName
    searchKey
    visibleSidebar1
    Userphoto
    api = new Api
    fileGenralLink = this.api.url
  constructor(
    private primengConfig: PrimeNGConfig,
                private toastr: ToastrService,
                private router: Router,
                private configService : ConfigService ) { }

  ngOnInit(): void {

    this.primengConfig.ripple = true;
    let user = JSON.parse(this.configService.decryptString(localStorage.getItem('user')))
      this.userName = user.name
      this.Userphoto = user.photo

  }



  logout()
  {
      localStorage.clear()
      this.router.navigate(['/login'])
      this.toastr.info('you are logged out')
   }




}
