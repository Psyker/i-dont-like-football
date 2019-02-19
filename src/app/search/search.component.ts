import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApiService} from '../api.service';
import {League} from '../models/league';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Team} from '../models/team';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search = new FormControl('');
  leagueNames: string[] = [];
  filteredOptions: Observable<string[]>;
  teams: Team[] = [];
  loading = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.leagueNames = JSON.parse(localStorage.getItem('LEAGUES')).map((league: League) => league.name);
    this.filteredOptions = this.search.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.leagueNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  searchHandler(): void {
    this.loading = true;
    this.teams = [];
    this.apiService.getLeagueTeams(this.search.value)
      .subscribe((data: Team[]) => data.map((team: any) => {
        const newTeam: Team = {
          id: team.idTeam,
          name: team.strTeam,
          badge: team.strTeamBadge,
        };
        this.teams.push(newTeam);
        this.loading = false;
      }));
  }
}
