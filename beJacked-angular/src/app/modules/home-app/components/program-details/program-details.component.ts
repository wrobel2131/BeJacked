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
  // @Input() program?: Program;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Program,
    public dialogRef: MatDialogRef<ProgramDetailsComponent>,
    private ngxService: NgxUiLoaderService
  ) {}

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

  ngOnInit(): void {
    this.ngxService.start(); // start the spinner
    this.ngxService.stop();

    console.log(this.data);
  }
}
