import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router';
import { ProductoI } from '../../../models/producto';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent implements OnInit{

  public form: FormGroup; // Declaración de la propiedad form

  productoService = inject(ProductoService);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      nombreProducto: ['', [Validators.required]],
      marcaProducto: ['', [Validators.required]],
      precioProducto: ['', [Validators.required]],
      stockMin: ['', [Validators.required]],
      cantidadProducto: ['', [Validators.required]],
      activo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const formValue: ProductoI = this.form.value;
    console.log(formValue);
    this.productoService.createProducto(formValue).subscribe(
      () => {
        console.log(formValue);
        this.router.navigateByUrl('productos');
      },
      (      err: any) => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/productos');
  }

  // Asegúrate de que los nombres de los controles de formulario sean correctos
  get nombreProducto() { return this.form.get('nombreProducto'); }
  get marcaProducto() { return this.form.get('marcaProducto'); }
  get precioProducto() { return this.form.get('precioProducto'); }
  get stockMin() { return this.form.get('stockMin'); }
  get cantidadProducto() { return this.form.get('cantidadProducto'); }
  get activo() { return this.form.get('activo'); }
}
