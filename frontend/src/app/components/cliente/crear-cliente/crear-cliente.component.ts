import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../services/cliente.service';
import { Router } from '@angular/router';
import { ClienteI } from '../../../models/cliente';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'] // Asegúrate de que sea 'styleUrls', no 'styleUrl'
})
export class CrearClienteComponent implements OnInit {

  public form: FormGroup; // Declaración de la propiedad form

  clienteService = inject(ClienteService);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      nombreCliente: ['', [Validators.required]],
      direccionCliente: ['', [Validators.required]],
      telefonoCliente: ['', [Validators.required]],
      correoCliente: ['', [Validators.required]],
      passwordCliente: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const formValue: ClienteI = this.form.value;
    console.log(formValue);
    this.clienteService.createCliente(formValue).subscribe(
      () => {
        console.log(formValue);
        this.router.navigateByUrl('clientes');
      },
      err => {
        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/clientes');
  }

  // Asegúrate de que los nombres de los controles de formulario sean correctos
  get nombreCliente() { return this.form.get('nombreCliente'); }
  get direccionCliente() { return this.form.get('direccionCliente'); }
  get telefonoCliente() { return this.form.get('telefonoCliente'); }
  get correoCliente() { return this.form.get('correoCliente'); }
  get passwordCliente() { return this.form.get('passwordCliente'); }
}
