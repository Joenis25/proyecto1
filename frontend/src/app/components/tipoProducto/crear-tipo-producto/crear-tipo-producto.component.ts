import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoProductoService } from '../../../services/tipo-producto.service';
import { Router } from '@angular/router';
import { TipoProductoI } from '../../../models/tipoProducto';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-crear-tipo-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-tipo-producto.component.html',
  styleUrl: './crear-tipo-producto.component.css'
})
export class CrearTipoProductoComponent implements OnInit {

  public form: FormGroup; // Declaración de la propiedad form

  tipoProductoService = inject(TipoProductoService);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      nomnreTipo: ['', [Validators.required]],
      activo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const formValue: TipoProductoI = this.form.value;
    console.log(formValue);
    this.tipoProductoService.createTipoProducto(formValue).subscribe(
      () => {
        console.log(formValue);
        this.router.navigateByUrl('tipoproductos');
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/tipoproductos');
  }

  // Asegúrate de que los nombres de los controles de formulario sean correctos
  get id() { return this.form.get('id'); }
  get nombreTipo() { return this.form.get('nombreTipo'); }
  get activo() { return this.form.get('activo'); }
}
