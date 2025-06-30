import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  imports: [
    RouterLink
  ],
  templateUrl: './left-sidebar.html',
  standalone: true,
  styleUrl: './left-sidebar.css'
})
export class LeftSidebar {

}
