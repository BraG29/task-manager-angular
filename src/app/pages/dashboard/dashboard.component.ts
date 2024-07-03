import {AfterContentInit, Component, Inject, inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {IProject} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {jwtDecode} from "jwt-decode";
import {IJWTPayLoad} from "../../models/jwt-payload";
import {ProjectFormComponent} from "../../components/project-form/project-form.component";
import {ProjectUsersComponent} from "../../components/project-users/project-users.component";
import {ITask} from "../../models/task";
import {ProjectTasksComponent} from "../../components/project-tasks/project-tasks.component";
import {MatButton} from "@angular/material/button";
import {ILink} from "../../models/link";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MatFormField, MatInputModule} from "@angular/material/input";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {UserService} from "../../services/userServices/user.service";
import {IInvitation} from "../../models/invitation";
import Swal from 'sweetalert2';

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
export class DashboardComponent implements AfterContentInit {
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
    if (token) {
      this.tokenPayload = jwtDecode(token);
    }
  }

  ngAfterContentInit() {


    if (this.tokenPayload) {
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

  selectProject(project: IProject) {
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

  newProject() {
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

  saveChanges() {

    console.log('Entrando a Save Changes')

    let newProject: IProject = {
      id: null,
      description: this.projectFormComponent?.description?.value,
      title: this.projectFormComponent?.name?.value,
      tasks: this.projectTasksComponent?.getTasks(),
      links: this.selectedProject?.links,
      state: true
    }

    if (this.selectedProject) {
      console.log("Hay proyecto seleccionado")
      // @ts-ignore
      if (this.selectedProject?.id > 0) {
        console.log("Id es mayor a 0")
        newProject.id = this.selectedProject?.id;
        this.projectService.updateProject(newProject, this.userId).subscribe({
          next: response => {
            Swal.fire({
              icon: 'success',
              title: 'Proyecto Actualizado',
              text: `Se ha actualizado el proyecto: ${newProject?.title}`
            })
          },
          error: err => {
            Swal.fire({
              icon: 'error',
              title: 'Ha habido un error',
            })
          },
          complete: () => console.log('Peticion de update finalizada')
        });

      } else {
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
          next: response => {
            Swal.fire({
              icon: 'success',
              title: 'Proyecto Creado',
              text: `Se ha creado el proyecto: ${newProject?.title}`
            })
          },
          error: err => {
            Swal.fire({
              icon: 'error',
              title: 'Ha habido un error',
            })
          },
          complete: () => console.log("Peticion de create finalizada")
        });
      }

    }
  }

  showPopup() {
    this.dialog.open(PopupComponent, {
      data: {
        projectId: this.selectedProject?.id,
        userId: this.userId
      }
    });
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
    MatSelect,
    MatOption,
  ],
})
export class PopupComponent implements OnInit {
  invitationForm: FormGroup = new FormGroup({});
  roles = [
    {value: 1, viewValue: 'EDITOR'},
    {value: 2, viewValue: 'LECTOR'}
  ]

  readonly email = new FormControl(
    '',
    [Validators.email, Validators.required])

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.invitationForm = this.formBuilder.group({
      email: [
        '',
        [Validators.email, Validators.required]],
      role: ['', Validators.required]
    })
  }

  sendInvitation() {
    console.log(this.invitationForm.get('role')?.value);
    const invitation: IInvitation = {
      invitedEmail: this.invitationForm.get('email')?.value,
      ownerId: this.data.userId,
      projectId: this.data.projectId,
      role: this.invitationForm.get('role')?.value,
    }

    this.userService.inviteUser(invitation).subscribe({
      next: response =>{
        Swal.fire({
          icon: 'success',
          title: 'Se ha enviado la invitacion'
        })
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Ha habido un error',
          text: `${err.error.error}`
        })
      },
      complete: () => console.log('Peticion de invitacion finalizada')
    });
  }
}
