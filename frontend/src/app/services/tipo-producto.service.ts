import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProductoI } from '../models/tipoProducto';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/tipoproductos`

  constructor(
    private http:HttpClient
  ) { }

  getAllTipoProducto():Observable<{tipoProducto:TipoProductoI[]}>{
    return this.http
      .get<{tipoProducto:TipoProductoI[]}>(this.base_path)
  }

  getOneTipoProducto(id: number):Observable<{tipoProducto:TipoProductoI[]}>{
    return this.http
      .get<{tipoProducto:TipoProductoI[]}>(`${this.base_path}/${id}`)
  }

  createTipoProducto(data: any):Observable<TipoProductoI>{
    return this.http.post<TipoProductoI>(this.base_path, data)
  }

  updateTipoProducto(id: number, data: any): Observable<TipoProductoI> {
    return this.http.patch<TipoProductoI>(`${this.base_path}/${id}`, data);
  }

  deleteTipoProducto(id: number): Observable<TipoProductoI> {
    return this.http.delete<TipoProductoI>(`${this.base_path}/${id}`);
  }
}
