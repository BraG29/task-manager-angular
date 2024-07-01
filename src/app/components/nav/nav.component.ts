import {Component, OnInit} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Breakpoints, BreakpointObserver} from "@angular/cdk/layout";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {map, Observable, shareReplay} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatFooterCell, MatFooterRow} from "@angular/material/table";
import {IJWTPayLoad} from "../../models/jwt-payload";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterOutlet,
    AsyncPipe,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatNavList,
    MatListItem,
    RouterLink,
    MatFooterCell,
    MatFooterRow,
    MatButton
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  jwtPayload: IJWTPayLoad | null= null;
  userFullName: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  ngOnInit(){
    const token = sessionStorage.getItem('token')

    if(token){
      this.jwtPayload = jwtDecode(token);
    }

    if(this.jwtPayload){
      this.userFullName = `${this.jwtPayload?.name} ${this.jwtPayload?.lastName}`;
    }


  }

  logOut(){
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
