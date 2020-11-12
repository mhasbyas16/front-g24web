import { Component, OnInit } from '@angular/core';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { Subscription } from 'rxjs';
import { AutoLogoutService } from '../../lib/common/auto-logout.service';
import { ContentPage } from '../../lib/helper/content-page';
import { ServerDateTimeService } from '../../services/system/server-date-time.service';

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

  dateSubscription : Subscription = null;
  fulldate : string = "";
  date : string = "";
  time : string = "";

  constructor(
    private autoLogout : AutoLogoutService,
    private session : SessionService,
    private dateService : ServerDateTimeService
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
    this.loadDate();
  }

  showBranchMappingScreen()
  {
    ContentPage.ChangeContent("", true);
  }

  async loadDate()
  {
    if(this.dateSubscription != null)
    {
      this.dateSubscription.unsubscribe();
    }

    this.dateSubscription = this.dateService.task("?").subscribe(result => {
      if(result)
      {
        this.fulldate = result;
        this.date = this.dateService.getDateOnly(this.fulldate);
        this.time = this.dateService.getTimeOnly(this.fulldate);
      }
    });
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
