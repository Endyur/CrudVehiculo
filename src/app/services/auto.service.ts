import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AppSettings } from '../settings/appsettings';
import { Auto } from '../models/Auto';
import { ResponseApi } from '../models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  private http = inject(HttpClient);
  private Url:string= AppSettings.apiUrl+"Auto";
  constructor() { }

  getListaAutos(){
    return this.http.get<Auto[]>(this.Url);
    
  }
  obtenerAuto(idAuto:number){
    return this.http.get<Auto>(`${this.Url}/${idAuto}`);
  }
  guardarAuto(objeto:Auto){
    return this.http.post<ResponseApi>(this.Url,objeto);
  }
  editarAuto(objeto:Auto){
    return this.http.put<ResponseApi>(this.Url,objeto);
  }
  eliminarAuto(idAuto:number){
    return this.http.delete<ResponseApi>(`${this.Url}/${idAuto}`);
  }
}
