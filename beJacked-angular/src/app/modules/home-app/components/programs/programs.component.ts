import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'programType', 'action'];
  dataSource: any;
  pageSizeOptions: number[] = [];
  pageSize: number = 5;
  viewMode: boolean = true;

  constructor(
    public dialog: MatDialog,
    private programService: ProgramService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.ngxService.start(); // start the spinner

    this.getPrograms();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['viewMode']) {
      console.log('changes');
      this.getPrograms();
    }
  }

  switchView() {
    this.viewMode = !this.viewMode;
    this.getPrograms();
  }

  openAddProgramDialog(): void {
    const dialogRef = this.dialog.open(NewProgramComponent, {
      height: '900px',
      width: '80%',
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator?.firstPage();
    }
  }

  getPrograms() {
    this.programService.getPrograms().subscribe(
      (data) => {
        this.programs = data;
        this.dataSource = new MatTableDataSource<Program>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item: any, property: any) => {
          switch (property) {
            case 'programType':
              return item.programType.name;

            default:
              return item[property];
          }
        };
        this.pageSizeOptions = [5, 10, 20, 50, 100, data.length];
        this.pageSize = this.pageSizeOptions[0];

        console.log(this.dataSource);
        this.ngxService.stop();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
