import { Component, inject } from '@angular/core';
import { AutoService } from '../../services/auto.service';
import { Auto } from '../../models/Auto';
import { AutosComponent } from '../autos/autos.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  private autoService = inject(AutoService);
  public listaAutos: Auto[] = [];
  public columnas: string[] = [
    'idAuto',
    'marca',
    'cilindraje',
    'color',
    'propietario',
    'estado',
    'acciones',
  ];

  obtenerListaAutos() {
    this.autoService.getListaAutos().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaAutos = data;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  constructor(private router: Router) {
    this.obtenerListaAutos();
  }

  getAutoProperty(auto: Auto, column: string): any {
    return auto[column as keyof Auto];
  }
  nuevo() {
    this.router.navigate(['/auto', 0]);
  }
  editar(objeto: Auto) {
    this.router.navigate(['/auto', objeto.idAuto]);
  }
  eliminar(objeto: Auto) {
    if (confirm('¿Está seguro de eliminar el registro?')) {
      this.autoService.eliminarAuto(objeto.idAuto).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.obtenerListaAutos();
          } else {
            alert('No se pudo eliminar el registro');
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
