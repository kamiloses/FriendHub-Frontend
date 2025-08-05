import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

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
export class LeftSidebar {


}
