import {
  Component,
  OnInit,
  Inject,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Program } from 'src/app/shared/models/program';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

enum ChartType {
  Volume = 1,
  Weight,
  Estimated,
}

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css'],
})
export class ProgramDetailsComponent implements OnInit {
  @ViewChildren(MatExpansionPanel)
  expansionPanels?: QueryList<MatExpansionPanel>;
  selectedTabIndex?: number;

  changeTab(index: number) {
    console.log('change tab');

    this.selectedTabIndex = index;
  }

  Object = Object;

  exerciseId?: number;
  workoutId?: number;

  logs: Log[] = [];
  previousLogs: Log[] = [];
  previousLogsObject: Object = {};

  id = 'vcBig73ojpE';
  playerVars = {
    cc_lang_preg: 'en',
  };
  player?: YT.Player;

  datesChart: string[] = [];
  dataChart: string[] = [];
  public chart: any;
  chartType?: ChartType;

  results!: FormGroup;
  allowNumberXRegex = '^([0-9]*|x|X)$';
  weightRegex = '^(0|[1-9][0-9]{0,3}|2000)$';
  rpeRegex = '^(0|[1-9]|10)$';
  repsRegex = '^(0|[1-9][0-9]*)$';

  openedPanel: any = null;

  onPanelOpen(index: number, index2: number) {
    // console.log('open on panel ' + index + ' ' + index2);
    // this.createChart(index2, index);

    if (this.openedPanel === null) {
      this.openedPanel = index;
    } else if (this.openedPanel === index) {
      this.openedPanel = null;
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Program,
    public dialogRef: MatDialogRef<ProgramDetailsComponent>,
    private logsService: LogsService,
    private fb: FormBuilder,
    private elementRef: ElementRef
  ) {}

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
    // if (this.chart) {
    if (this.chart instanceof Chart) {
      this.chart.destroy();
      this.chart = undefined;
      console.log(this.chart);
      this.dataChart = [];
      this.datesChart = [];
      this.previousLogs = [];
      this.previousLogsObject = {};
      console.log('destroy chart');
    }
    // }
  }

  // setExerciseWorkout(workoutId?: number, exerciseId?: number) {
  //   this.workoutId = workoutId;
  //   this.exerciseId = exerciseId;
  //   this.selectedTabIndex = 0;

  //   this.getLogs(workoutId, exerciseId);
  //   // this.datesChart.push('cos');
  //   // this.datesChart.push('ktos');
  //   // this.dataChart.push(String(workoutId));
  //   // this.dataChart.push(String(exerciseId));
  // }

  setChartData() {
    console.log('set data');
    this.chartType = ChartType.Volume;
    if (this.dataChart.length === 0 && this.datesChart.length === 0) {
      let dates = [];
      for (const [key, value] of Object.entries(this.previousLogsObject)) {
        // this.datesChart.push(key);
        let volume = 0;
        value.forEach((log: { weight: number; reps: number }) => {
          volume += log.weight * log.reps;
        });
        this.datesChart.push(key);
        // dates.push(key);
        // this.datesChart.push(key);
        this.dataChart.push(String(volume));

        console.log('Pushed to dates: ' + key);
        console.log('Pushed to data: ' + volume);
      }
    }
    // dates.sort((a, b) => {
    //   return new Date(a).getTime() - new Date(b).getTime();
    // });
    // this.datesChart = dates;
  }

  updateChartDataByVolume() {
    console.log('udpate vol');
    console.log(this.previousLogsObject);
    this.chartType = ChartType.Volume;

    let dataToUpdate = [];
    for (const [key, value] of Object.entries(this.previousLogsObject)) {
      // this.datesChart.push(key);
      let volume = 0;
      value.forEach((log: { weight: number; reps: number }) => {
        volume += log.weight * log.reps;
      });
      // this.datesChart.push(key);
      dataToUpdate.push(String(volume));
    }
    this.chart.data.datasets[0].data = dataToUpdate;
    this.chart.data.datasets[0].label =
      'Maximum volume [kg] graph over time (days)';
    this.chart.options.scales.y.title.text = 'Maximum volume [kg]';

    this.chart.update();
  }

  updateChartByEstimatedMax() {
    console.log('udpate estima');
    console.log(this.previousLogsObject);
    this.chartType = ChartType.Estimated;

    let dataToUpdate = [];
    for (const [key, value] of Object.entries(this.previousLogsObject)) {
      // this.datesChart.push(key);
      let bestEestimatedMax = 0;
      value.forEach((log: { weight: number; reps: number }) => {
        // let estimatedMax = log.weight * (1 + 0.033 * log.reps);
        let estimatedMax = log.weight / (1.0278 - 0.0278 * log.reps);

        console.log(
          'reps: ' +
            log.reps +
            ' weight: ' +
            log.weight +
            ' estim:' +
            estimatedMax
        );
        bestEestimatedMax =
          bestEestimatedMax >= estimatedMax ? bestEestimatedMax : estimatedMax;
      });
      // this.datesChart.push(key);
      dataToUpdate.push(bestEestimatedMax);
    }
    this.chart.data.datasets[0].data = dataToUpdate;
    this.chart.data.datasets[0].label =
      'Maximum estimated 1 rep max [kg] graph over time (days)';
    this.chart.options.scales.y.title.text = 'Maximum estimated 1 rep max [kg]';
    this.chart.update();
  }

  updateChartByWeightMax() {
    console.log('udpate weitgh');
    console.log(this.previousLogsObject);
    this.chartType = ChartType.Weight;

    let dataToUpdate = [];
    for (const [key, value] of Object.entries(this.previousLogsObject)) {
      // this.datesChart.push(key);
      let weightMax = 0;
      value.forEach((log: { weight: number; reps: number }) => {
        weightMax = weightMax >= log.weight ? weightMax : log.weight;
      });
      // this.datesChart.push(key);
      dataToUpdate.push(weightMax);
    }
    this.chart.data.datasets[0].data = dataToUpdate;
    this.chart.data.datasets[0].label =
      'Maximum weight [kg] graph over time (days)';
    this.chart.options.scales.y.title.text = 'Maximum weight [kg]';
    this.chart.update();
  }

  isChartValid() {
    // console.log(this.dataChart.length);
    // console.log(this.previousLogs.length);
    return this.dataChart.length === 0 && this.previousLogs.length === 0;
  }

  createChart(workout: number, exercise: number) {
    console.log('tabindex: ' + this.selectedTabIndex);
    if (this.chart != undefined) {
      this.chart.destroy();
      this.dataChart = [];
      this.datesChart = [];
    }
    // this.destroyChart();
    this.setChartData();

    // this.setChartData();

    console.log('createChart');
    console.log(this.chart);
    console.log(this.dataChart);
    console.log(this.datesChart);

    // if (!this.chart) {
    console.log('cretaing new chart');
    const canvas = document.getElementById(
      'logs-chart-' + workout + '-' + exercise
    ) as HTMLCanvasElement | null;
    console.log('canvas');
    console.log(canvas);

    if (canvas != null) {
      console.log('creating');
      this.chart = new Chart('logs-chart-' + workout + '-' + exercise, {
        type: 'line', //this denotes tha type of chart

        data: {
          labels: this.datesChart,

          datasets: [
            {
              label: 'Maximum volume [kg] graph over time (days)',
              data: this.dataChart,
              borderColor: 'black',
              backgroundColor: 'black',
              pointBackgroundColor: 'black',
              pointBorderColor: 'black',
              pointHitRadius: 3,
              pointRadius: 2,

              borderWidth: 1.5,
            },
          ],
        },
        options: {
          scales: {
            y: {
              title: {
                display: true,
                text: 'Maximum volume [kg]',
              },
            },
            x: {
              offset: true,
              title: {
                display: true,

                text: 'Date [yyyy-MM-dd]',
              },
            },
          },
        },
      });
    }

    console.log(this.chart);
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

  getLogs(workoutId?: number, exerciseId?: number) {
    console.log('workoutid: ' + workoutId + ' exerrciseId: ' + exerciseId);
    console.log('chart w getLog: ');
    console.log(this.chart);
    // if (this.chart) {
    //   console.log('destroying old chart');
    //   this.destroyChart();
    // }
    const today = new Date();
    const dateToSend = today.toLocaleDateString('en-CA');
    console.log('todays date1: ' + today);

    console.log('todays date2: ' + dateToSend);
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
            console.log('getLogsFromDate');
            // console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );

      this.logsService.getLogs(exerciseId, workoutId).subscribe(
        (data) => {
          console.log('getLogs');

          this.previousLogs = data;
          // console.log(data);
          let obj = data.reduce((acc: { [date: string]: any[] }, obj) => {
            if (!acc[obj.date]) {
              acc[obj.date] = [obj];
            } else {
              acc[obj.date].push(obj);
            }
            return acc;
          }, {});

          // this.setChartData(obj);
          this.previousLogsObject = obj;
          if (this.chart) {
            switch (this.chartType) {
              case ChartType.Volume:
                this.updateChartDataByVolume();
                break;
              case ChartType.Estimated:
                this.updateChartByEstimatedMax();

                break;

              case ChartType.Weight:
                this.updateChartByWeightMax();

                break;
            }
          }

          console.log('w subscribe get logs ');
          console.log(this.previousLogsObject);
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
    const dateToSend = today.toLocaleDateString('en-CA');

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
          console.log('add log przed get logu');

          this.getLogs(workoutId, exerciseId);
          console.log('add log po get logu');
        },

        (error) => {
          console.log(error);
        }
      );
      // console.log(logToSend);
    }
    console.log('submit');
    console.log(this.previousLogsObject);
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
