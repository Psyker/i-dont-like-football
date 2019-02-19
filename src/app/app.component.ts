import {Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {League} from './models/league';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  leagues: League[] = [];

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getLeagues().subscribe(
      (data: League[]) => {
        data.map((league: any) => {
          const newLeague: League = {
            id: league.idLeague,
            name: league.strLeague,
            nameAlt: league.strLeagueAlternate,
            sport: league.strSport
          };
          this.leagues.push(newLeague);
        });
        localStorage.setItem('LEAGUES', JSON.stringify(this.leagues));
      }
    );
  }
}
