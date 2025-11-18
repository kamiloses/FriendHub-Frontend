import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    FormsModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
//todo cały komponent nazwy
  currentRoute!: string;
  searchedUser!:string

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.updateHeader();
    });
  }

  ngOnInit(): void {
    this.updateHeader();
  }

  updateHeader() {
    this.currentRoute = this.router.url;
  }

  onSearch(){
    this.router.navigate(['/search/'+this.searchedUser])


  }
}
