import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Program } from 'src/app/shared/models/program';
import { ProgramService } from 'src/app/shared/services/program.service';
import { NewProgramComponent } from '../new-program/new-program.component';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css'],
})
export class ProgramsComponent implements OnInit {
  public programs?: Program[];

  openAddProgramDialog(): void {
    this.dialog.open(NewProgramComponent, {
      height: '900px',
      width: '80%',
      // closeOnNavigation: true
    });
  }

  constructor(
    public dialog: MatDialog,
    private programService: ProgramService
  ) {}

  getPrograms() {
    this.programService.getprograms().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
