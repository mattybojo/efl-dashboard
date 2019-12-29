import { GraphData } from './../../shared/models/player.model';
import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-chartjs-pie',
  template: `
    <chart type="pie" [data]="_data" [options]="options"></chart>
  `,
})
export class ChartjsPieComponent implements OnDestroy {
  _data: any;
  options: any;
  colors: any;
  chartjs: any;

  subscription$: Subscription;

  @Input() set data(data: GraphData) {
    const colorArray: string[] = [];
    const count = data.labels.length;
    for(let i = 0; i < data.labels.length; i++) {
      colorArray.push(this.rainbowStop(i / count));
    }

    this._data = {
      labels: data.labels,
      datasets: [{
        data: data.data,
        backgroundColor: this.shuffle(colorArray),
      }],
    };

    this.options = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [
          {
            display: false,
          },
        ],
        yAxes: [
          {
            display: false,
          },
        ],
      },
      legend: {
        display: false,
      },
    };
  }

  rainbowStop(h) {
    let f= (n,k=(n+h*12)%12) => .5-.5*Math.max(Math.min(k-3,9-k,1),-1);
    let rgb2hex = (r,g,b) => "#"+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('');
    return ( rgb2hex(f(0), f(8), f(4)) );
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  constructor(private theme: NbThemeService) {
    this.subscription$ = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
      this.chartjs = config.variables.chartjs;
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
