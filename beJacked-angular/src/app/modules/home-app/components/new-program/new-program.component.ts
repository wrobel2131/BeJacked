import { NestedTreeControl } from '@angular/cdk/tree';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Exercise } from 'src/app/shared/models/exercise';
import { ExerciseCategory } from 'src/app/shared/models/exercise-category';
import { ProgramType } from 'src/app/shared/models/program-type';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ErrorMessageComponent } from 'src/app/shared/dialogs/error-message/error-message.component';
import { SuccessMessageComponent } from 'src/app/shared/dialogs/success-message/success-message.component';

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
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class NewProgramComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  @ViewChildren(MatSort) sorts!: QueryList<MatSort>;
  @ViewChildren(MatPaginator) paginators!: QueryList<MatPaginator>;

  dataSources: MatTableDataSource<Exercise>[] = [];
  // sorts: MatSort[] = [];
  // paginators: MatPaginator[] = [];

  public pageEvent: PageEvent;
  public categories: ExerciseCategory[] = [];
  public exercises: Exercise[] = [];
  public program?: programToBackend;
  public programTypes: ProgramType[] = [];

  programType: string = 'custom';

  programDetailsForm!: FormGroup;
  programTypeForm!: FormGroup;
  programWorkoutsForm!: FormGroup;

  displayedColumns: string[] = ['select', 'id', 'name', 'exerciseCategory'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement?: Exercise | null;
  pageSizeOptions: number[] = [];
  pageSize: number = 5;

  constructor(
    public dialogRef: MatDialogRef<NewProgramComponent>,
    public dialog: MatDialog,
    public authService: AuthService,
    private fb: FormBuilder,
    public programService: ProgramService
  ) {
    programService.getExerciseCategories().subscribe((categoryArray) => {
      this.categories = categoryArray;
    });

    programService.getProgramTypes().subscribe((types) => {
      types.forEach((type) => this.programTypes.push(type));
    });
    this.pageEvent = { pageIndex: 0, pageSize: 5, length: 0 };
  }

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

  openErrorDialog(error: string): void {
    const errorRef = this.dialog.open(ErrorMessageComponent, {
      height: '400px',
      width: '400px',
      data: error,
    });
  }

  openSuccessDialog(success: string): void {
    const successRef = this.dialog.open(SuccessMessageComponent, {
      height: '400px',
      width: '400px',
      data: success,
    });
  }

  applyFilter(event: Event, index: number) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSources[index].filter = filterValue.trim().toLowerCase();

    if (this.dataSources[index].paginator) {
      this.dataSources[index].paginator?.firstPage();
    }
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
  isProgramReady() {
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
      this.programService.addProgram(this.program).subscribe(
        (data) => {
          console.log(data);
          this.dialogRef.close();
          let succ = 'Program has been created successfully!';
          this.openSuccessDialog(succ);
        },
        (error) => {
          this.openErrorDialog(error);
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
    let index: number = this.workouts.length;

    this.programService.getExercises().subscribe((exercisesArray) => {
      this.exercises = exercisesArray;

      let source = new MatTableDataSource<Exercise>(exercisesArray);
      // source.sort = this.sorts.get(index - 1);
      this.dataSources.push(source);
      this.paginators.forEach((pag, i) => {
        this.dataSources[i].paginator = pag;
      });

      this.sorts.forEach((sort, i) => {
        this.dataSources[i].sort = sort;
        this.dataSources[i].sortingDataAccessor = (
          item: any,
          property: any
        ) => {
          switch (property) {
            case 'exerciseCategory':
              return item.exerciseCategory.name;

            default:
              return item[property];
          }
        };
      });
      console.log(this.dataSources[index]);

      this.pageSizeOptions = [5, 10, 20, 50, 100, exercisesArray.length];
      this.pageSize = this.pageSizeOptions[0];
    });
    console.log(index);
    // const workoutArray = this.workouts;
    (this.workouts as FormArray).push(
      this.fb.group({
        name: this.fb.control('Workout ' + index, [Validators.required]),
        exercises: this.fb.array([], [Validators.required]),
      })
    );
  }

  addRemoveExerciseToWorkout(event: any, workoutIndex: number, ex: string) {
    if (event.checked) {
      (this.workouts.controls[workoutIndex].get('exercises') as FormArray).push(
        this.fb.control(ex)
      );
    } else {
      (
        this.workouts.controls[workoutIndex].get('exercises') as FormArray
      ).removeAt(
        (
          this.workouts.controls[workoutIndex].get('exercises') as FormArray
        ).value.findIndex((el: { value: string }) => el.value === ex)
      );
    }
  }

  removeWorkout(index: number) {
    const workoutArray = this.workouts;
    (workoutArray as FormArray).removeAt(index);
    this.dataSources.splice(index, 1);
  }

  selection = new SelectionModel<Exercise>(true, []);
}
