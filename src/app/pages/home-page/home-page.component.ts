import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{
  token: string | null = null;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');

    if(!this.token){
      this.router.navigate(['/login']);
    }
  }

}
