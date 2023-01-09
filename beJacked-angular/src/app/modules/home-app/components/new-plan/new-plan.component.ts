import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Exercise } from 'src/app/shared/models/exercise';
import { ExerciseCategory } from 'src/app/shared/models/exercise-category';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PlanService } from 'src/app/shared/services/plan.service';

interface CategoryNode {
  exerciseCategory: string;
  children?: any;
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

  public categories: ExerciseCategory[] = [];
  public exercises: Exercise[] = [];
  // public DATA?: CategoryNode[];

  constructor(
    public dialogRef: MatDialogRef<NewPlanComponent>,
    public authService: AuthService,
    private fb: FormBuilder,
    public planService: PlanService
  ) {
    planService.getExerciseCategories().subscribe((categoryArray) => {
      categoryArray.forEach((cat) => this.categories.push(cat));
    });

    planService.getExercises().subscribe((exercisesArray) => {
      exercisesArray.forEach((ex) => this.exercises.push(ex));
    });
  }

  createTreeData() {
    let data: CategoryNode[] = [];
    // let arr: Object[] = this!.categories;
    this.categories.forEach((category: ExerciseCategory) => {
      console.log(category.name);
      let node: CategoryNode = {
        exerciseCategory: category.name,
        children: [] as Exercise[],
      };

      // console.log('przed for eachem: ' + this.exercises);
      this.exercises!.forEach((exercise: Exercise) => {
        // console.log('pred pushem: ' + exercise.name);
        // console.log('pred pushem: ' + exercise.exerciseCategory);
        // console.log('category.name:' + category.name);
        // console.log('exercise.exerciseCategory:' + exercise.exerciseCategory);

        if (category.name === exercise.exerciseCategory.name) {
          // console.log('pred pushem: ' + exercise);
          node.children?.push(exercise);
        }
      });
      // console.log(node);
      data.push(node);
    });

    // console.log(data!);
    this.dataSource.data = data;
  }

  //tymaczasowo, typy planow maja byc pobierane z API
  planTypes = [
    { value: 'wendler', label: "Jim Wendler's 5/3/1" },
    { value: 'brakley', label: 'JM Brakley' },
    { value: 'custom', label: 'Your custom training plan' },
  ];

  planType: string = 'custom';

  planDetailsForm!: FormGroup;
  planTypeForm!: FormGroup;
  planWorkoutsForm!: FormGroup;

  ngOnInit(): void {
    console.log('ngoiinit data');
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

  getWorkoutByIndex(index: number) {
    return this.workouts.controls[index] as FormGroup;
  }

  isSubmit() {
    return (
      this.planDetailsForm.valid &&
      this.planTypeForm.valid &&
      this.planWorkoutsForm.valid
    );
  }

  submit() {
    // console.log(this.name?.value);
    // console.log(this.description?.value);
    // console.log(this.type?.value);
    // console.log(this.workouts.value);
    // console.log(
    //   (this.workouts.controls[0] as FormGroup).controls['name'].value
    // );

    let plan = {
      name: this.name!.value,
      description: this.description!.value,
      programType: this.type!.value,
      username: this.authService.getUsernameFromToken(),
      workouts: this.workouts!.value,
    };
    console.log(plan);
    // console.log(this.exercises);
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
    let index: number = this.workouts.length;
    console.log(index);
    // const workoutArray = this.workouts;
    (this.workouts as FormArray).push(
      this.fb.group({
        name: this.fb.control('Workout ' + index, [Validators.required]),
        exercises: this.fb.array([], [Validators.required]),
      })
    );
  }

  addExerciseToWorkout(event: any, workoutIndex: number, ex: string) {
    console.log(
      'Adding exercise to ' +
        this.getWorkoutByIndex(workoutIndex).controls['name'].value
    );
    if (event.checked) {
      (this.workouts.controls[workoutIndex].get('exercises') as FormArray).push(
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
