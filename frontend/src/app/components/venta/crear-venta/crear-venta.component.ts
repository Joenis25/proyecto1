import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../../services/venta.service';
import { Router } from '@angular/router';
import { VentaI } from '../../../models/venta';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-venta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-venta.component.html',
  styleUrl: './crear-venta.component.css'
})
export class CrearVentaComponent implements OnInit{

  public form: FormGroup; // Declaración de la propiedad form

  ventaService = inject(VentaService);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      fechaVenta: ['', [Validators.required]],
      subtotalVenta: ['', [Validators.required]],
      impuestosVenta: ['', [Validators.required]],
      descuentosVenta: ['', [Validators.required]],
      totalVenta: ['', [Validators.required]],
      activo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const formValue: VentaI = this.form.value;
    console.log(formValue);
    this.ventaService.createVenta(formValue).subscribe(
      () => {
        console.log(formValue);
        this.router.navigateByUrl('ventas');
      },
      (      err: any) => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/ventas');
  }

  // Asegúrate de que los nombres de los controles de formulario sean correctos
  get fechaVenta() { return this.form.get('fechaVenta'); }
  get subtotalVenta() { return this.form.get('subtotalVenta'); }
  get impuestosVenta() { return this.form.get('impuestosVenta'); }
  get descuentosVenta() { return this.form.get('descuentosVenta'); }
  get totalVenta() { return this.form.get('totalVenta'); }
  get activo() { return this.form.get('activo'); }

}
