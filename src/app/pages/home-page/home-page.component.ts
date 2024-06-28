import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {NavComponent} from "../../components/nav/nav.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent{
  token: string | null = null;

  constructor(private router: Router) {
  }

  // ngOnInit(): void {
  //   this.token = sessionStorage.getItem('token');
  //
  //   if(!this.token){
  //     this.router.navigate(['/login']);
  //   }
  // }

}
