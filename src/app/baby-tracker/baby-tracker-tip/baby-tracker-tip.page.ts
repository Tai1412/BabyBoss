import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-baby-tracker-tip',
  templateUrl: './baby-tracker-tip.page.html',
  styleUrls: ['./baby-tracker-tip.page.scss'],
})
export class BabyTrackerTipPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.sleepChart();
    this.diaperChart();
  }

  sleepChart() {
    var ctx = (<any>document.getElementById("myBabySleepChart")).getContext("2d");
    var data = {
      labels: ["0-3 Months", "4 Monts", "6 Months","9 Months","12 Months","2 years"],
      datasets: [{
        label: "Total",
        backgroundColor: "blue",
        data: [16, 15, 14,13,14,13]
      }, {
        label: "Night",
        backgroundColor:"black",
        data: [9, 10, 10,11,11,11]
      }, {
        label: "Day",
        backgroundColor: "yellow",
        data: [7, 5, 4,2,3,2]
      }]
    };
    var myBabySleepChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        animation: { 
          duration: 2000,
          xAxis: true,
          yAxis: true,
      },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Hours'
            },
            ticks: {
              min: 0,
              max:20,
            }
          }]
        }
      }
    });

  }
  diaperChart() {
    var ctx = (<any>document.getElementById("myBabyDiaperChart")).getContext("2d");
    var data = {
      labels: ["0-1 Months", "1-5 Monts", "5-9 Months","9-12 Months","Over 1 Years"],
      datasets: [{
        label: "Approximately",
        backgroundColor: "red",
        data: [11,9,7,6,4]
      }]
    };
    var myBabyDiaperChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        animation: { 
          duration: 2000,
          xAxis: true,
          yAxis: true,
      },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Times'
            },
            ticks: {
              min: 0,
              max:18,
            }
          }]
        }
      }
    });

  }
  

}
