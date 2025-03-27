import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MenuItem } from '../interface/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {

  apiURL: string = environment.apiURLBase + '/config';

  constructor(
    private http: HttpClient
  ) { }

  getMenu(): Observable<MenuItem[]> {    
    return this.http.get<MenuItem[]>(`${this.apiURL}/menu_item`);
  }
}
