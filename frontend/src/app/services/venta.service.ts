import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VentaI } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/ventas`

  constructor(
    private http:HttpClient
  ) { }

  getAllVenta():Observable<{venta:VentaI[]}>{
    return this.http
      .get<{venta:VentaI[]}>(this.base_path)
  }

  getOneVenta(id: number):Observable<{venta:VentaI[]}>{
    return this.http
      .get<{venta:VentaI[]}>(`${this.base_path}/${id}`)
  }



  createVenta(data: any):Observable<VentaI>{
    return this.http.post<VentaI>(this.base_path, data)
  }

  updateVenta(id: number, data: any): Observable<VentaI> {
    return this.http.put<VentaI>(`${this.base_path}/${id}`, data);
  }

  deleteVenta(id: number): Observable<VentaI> {
    return this.http.delete<VentaI>(`${this.base_path}/eliminar1/${id}`);
  }
}

