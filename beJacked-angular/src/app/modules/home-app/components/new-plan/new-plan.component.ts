import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.css'],
})
export class NewPlanComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewPlanComponent>,
    public authService: AuthService
  ) {}

  //tymaczasowo, typy planow maja byc pobierane z API
  planTypes = [
    { value: 'wendler', label: "Jim Wendler's 5/3/1" },
    { value: 'brakley', label: 'JM Brakley' },
    { value: 'custom', label: 'Your custom training plan' },
  ];

  //tez tymczasowo
  exercises = [
    {
      name: 'ex1',
      description: 'cwiczenie 1',
      muscles: 'Chest pressing ex',
      category: 'Chest',
    },
    {
      name: 'ex2',
      description: 'cwiczenie 2',
      muscles: 'Legs squat',
      category: 'Legs',
    },
    {
      name: 'ex3',
      description: 'cwiczenie 3',
      muscles: 'Hip thrusts',
      category: 'Glutes',
    },
    {
      name: 'ex4',
      description: 'cwiczenie 4',
      muscles: 'Pull upsex',
      category: 'Back',
    },
    {
      name: 'ex5',
      description: 'cwiczenie 5',
      muscles: 'Biceps cwiczeniw',
      category: 'Biceps',
    },
    {
      name: 'ex6',
      description: 'cwiczenie 6',
      muscles: 'Hummer curls',
      category: 'Forearms',
    },
    {
      name: 'ex7',
      description: 'cwiczenie 7',
      muscles: 'brzuszki',
      category: 'Abs',
    },
    {
      name: 'ex8',
      description: 'cwiczenie 8',
      muscles: 'tricpes extensions',
      category: 'Triceps',
    },
    {
      name: 'ex9',
      description: 'cwiczenie 9',
      muscles: 'Ccalves exercise',
      category: 'Calves',
    },
  ];

  planType: string = 'custom';

  planDetailsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
  });
  planTypeForm = new FormGroup({
    type: new FormControl(this.planType, [Validators.required]),
  });

  checkTypeofPlan() {
    switch (this.planTypeForm.controls.type.value) {
      case 'wendler':
        console.log('wendler, 5 workouts');
        break;
      case 'brakley':
        console.log('brakley, 4 workouts');

        break;
      default:
        console.log('cusrtom, set number of workouts workouts');

        break;
    }
  }

  check() {
    // console.log(this.planType)
    console.log(this.planDetailsForm.controls.name.value);
    console.log(this.planDetailsForm.controls.description.value);
    console.log(this.planTypeForm.controls.type.value);
  }

  ngOnInit(): void {}
}
