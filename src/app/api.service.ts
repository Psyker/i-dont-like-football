import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {League} from './models/league';
import {Observable} from 'rxjs';
import {Team} from './models/team';
import {Player} from './models/player';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiHost = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }

  getLeagues(): Observable<League[]> {
    return this.http.get<League[]>(`${this.apiHost}/leagues`);
  }

  getLeagueTeams(name: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiHost}/leagues/${name}/teams`);
  }

  getTeamPlayers(id: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiHost}/teams/${id}/players`);
  }
}
