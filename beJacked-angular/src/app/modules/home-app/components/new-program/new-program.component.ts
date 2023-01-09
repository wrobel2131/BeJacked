import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ProgramService } from 'src/app/shared/services/program.service';

interface CategoryNode {
  exerciseCategory: string;
  children?: any;
}

interface WorkoutToBackend {
  name: string;
  exercises: string[];
}

interface programToBackend {
  name: string;
  description: string;
  programType: string;
  username: string;
  workouts: WorkoutToBackend[];
}

@Component({
  selector: 'app-new-program',
  templateUrl: './new-program.component.html',
  styleUrls: ['./new-program.component.css'],
})
export class NewProgramComponent implements OnInit {
  treeControl = new NestedTreeControl<CategoryNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<CategoryNode>();
  hasChild = (_: number, node: CategoryNode) =>
    !!node.children && node.children.length > 0;

  public categories: ExerciseCategory[] = [];
  public exercises: Exercise[] = [];
  public program?: programToBackend;

  displayedColumns() {
    return this.program!.workouts.map((w) => w.name);
  }

  constructor(
    public dialogRef: MatDialogRef<NewProgramComponent>,
    public authService: AuthService,
    private fb: FormBuilder,
    public programService: ProgramService
  ) {
    programService.getExerciseCategories().subscribe((categoryArray) => {
      categoryArray.forEach((cat) => this.categories.push(cat));
    });

    programService.getExercises().subscribe((exercisesArray) => {
      exercisesArray.forEach((ex) => this.exercises.push(ex));
    });
  }

  createTreeData() {
    let data: CategoryNode[] = [];
    this.categories.forEach((category: ExerciseCategory) => {
      console.log(category.name);
      let node: CategoryNode = {
        exerciseCategory: category.name,
        children: [] as Exercise[],
      };

      this.exercises!.forEach((exercise: Exercise) => {
        if (category.name === exercise.exerciseCategory.name) {
          node.children?.push(exercise);
        }
      });
      data.push(node);
    });

    this.dataSource.data = data;
  }

  //tymaczasowo, typy programow maja byc pobierane z API
  programTypes = [
    { value: 'wendler', label: "Jim Wendler's 5/3/1" },
    { value: 'brakley', label: 'JM Brakley' },
    { value: 'custom', label: 'Your custom training program' },
  ];

  programType: string = 'custom';

  programDetailsForm!: FormGroup;
  programTypeForm!: FormGroup;
  programWorkoutsForm!: FormGroup;

  ngOnInit(): void {
    console.log('ngoiinit data');
    this.programDetailsForm = this.fb.group({
      name: this.fb.control(null, [Validators.required]),
      description: null,
    });

    this.programTypeForm = this.fb.group({
      type: this.fb.control(this.programType, [Validators.required]),
    });

    this.programWorkoutsForm = this.fb.group({
      workouts: this.fb.array([], [Validators.required]),
    });
  }

  get workouts() {
    return this.programWorkoutsForm.get('workouts') as FormArray;
  }

  get name() {
    return this.programDetailsForm.get('name');
  }
  get description() {
    return this.programDetailsForm.get('description');
  }
  get type() {
    return this.programTypeForm.get('type');
  }

  getWorkoutByIndex(index: number) {
    return this.workouts.controls[index] as FormGroup;
  }
  isprogramReady() {
    if (this.program !== undefined) {
      return true;
    }
    return false;
  }

  isSubmit() {
    return (
      this.programDetailsForm.valid &&
      this.programTypeForm.valid &&
      this.programWorkoutsForm.valid
    );
  }

  buildSubmitObject() {
    if (this.isSubmit()) {
      this.program = {
        name: this?.name!.value,
        description: this?.description!.value,
        programType: this?.type!.value,
        username: this?.authService.getUsernameFromToken(),
        workouts: this?.workouts!.value,
      };
      console.log('object built');
    }
  }

  deleteSubmitObject() {
    this.program = undefined;
  }

  submit() {
    console.log(this.program);
    if (this.program) {
      this.programService.addprogram(this.program).subscribe(
        (data) => {
          console.log(data);
          this.dialogRef.close();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  // checkTypeofprogram() {
  //   switch (this.programDetailsForm.controls.type.value) {
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
