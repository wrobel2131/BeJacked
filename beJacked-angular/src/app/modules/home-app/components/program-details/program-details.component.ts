import {
  Component,
  OnInit,
  Input,
  Inject,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Program } from 'src/app/shared/models/program';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { filter } from 'rxjs';
import { LogsService } from 'src/app/shared/services/logs.service';
import { Log } from 'src/app/shared/models/log';
import { Chart } from 'chart.js';
import { MatExpansionPanel } from '@angular/material/expansion';

interface logDTO {
  setNumber: number;
  weight: number;
  reps: number;
  rpe: number;
  tempo: string;
  exerciseName: string;
  workoutId: number;
  date: string;
}

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css'],
})
export class ProgramDetailsComponent implements OnInit, AfterViewInit {
  @ViewChildren(MatExpansionPanel)
  expansionPanels?: QueryList<MatExpansionPanel>;

  exerciseId?: number;
  workoutId?: number;

  logs: Log[] = [];
  public chart: any;

  id = 'vcBig73ojpE';
  playerVars = {
    cc_lang_preg: 'en',
  };
  player?: YT.Player;

  datesChart: string[] = [];
  dataChart: string[] = [];

  results!: FormGroup;
  allowNumberXRegex = '^([0-9]*|x|X)$';
  weightRegex = '^(0|[1-9][0-9]{0,3}|2000)$';
  rpeRegex = '^(0|[1-9]|10)$';
  repsRegex = '^(0|[1-9][0-9]*)$';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Program,
    public dialogRef: MatDialogRef<ProgramDetailsComponent>,
    private logsService: LogsService,
    private fb: FormBuilder,
    private elementRef: ElementRef
  ) {}
  ngAfterViewInit(): void {
    console.log('after view init');
  }

  ngOnInit(): void {
    // this.createChart();
    console.log(this.chart);
    this.results = this.fb.group({
      weight: this.fb.control(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(2000),
        Validators.pattern(/^(0|[1-9][0-9]{0,3}|2000)[^-]*$/),
      ]),
      reps: this.fb.control(null, [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^(0|[1-9][0-9]*)[^-]*$/),
      ]),
      rpe: this.fb.control(null, [
        Validators.min(0),
        Validators.max(10),
        Validators.pattern(/^(0|[1-9]|10)(\.0*5)?[^-]*$/),
      ]),
      tempo: this.fb.group({
        eccentric: this.fb.control(null, [
          Validators.pattern(/^(0|[1-9][0-9]*)[^-]*$/),
        ]),
        bottom: this.fb.control(null, [
          Validators.pattern(/^(0|([1-9][0-9]*)|x|X)$/),
        ]),
        concentric: this.fb.control(null, [
          Validators.pattern(/^(0|([1-9][0-9]*)|x|X)$/),
        ]),
        top: this.fb.control(null, [
          Validators.pattern(/^(0|[1-9][0-9]*)[^-]*$/),
        ]),
      }),
    });

    this.results.controls['weight'].valueChanges.subscribe((val) => {
      if (val > 2000) {
        this.results.controls['weight'].setValue(2000);
      }
      if (val < 0) {
        this.results.controls['weight'].setValue(0);
      }
    });

    this.results.controls['reps'].valueChanges.subscribe((val) => {
      if (val < 0) {
        this.results.controls['reps'].setValue(0);
      }
    });

    this.results.controls['rpe'].valueChanges.subscribe((val) => {
      if (val > 10) {
        this.results.controls['rpe'].setValue(10);
      }
      if (val < 0) {
        this.results.controls['rpe'].setValue(0);
      }
    });

    (this.results.controls['tempo'] as FormGroup).controls[
      'eccentric'
    ].valueChanges.subscribe((val) => {
      if (val < 0) {
        (this.results.controls['tempo'] as FormGroup).controls[
          'eccentric'
        ].setValue(0);
      }
    });

    (this.results.controls['tempo'] as FormGroup).controls[
      'top'
    ].valueChanges.subscribe((val) => {
      if (val < 0) {
        (this.results.controls['tempo'] as FormGroup).controls['top'].setValue(
          0
        );
        console.log('top');
      }
    });
  }

  closeExpansionPanels() {
    console.log('closing panels');
    this.expansionPanels?.forEach((panel) => panel.close());
  }

  destroyChart() {
    console.log('destroy chart');
    this.chart.destroy();
    this.chart = undefined;
    console.log(this.chart);
    this.dataChart = [];
    this.datesChart = [];
  }

  setExerciseWorkout(workoutId?: number, exerciseId?: number) {
    this.workoutId = workoutId;
    this.exerciseId = exerciseId;
    this.getTodaysLogs(workoutId, exerciseId);
    // this.datesChart.push('cos');
    // this.datesChart.push('ktos');
    // this.dataChart.push(String(workoutId));
    // this.dataChart.push(String(exerciseId));
  }

  createChart(event: any) {
    if (this.chart) {
      this.destroyChart();
    }
    this.dataChart.push(String(this.exerciseId));
    this.dataChart.push(String(this.workoutId));
    this.datesChart.push('exerciseId');
    this.datesChart.push('workoutId');

    console.log('createChart');
    console.log(this.chart);
    console.log(this.dataChart);
    console.log(this.datesChart);

    if (!this.chart) {
      console.log('cretaing new chart');
      this.chart = new Chart('logs-chart', {
        type: 'bar', //this denotes tha type of chart

        data: {
          // values on X-Axis
          labels: this.datesChart,
          datasets: [
            {
              label: 'Sales',
              data: this.dataChart,
              backgroundColor: 'blue',
            },
          ],
        },
        options: {
          aspectRatio: 2.5,
        },
      });
    }
  }

  isSubmitDisabled() {
    return !(
      this.weight.value != null &&
      this.reps.value != null &&
      this.rpe.value != null &&
      this.eccentric.value != null &&
      this.concentric.value != null &&
      this.top.value != null &&
      this.bottom.value != null &&
      this.results.valid
    );
  }

  checkNumber(event: any, control: string) {
    const pattern = new RegExp(this.allowNumberXRegex);
    const inputChar = String.fromCharCode(event.charCode);
    if (
      !pattern.test(inputChar) ||
      (inputChar.toLowerCase() === 'x' &&
        (this.results.controls['tempo'] as FormGroup).controls[control].value
          .toLowerCase()
          .includes('x'))
    ) {
      event.preventDefault();
    }
  }

  getTodaysLogs(workoutId?: number, exerciseId?: number) {
    console.log('workoutid: ' + workoutId + ' exerrciseId: ' + exerciseId);
    const today = new Date();
    const dateToSend = today.toISOString().slice(0, 10);
    // this.datesChart.push('cos');
    // this.datesChart.push('ktos');
    // this.dataChart.push(String(workoutId));
    // this.dataChart.push(String(exerciseId));

    if (exerciseId && workoutId) {
      this.logsService
        .getLogsFromDate(exerciseId, workoutId, dateToSend)
        .subscribe(
          (data) => {
            this.logs = data;
            // console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  onSubmit(exerciseName: string, exerciseId?: number, workoutId?: number) {
    // console.log(this.rpe);
    const today = new Date();
    const dateToSend = today.toISOString().slice(0, 10);

    let setNumberToSend = this.logs.length + 1;

    const weightToSend = this.weight.value;
    const repsToSend = this.reps.value;
    const rpeToSend = this.rpe.value;
    const tempoToSend =
      this.eccentric.value +
      this.bottom.value +
      this.concentric.value +
      this.top.value;
    const exerciseNameToSend = exerciseName;
    const workoutIdToSend = workoutId;

    if (workoutIdToSend !== undefined) {
      let logToSend: logDTO = {
        setNumber: setNumberToSend,
        weight: weightToSend,
        reps: repsToSend,
        rpe: rpeToSend,
        tempo: tempoToSend,
        exerciseName: exerciseNameToSend,
        workoutId: workoutIdToSend,
        date: dateToSend,
      };
      this.logsService.addLog(logToSend).subscribe(
        (data) => {
          console.log(data);
          this.getTodaysLogs(workoutId, exerciseId);
        },
        (error) => {
          console.log(error);
        }
      );
      // console.log(logToSend);
    }
  }

  savePlayer(player: any) {
    this.player = player;
    console.log('player instance', player);
  }

  onStateChange(event: any) {
    console.log('player state', event.data);
  }

  get weight() {
    return this.results.controls['weight'];
  }

  get reps() {
    return this.results.controls['reps'];
  }

  get rpe() {
    return this.results.controls['rpe'];
  }

  get tempo() {
    return this.results.controls['tempo'] as FormGroup;
  }

  get eccentric() {
    return (this.results.controls['tempo'] as FormGroup).controls['eccentric'];
  }
  get concentric() {
    return (this.results.controls['tempo'] as FormGroup).controls['concentric'];
  }
  get top() {
    return (this.results.controls['tempo'] as FormGroup).controls['top'];
  }
  get bottom() {
    return (this.results.controls['tempo'] as FormGroup).controls['bottom'];
  }

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
}
