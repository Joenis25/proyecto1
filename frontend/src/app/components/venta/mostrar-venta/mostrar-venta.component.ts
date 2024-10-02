import { Component, OnInit } from '@angular/core';
import { ProductoI } from '../../../models/producto';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProductoService } from '../../../services/producto.service'
import { VentaI } from '../../../models/venta';
import { VentaService } from '../../../services/venta.service';

@Component({
  selector: 'app-mostrar-venta',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './mostrar-venta.component.html',
  styleUrl: './mostrar-venta.component.css'
})
export class MostrarVentaComponent implements OnInit{
  public ventas:VentaI[] = []
  constructor(
    private ventaService: VentaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarVentas()
  }

  mostrarVentas() {
    this.ventaService.getAllVenta()
      .subscribe({
        next: (data) => {
          this.ventas = data.venta
           console.log(data)
        }
      })
  }

  eliminar(id: number): void{
    this.router.navigateByUrl('/ventas');
    this.ventaService.deleteVenta(id).subscribe(
      () => {
        // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Venta Eliminado', life:5000});
        this.mostrarVentas();
      },
      err => {
        console.log('error')
        this.router.navigateByUrl('/ventas');

      }
    );
  }

}
