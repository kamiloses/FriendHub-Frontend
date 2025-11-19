import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {GlobalEnvironmentVariables} from '../../auth/global-environment-variables';

@Component({
  selector: 'app-left-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftSidebarComponent implements OnInit {


  constructor(private globalEnvironmentVariables: GlobalEnvironmentVariables, private router: Router) {
  }

  protected myUsername!: string | null;

  ngOnInit() {
    this.myUsername = sessionStorage.getItem('username') || "fail"

  }


  logout(): void {

    sessionStorage.clear();
    localStorage.clear();

    this.globalEnvironmentVariables.setGlobalToken(null);
    this.globalEnvironmentVariables.setGlobalUsername(null);
    this.globalEnvironmentVariables.setGlobalSession(false);

      this.router.navigate(['/auth/login']);

  }


}
