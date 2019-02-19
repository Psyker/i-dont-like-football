import { Component, OnInit } from '@angular/core';
import {Player} from '../models/player';
import {ApiService} from '../api.service';
import { ActivatedRoute } from '@angular/router';

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
    this.players = [];
    const id = +this.route.snapshot.paramMap.get('id');
    this.apiService.getTeamPlayers(id)
      .subscribe((data: Player[]) => data.map((player: any) => {
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
        this.players.push(newPlayer);
        this.loading = false;
      }));
  }

}
