import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit {
  Nombre: string = 'Value 1';
  Descripcion: string = 'Value 2';
  FechaLimite: string = 'Value 3';

  constructor() { }

  ngOnInit(): void { }

  GuardarDatos(): void {
    this.Nombre = 'Button 1 clicked';
  }

  EliminarTarea(): void {
    this.Descripcion = 'Button 2 clicked';
  }

  FinalizarTarea(): void {
    this.FechaLimite = 'Button 3 clicked';
  }

}
