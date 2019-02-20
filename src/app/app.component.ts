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
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getLeagues().then(leagues => {
      this.leagues = leagues;
      localStorage.setItem('LEAGUES', JSON.stringify(this.leagues));
    });
  }
}
