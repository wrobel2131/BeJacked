import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PlanService } from 'src/app/shared/services/plan.service';
import { PlansComponent } from '../plans/plans.component';

interface Exercise {
  name: string;
  description: string;
  muscles: string;
  category: string;
}

interface CategoryNode {
  category: string;
  children?: Exercise[];
}

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.css'],
})
export class NewPlanComponent implements OnInit {
  treeControl = new NestedTreeControl<CategoryNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<CategoryNode>();
  hasChild = (_: number, node: CategoryNode) =>
    !!node.children && node.children.length > 0;

  public categories?: any;
  // public DATA?: CategoryNode[];

  constructor(
    public dialogRef: MatDialogRef<NewPlanComponent>,
    public authService: AuthService,
    private fb: FormBuilder,
    public planService: PlanService
  ) {
    planService
      .getExerciseCategories()
      .subscribe((data) => (this.categories = data));
  }

  createTreeData() {
    let data: CategoryNode[] = [];
    let arr: Object[] = this!.categories;
    arr.forEach((category: any) => {
      let node: CategoryNode = {
        category: category.name,
        children: [] as Exercise[],
      };

      this.exercises.forEach((exercise) => {
        if (category.name === exercise.category) {
          console.log('pred pushem: ' + exercise);
          node.children?.push(exercise);
        }
      });
      console.log(node);
      data.push(node);
    });

    console.log(data!);
    this.dataSource.data = data;
  }

  //tymaczasowo, typy planow maja byc pobierane z API
  planTypes = [
    { value: 'wendler', label: "Jim Wendler's 5/3/1" },
    { value: 'brakley', label: 'JM Brakley' },
    { value: 'custom', label: 'Your custom training plan' },
  ];

  //tez tymczasowo
  exercises = [
    {
      name: 'ex0',
      description: 'cwiczenie 0',
      muscles: 'Cohp',
      category: 'shoulders',
    },
    {
      name: 'ex1',
      description: 'cwiczenie 1',
      muscles: 'Chest pressing ex',
      category: 'chest',
    },
    {
      name: 'ex2',
      description: 'cwiczenie 2',
      muscles: 'Legs squat',
      category: 'legs',
    },
    {
      name: 'ex3',
      description: 'cwiczenie 3',
      muscles: 'Hip thrusts',
      category: 'glute',
    },
    {
      name: 'ex4',
      description: 'cwiczenie 4',
      muscles: 'Pull upsex',
      category: 'back',
    },
    {
      name: 'ex5',
      description: 'cwiczenie 5',
      muscles: 'Biceps cwiczeniw',
      category: 'biceps',
    },
    {
      name: 'ex6',
      description: 'cwiczenie 6',
      muscles: 'Hummer curls',
      category: 'forearm_flexors',
    },
    {
      name: 'ex10',
      description: 'cwiczenie 10',
      muscles: 'forearms extensors',
      category: 'forearm_extensor',
    },
    {
      name: 'ex7',
      description: 'cwiczenie 7',
      muscles: 'brzuszki',
      category: 'abs',
    },
    {
      name: 'ex8',
      description: 'cwiczenie 8',
      muscles: 'tricpes extensions',
      category: 'triceps',
    },
    {
      name: 'ex9',
      description: 'cwiczenie 9',
      muscles: 'Ccalves exercise',
      category: 'calves',
    },
    {
      name: 'ex11',
      description: 'cwiczenie 11',
      muscles: 'cols',
      category: 'calves',
    },
    {
      name: 'ex12',
      description: 'cwiczenie 12',
      muscles: 'cols',
      category: 'back',
    },
  ];

  planType: string = 'custom';

  planDetailsForm!: FormGroup;
  planTypeForm!: FormGroup;
  planWorkoutsForm!: FormGroup;

  ngOnInit(): void {
    console.log('ngoiinit data');
    // this.createTreeData();
    this.planDetailsForm = this.fb.group({
      name: this.fb.control(null, [Validators.required]),
      description: null,
    });

    this.planTypeForm = this.fb.group({
      type: this.fb.control(this.planType, [Validators.required]),
    });

    this.planWorkoutsForm = this.fb.group({
      workouts: this.fb.array([], [Validators.required]),
    });
  }

  get workouts() {
    return this.planWorkoutsForm.get('workouts') as FormArray;
  }

  get name() {
    return this.planDetailsForm.get('name');
  }
  get description() {
    return this.planDetailsForm.get('description');
  }
  get type() {
    return this.planTypeForm.get('type');
  }

  check() {
    console.log(this.name?.value);
    console.log(this.description?.value);
    console.log(this.type?.value);
    console.log(this.workouts.value);

    // this.createTreeData();
  }

  // checkTypeofPlan() {
  //   switch (this.planDetailsForm.controls.type.value) {
  //     case 'wendler':
  //       console.log('wendler, 5 workouts');
  //       break;
  //     case 'brakley':
  //       console.log('brakley, 4 workouts');

  //       break;
  //     default:
  //       console.log('cusrtom, set number of workouts workouts');

  //       break;
  //   }
  // }

  addWorkout() {
    if (this.dataSource.data.length === 0) {
      console.log('creating data');
      this.createTreeData();
    }
    // const workoutArray = this.workouts;
    (this.workouts as FormArray).push(this.fb.array([]));
  }

  addExerciseToWorkout(event: any, workoutIndex: number, ex: string) {
    if (event.checked) {
      (this.workouts.controls[workoutIndex] as FormArray).push(
        this.fb.control(ex)
      );
    } else {
      console.log('remove exercis');
    }
  }

  removeExerciseFromWorkout(workoutIndex: number, ex: string) {
    console.log('remove exercis');
  }

  removeWorkout(index: number) {
    const workoutArray = this.workouts;
    (workoutArray as FormArray).removeAt(index);
  }
}

// interface FoodNode {
//   name: string;
//   children?: FoodNode[];
// }

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruit',
//     children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
//   },
//   {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
//       },
//       {
//         name: 'Orange',
//         children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
//       },
//     ],
//   },
// ];
