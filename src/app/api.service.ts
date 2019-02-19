import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {League} from './models/league';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiHost = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  getLeagues(): Observable<League[]> {
    return this.http.get<League[]>(`${this.apiHost}/leagues`);
  }
}
