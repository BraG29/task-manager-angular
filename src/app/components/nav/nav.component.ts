import { Component } from '@angular/core';
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
export class NavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}
}
