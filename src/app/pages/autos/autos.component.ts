import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Auto } from '../../models/Auto';
import { AutoService } from '../../services/auto.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NavbarComponent
  ],
  templateUrl: './autos.component.html',
  styleUrl: './autos.component.css',
})
export class AutosComponent implements OnInit {
  @Input('id') idAuto!: number;
  private autoService = inject(AutoService);
  public formBuild = inject(FormBuilder);

  public formAuto: FormGroup = this.formBuild.group({
    marca: [''],
    color: [''],
    cilindraje: [0],
    propietario: [''],
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    
    if (this.idAuto != 0) {
      this.autoService.obtenerAuto(this.idAuto).subscribe({
        next: (data) => {
          this.formAuto.patchValue({
            marca: data.marca,
            color: data.color,
            cilindraje: data.cilindraje,
            propietario: data.propietario,
          });
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }

  guardar() {
    const objeto: Auto = {
      idAuto: this.idAuto,
      marca: this.formAuto.value.marca,
      color: this.formAuto.value.color,
      cilindraje: this.formAuto.value.cilindraje,
      propietario: this.formAuto.value.propietario,
      estado: 0,
    };

    if (this.idAuto == 0) {
      this.autoService.guardarAuto(objeto).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.router.navigate(['/']);
          } else {
            alert('Error al crear');
          }
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    } else {
      this.autoService.editarAuto(objeto).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.router.navigate(['/']);
          } else {
            alert('Error al editar');
          }
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }

  volver() {
    this.router.navigate(['/']);
  }
}
