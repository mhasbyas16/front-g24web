import { Component, OnInit } from '@angular/core';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { AutoLogoutService } from '../../lib/common/auto-logout.service';
import { ContentPage } from '../../lib/helper/content-page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user = "Account";
  user_nama = "";
  role = "";
  title = "telolet";

  constructor(
    private autoLogout : AutoLogoutService,
    private session : SessionService

    )
  {
    autoLogout.check();
    autoLogout.initInterval();
    autoLogout.initListener();
    autoLogout.reset();
  }

  ngOnInit(): void {
    this.user = this.session.getUser()?.username;
    this.user_nama = this.session.getUser()?.name;
    this.role = this.session.getRole()?.display_name;
  }

  showBranchMappingScreen()
  {
    ContentPage.ChangeContent("", true);
  }

  logout()
  {
    this.session.logout();
  }

  getKodeUnit() : string
  {
    if(!this.session.getUnit())
    {
      return "";
    }

    return this.session.getUnit().code;
  }

  getNamaUnit() : string
  {
    if(!this.session.getUnit())
    {
      return "";
    }

    return this.session.getUnit().nama;
  }

}
