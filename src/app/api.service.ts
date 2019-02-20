import {Injectable} from '@angular/core';
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

  constructor(private http: HttpClient) {
  }

  getLeagues(): Promise<League[]> {
    return new Promise((resolve, reject) => {
      const leagues: League[] = [];
      this.http.get<League[]>(`${this.apiHost}/leagues`).subscribe((data: League[]) => {
        data.map((league: any) => {
          const newLeague: League = {
            id: league.idLeague,
            name: league.strLeague,
            nameAlt: league.strLeagueAlternate,
            sport: league.strSport
          };
          leagues.push(newLeague);
        });
        if (leagues.length > 0) {
          resolve(leagues);
        } else {
          reject('No results');
        }
      });
    });
  }

  getLeagueTeams(name: string): Promise<Team[]> {
    return new Promise((resolve, reject) => {
      const teams: Team[] = [];
      this.http.get<Team[]>(`${this.apiHost}/leagues/${name}/teams`).subscribe((data: Team[]) => {
        data.map((team: any) => {
          const newTeam: Team = {
            id: team.idTeam,
            name: team.strTeam,
            badge: team.strTeamBadge,
          };
          teams.push(newTeam);
        });
        if (teams.length > 0) {
          resolve(teams);
        } else {
          reject('No results');
        }
      });
    });
  }

  getTeamPlayers(id: number): Promise<Player[]> {
    return new Promise((resolve, reject) => {
      const players: Player[] = [];
      this.http.get<Player[]>(`${this.apiHost}/teams/${id}/players`).subscribe((data: Player[]) => {
          data.map((player: any) => {
            const newPlayer: Player = {
              id: player.idPlayer,
              teamId: player.idTeam,
              name: player.strPlayer,
              position: player.strPosition,
              birthplace: player.strBirthLocation,
              signingAmount: player.strSigning,
              thumbnail: player.strThumb,
              cutout: player.strCutout,
            };
            players.push(newPlayer);
          });
          if (players.length > 0) {
            resolve(players);
          } else {
            reject('No results');
          }
        });
    });
  }
}
