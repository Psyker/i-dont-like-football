import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {ApiService} from '../api.service';
import {League} from '../models/league';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search = new FormControl('');
  leagues: League[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() { }

  searchHandler(): void {
    console.log(JSON.parse(localStorage.getItem('LEAGUES')).source);
    this.leagues = JSON.parse(localStorage.getItem('LEAGUES')).filter((league: League) => {
      if (league.name.includes(this.search.value)) {
        return league;
      }
    });
  }

}
