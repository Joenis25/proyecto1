import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from '../../../services/venta.service';
import { VentaI } from '../../../models/venta';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar-venta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './actualizar-venta.component.html',
  styleUrl: './actualizar-venta.component.css'
})
export class ActualizarVentaComponent implements OnInit{
  public id: number = 0;
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ventaService: VentaService
  ) { }

  ngOnInit(): void {
    // Inicialización del formulario
    this.form = this.formBuilder.group({
      fechaVenta: [''],
      subtotalVenta: ['', [Validators.required]],
      impuestosVenta: ['', [Validators.required]],
      descuentosVenta: ['', [Validators.required]],
      totalVenta: ['', [Validators.required]],
      activo: ['', [Validators.required]],
    });

    // Obtención del id del Venta y los datos del Producto
    this.id = this.route.snapshot.params['id'];
    this.getVenta(this.id);
  }

  getVenta(id: number){
    this.ventaService.getOneVenta(id)
      .subscribe({
        next: (data) => {
          this.form.patchValue(data.venta); // Carga los datos del venta en el formulario
        },
        error: (err) => {
          console.error('Error obteniendo venta:', err);
        }
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const formValue: VentaI = this.form.value;
    this.ventaService.updateVenta(this.id, formValue).subscribe(
      () => {
        this.router.navigateByUrl('ventas');
      },
      err => {
        console.log(err);
        console.log('No se ha actualizado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/ventas');
  }

  // Getters del formulario
  get fechaVenta() { return this.form.get('fechaVenta'); }
  get subtotalVenta() { return this.form.get('subtotalVenta'); }
  get impuestosVenta() { return this.form.get('impuestosVenta'); }
  get descuentosVenta() { return this.form.get('descuentosVenta'); }
  get totalVenta() { return this.form.get('totalVenta'); }
  get activo() { return this.form.get('activo'); }

}
