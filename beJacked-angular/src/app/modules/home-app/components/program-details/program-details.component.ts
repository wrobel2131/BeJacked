import { Component, OnInit, Input, Inject } from '@angular/core';
import { Program } from 'src/app/shared/models/program';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css'],
})
export class ProgramDetailsComponent implements OnInit {
  id = 'vcBig73ojpE';
  playerVars = {
    cc_lang_preg: 'en',
  };
  player?: YT.Player;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Program,
    public dialogRef: MatDialogRef<ProgramDetailsComponent>,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {}

  savePlayer(player: any) {
    this.player = player;
    console.log('player instance', player);
  }

  onStateChange(event: any) {
    console.log('player state', event.data);
  }

  get programId() {
    return this.data.id;
  }
  get user() {
    return this.data.user;
  }

  get programName() {
    return this.data.name;
  }

  get programDescription() {
    return this.data.description;
  }

  get workouts() {
    return this.data.workouts;
  }
}
