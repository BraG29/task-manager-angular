import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenav,
    MatSidenavContainer
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
