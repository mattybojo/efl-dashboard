import { GraphData } from '../../shared/models/player.model';
import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-chartjs-radar',
  template: `
    <chart type="radar" [data]="_data" [options]="options"></chart>
  `,
})
export class ChartjsRadarComponent implements OnDestroy {
  _data: any;
  options: any;
  colors: any;
  chartjs: any;

  subscription$: Subscription;

  @Input() set data(data: GraphData) {
    const colorArray: string[] = [];
    const count = data.datasets.length;

    for(let i = 0; i < data.datasets.length; i++) {
      colorArray.push(this.rainbowStop(i / count));
    }

    for(let i = 0; i < data.datasets.length; i++) {
      data.datasets[i].borderColor = colorArray[i];
      data.datasets[i].backgroundColor = this.hexToRGB(colorArray[i], 0.2);
    }

    this._data = {
      labels: data.labels,
      datasets: data.datasets,
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scaleFontColor: 'white',
      legend: {
        labels: {
          fontColor: this.chartjs.textColor,
        },
      },
      scale: {
        pointLabels: {
          fontSize: 14,
          fontColor: this.chartjs.textColor,
        },
        gridLines: {
          color: this.chartjs.axisLineColor,
        },
        angleLines: {
          color: this.chartjs.axisLineColor,
        },
      },
    };
  }

  rainbowStop(h) {
    let f= (n,k=(n+h*12)%12) => .5-.5*Math.max(Math.min(k-3,9-k,1),-1);
    let rgb2hex = (r,g,b) => "#"+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('');
    return ( rgb2hex(f(0), f(8), f(4)) );
  }

  hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
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
