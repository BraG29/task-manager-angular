import {AfterContentInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {IProject} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {IJWTPayLoad} from "../../models/jwt-payload";
import {ProjectFormComponent} from "../../components/project-form/project-form.component";
import {ProjectUsersComponent} from "../../components/project-users/project-users.component";
import {IUser} from "../../models/user";
import {ITask} from "../../models/task";
import {ProjectTasksComponent} from "../../components/project-tasks/project-tasks.component";
import {MatButton} from "@angular/material/button";
import {ILink} from "../../models/link";
import {MatDialog} from "@angular/material/dialog";
import {MatError, MatFormField, MatInput, MatInputModule} from "@angular/material/input";
<<<<<<< HEAD
<<<<<<< HEAD
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
=======
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
>>>>>>> a25fd92 (merge)
=======
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

>>>>>>> 89aa58b (changes on interfaces)

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenav,
    MatSidenavContainer,
    MatNavList,
    MatSidenavContent,
    MatListItem,
    ProjectFormComponent,
    ProjectUsersComponent,
    ProjectTasksComponent,
    MatButton
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterContentInit{
  userId: number = 0;
  projects: IProject[] = [];
  tokenPayload: IJWTPayLoad | undefined;
  selectedProject: IProject | undefined;
  readonly dialog = inject(MatDialog)

  @ViewChild(ProjectUsersComponent)
  projectUsersComponent: ProjectUsersComponent | undefined;

  @ViewChild(ProjectFormComponent)
  projectFormComponent: ProjectFormComponent | undefined;

  @ViewChild(ProjectTasksComponent)
  projectTasksComponent: ProjectTasksComponent | undefined;

  constructor(private projectService: ProjectService) {
    const token = sessionStorage.getItem('token');
    if(token){
      this.tokenPayload = jwtDecode(token);
    }
  }

  ngAfterContentInit() {


    if(this.tokenPayload){
      this.userId = this.tokenPayload.uid;
    }

    this.projectService.projectsByUser(this.userId).subscribe({
      next: (response) => {
        this.projects = response;
        console.table(this.projects)
      },
      error: err => {
        console.error("Ha ocurrido un error: ");
        console.table(err);
      },
      complete: () => console.log("Proyctos recuperados satifactoriamente")
    });
  }

  selectProject(project: IProject){
    this.selectedProject = project;
    this.projectFormComponent?.setFormValues(project.title, project.description)

    let selectedUsers: ILink[] = [];
    let selectedTasks: ITask[] = [];

    project.links?.forEach(link => {
      selectedUsers.push(link);
    });

    // @ts-ignore
    project.tasks.forEach(task => {
      selectedTasks.push(task);
    })

    this.projectUsersComponent?.setUsers(selectedUsers);
    this.projectTasksComponent?.setTasks(selectedTasks);
  }

  newProject(){
    let blankProject: IProject = {
      title: "Nuevo Proyecto",
      id: 0,
      description: "",
      links: [],
      tasks: [],
      state: true
    };

    this.projects.push(blankProject);
  }

  saveChanges(){

    console.log('Entrando a Save Changes')

    let newProject: IProject = {
      id: null,
      description: this.projectFormComponent?.description?.value,
      title: this.projectFormComponent?.name?.value,
      tasks: this.projectTasksComponent?.getTasks(),
      links: this.selectedProject?.links,
      state: true
    }

    if(this.selectedProject){
      console.log("Hay proyecto seleccionado")
      // @ts-ignore
      if(this.selectedProject?.id > 0){
        console.log("Id es mayor a 0")
        newProject.id = this.selectedProject?.id;
        this.projectService.updateProject(newProject, this.userId).subscribe({
          next: response => console.table(response),
          error: err => console.table(err),
          complete: () => console.log('Peticion de update finalizada')
        });

      }else{
        console.log("Id es 0")
        newProject.links?.push({
          id: null,
          creatable: null,
          role: 0,
          creationDate: null,
          user: {
            id: this.userId,
            name: null,
            lastName: null,
            email: null,
            password: null,
            links: []
          }
        })
        console.table(newProject);
        this.projectService.createProject(newProject).subscribe({
          next: response => console.table(response),
          error: err => console.table(err),
          complete: () => console.log("Peticion de create finalizada")
        });
      }

    }
  }

  showPopup(){
    this.dialog.open(PopupComponent);
  }
}

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormField,
    ReactiveFormsModule,
    MatButton,
  ],
})
<<<<<<< HEAD
<<<<<<< HEAD
export class PopupComponent implements OnInit{
  invitationForm: FormGroup = new FormGroup({});

  readonly email = new FormControl(
    '',
    [Validators.email, Validators.required])

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.invitationForm = this.formBuilder.group({
      email: [
        '',
        [Validators.email, Validators.required]],
    })
  }
=======
export class PopupComponent{
  readonly email = new FormControl(
    '',
    [Validators.email, Validators.required])
>>>>>>> a25fd92 (merge)
=======
export class PopupComponent{
  readonly email = new FormControl(
    '',
    [Validators.email, Validators.required])
>>>>>>> 89aa58b (changes on interfaces)
}
