import {Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'i-dont-like-football';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    localStorage.setItem('LEAGUES', JSON.stringify(this.api.getLeagues()));
  }
}
