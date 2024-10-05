import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoProductoService } from '../../../services/tipo-producto.service';
import { TipoProductoI } from '../../../models/tipoProducto';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar-tipo-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './actualizar-tipo-producto.component.html',
  styleUrl: './actualizar-tipo-producto.component.css'
})
export class ActualizarTipoProductoComponent implements OnInit {

  public id: number = 0;
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tipoProductoService: TipoProductoService
  ) { }

  ngOnInit(): void {
    // Inicialización del formulario
    this.form = this.formBuilder.group({
      id: [''],
      nombreTipo: ['', [Validators.required]],
      activo: ['', [Validators.required]],
    });

    // Obtención del id del tipoProducto y los datos del tipoProducto
    this.id = this.route.snapshot.params['id'];
    this.getTipoProducto(this.id);
  }

  getTipoProducto(id: number){
    this.tipoProductoService.getOneTipoProducto(id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.form.patchValue(data.tipoProducto); // Carga los datos del cliente en el formulario
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

    const formValue: TipoProductoI = this.form.value;
    this.tipoProductoService.updateTipoProducto(this.id, formValue).subscribe(
      () => {
        this.router.navigateByUrl('tipoproductos');
      },
      err => {
        console.log(err);
        console.log('No se ha actualizado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/tipoproductos');
  }

  // Getters del formulario
/*   get idTipo() { return this.form.get('idTipo'); } */
  get nombreTipo() { return this.form.get('nombreTipo'); }
  get activo() { return this.form.get('activo'); }
}

