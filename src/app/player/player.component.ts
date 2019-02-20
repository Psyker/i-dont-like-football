import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../models/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;
  playerImage: string;

  constructor() { }

  ngOnInit() {
    if (this.player.cutout) {
      this.playerImage = this.player.cutout;
    } else if (this.player.thumbnail) {
      this.playerImage = this.player.thumbnail;
    } else {
      this.playerImage = 'https://via.placeholder.com/150';
    }
  }
}
