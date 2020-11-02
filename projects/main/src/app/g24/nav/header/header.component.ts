import { Component, OnInit } from '@angular/core';
import { AutoLogoutService } from '../../lib/common/auto-logout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user = {name: "cinta"}
  title = "telolet"

  constructor(
    private autoLogout : AutoLogoutService
    )
  {
    autoLogout.check();
    autoLogout.initInterval();
    autoLogout.initListener();
    autoLogout.reset();
  }

  ngOnInit(): void {
  }

}
