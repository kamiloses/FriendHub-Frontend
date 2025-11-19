import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {GlobalEnvironmentVariables} from '../../auth/global-environment-variables';

@Component({
  selector: 'app-left-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftSidebar implements OnInit {


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

    this.router.navigate(['/login']).then(r => console.log("successfully logged out."));

  }
}
