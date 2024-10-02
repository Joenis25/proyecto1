import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { ClienteI } from '../../../models/cliente';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css'] 
})
export class ActualizarClienteComponent implements OnInit {
  public id: number = 0;
  public form!: FormGroup; // Se inicializa en ngOnInit

  clienteService = inject(ClienteService);
  
  constructor(
    private formBuilder: FormBuilder, // Se inyecta en el constructor
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Inicialización del formulario
    this.form = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // Obtención del id del cliente y los datos del cliente
    this.id = this.route.snapshot.params['id'];
    this.getCliente(this.id);
  }

  getCliente(id: number) {
    this.clienteService.getOneCliente(id)
      .subscribe({
        next: (data) => {
          this.form.patchValue(data.cliente); // Carga los datos del cliente en el formulario
        },
        error: (err) => {
          console.error('Error obteniendo cliente:', err);
        }
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const formValue: ClienteI = this.form.value;
    this.clienteService.updateCliente(this.id, formValue).subscribe(
      () => {
        this.router.navigateByUrl('clientes');
      },
      err => {
        console.log(err);
        console.log('No se ha actualizado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/clientes');
  }

  // Getters del formulario
  get nombreCliente() { return this.form.get('nombre'); }
  get direccionCliente() { return this.form.get('direccion'); }
  get telefonoCliente() { return this.form.get('telefono'); }
  get correoCliente() { return this.form.get('correo'); }
  get passwordCliente() { return this.form.get('password'); }
}

