import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPlanComponent } from '../new-plan/new-plan.component';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
})
export class PlansComponent implements OnInit {
  openAddProgramDialog(): void {
    this.dialog.open(NewPlanComponent, {
      height: '900px',
      width: '1000px',
      // closeOnNavigation: true
    });
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
}
