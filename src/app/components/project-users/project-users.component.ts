import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {IUser} from "../../models/user";
import {MatList, MatListItem} from "@angular/material/list";
import {ILink} from "../../models/link";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-project-users',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatButton
  ],
  templateUrl: './project-users.component.html',
  styleUrl: './project-users.component.scss'
})
export class ProjectUsersComponent {
  links: ILink[] = [];
  @Output()
  memberAction: EventEmitter<{}> = new EventEmitter<{}>();

  setUsers(links: ILink[]){
    this.links = links;
  }

  addMember(){
    this.memberAction.emit();
  }

}
