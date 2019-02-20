import {Component, OnInit} from '@angular/core';
import {Player} from '../models/player';
import {ApiService} from '../api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  players: Player[] = [];
  loading = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.apiService.getTeamPlayers(id).then(
      players => {
        this.players = players;
        this.loading = !this.loading;
      }
    );
  }
}
