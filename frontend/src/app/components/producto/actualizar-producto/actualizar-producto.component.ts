import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { ProductoI } from '../../../models/producto';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './actualizar-producto.component.html',
  styleUrl: './actualizar-producto.component.css'
})
export class ActualizarProductoComponent implements OnInit{

  public id: number = 0;
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    // Inicialización del formulario
    this.form = this.formBuilder.group({
      nombreProducto: [''],
      marcaProducto: ['', [Validators.required]],
      precioProducto: ['', [Validators.required]],
      stockMin: ['', [Validators.required]],
      cantidadProducto: ['', [Validators.required]],
      tipoProductoId: ['', [Validators.required]],
      activo: ['', [Validators.required]],
    });

    // Obtención del id del tipoProducto y los datos del Producto
    this.id = this.route.snapshot.params['id'];
    this.getProducto(this.id);
  }

  getProducto(id: number){
    this.productoService.getOneProducto(id)
      .subscribe({
        next: (data) => {
          this.form.patchValue(data.producto); // Carga los datos del cliente en el formulario
        },
        error: (err) => {
          console.error('Error obteniendo tipoProducto:', err);
        }
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const formValue: ProductoI = this.form.value;
    this.productoService.updateProducto(this.id, formValue).subscribe(
      () => {
        this.router.navigateByUrl('productos');
      },
      err => {
        console.log(err);
        console.log('No se ha actualizado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/productos');
  }

  // Getters del formulario
  get nombreProducto() { return this.form.get('nombreProducto'); }
  get marcaProducto() { return this.form.get('marcaProducto'); }
  get precioProducto() { return this.form.get('precioProducto'); }
  get stockMin() { return this.form.get('stockMin'); }
  get cantidadProducto() { return this.form.get('cantidadProducto'); }
  get tipoProductoId() { return this.form.get('tipoProductoId'); }
  get activo() { return this.form.get('activo'); }

}
