import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Program } from 'src/app/shared/models/program';
import { ProgramService } from 'src/app/shared/services/program.service';
import { NewProgramComponent } from '../new-program/new-program.component';
import { ProgramDetailsComponent } from '../program-details/program-details.component';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css'],
})
export class ProgramsComponent implements OnInit {
  public programs?: Program[];

  openAddProgramDialog(): void {
    const dialogRef = this.dialog.open(NewProgramComponent, {
      height: '900px',
      width: '80%',
      // closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getPrograms();
    });
  }

  openProgramDetailsDialog(program: Program): void {
    const dialogRef = this.dialog.open(ProgramDetailsComponent, {
      height: '900px',
      width: '80%',
      data: program,
      // closeOnNavigation: true
    });

    console.log(program);
    dialogRef.afterClosed().subscribe((res) => {
      this.getPrograms();
    });
  }

  constructor(
    public dialog: MatDialog,
    private programService: ProgramService
  ) {}

  getPrograms() {
    this.programService.getPrograms().subscribe(
      (data) => {
        this.programs = data;
        // console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.getPrograms();
  }
}
