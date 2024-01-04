import { Component, AfterViewInit } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { HomepageService } from './homepage.service';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
    protected data: any []= [];

    public ngAfterViewInit(): void {
      //this.createChartLine();
    }

    // private getRandomNumber(min: number, max: number): number {
    //   return Math.floor(Math.random() * (max - min + 1) + min)
    // }

    // private createChartLine(): void {
    //   let date = new Date();
    //   const data: any[] = [];
  
    //   for (let i = 0; i < 10; i++) {
    //     date.setDate(new Date().getDate() + i);
    //     data.push([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)]);
    //   }
  
    //   const chart = Highcharts.chart('chart-line', {
    //     chart: {
    //       type: 'line',
    //     },
    //     title: {
    //       text: 'Line Chart',
    //     },
    //     credits: {
    //       enabled: false,
    //     },
    //     legend: {
    //       enabled: false,
    //     },
    //     yAxis: {
    //       title: {
    //         text: null,
    //       }
    //     },
    //     xAxis: {
    //       type: 'category',
    //     },
    //     tooltip: {
    //       headerFormat: `<div>Date: {point.key}</div>`,
    //       pointFormat: `<div>{series.name}: {point.y}</div>`,
    //       shared: true,
    //       useHTML: true,
    //     },
    //     series: [{
    //       name: 'Amount',
    //       data,
    //     }],
    //   } as any);
  
    //   setInterval(() => {
    //     date.setDate(date.getDate() + 1);
    //     chart.series[0].addPoint([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)], true, true);
    //   }, 1500);
    // }
  
 

  constructor(private http: HttpClient,private homepageservice: HomepageService){
   this.loaddata()
  }
   
   //
      async loaddata() {
        let start = 1,
         limit = 40,
         time_period = '24h',
         sort = 'percent_change_24h',
        apiUrl = 'https://cors-anywhere.herokuapp.com/http://sandbox-api.coinmarketcap.com/v1/cryptocurrency/trending/gainers-losers',
         actualUrl = apiUrl + `?start=${start}&limit=${limit}&time_period=${time_period}&sort=${sort}`; //CMC_PRO_API_KEY=${api_key}& //
         
        var apiResults = await fetch(actualUrl, {
          headers: { 
                      'Content-Type': 'application/json',
                      'X-CMC_PRO_API_KEY' : 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'
                  }
      }).then( async resp => resp.json()).then(data => {
      //   for (var key in data) {
      //     if (data.hasOwnProperty(key) && key == 'data') {
      //         //console.log(key + " -> " + data[key]);
      //         // for(const [k, value] of Object.entries(data[key])) {
      //         //     console.log(`${k}: ${value}`);
      //         // }
      //     }
      // }
        return data
      })
      

  var data = this.recursiveSearch(apiResults,'data')
  console.log(data)
    }



     
      
      // iterate(obj : any) {
      //   Object.keys(obj).forEach(key => {
      //   console.log('key: '+ key + ', value: '+obj[key]);
      //   if (typeof obj[key] === 'object' && obj[key]!==null) {
      //           this.iterate(obj[key])
      //       }
      //   }
      
      //   )
      // }
      
   

     recursiveSearch(obj: any, searchKey: any, results: any = []) {
      console.log(obj.data, searchKey, typeof(obj))
        const r = results;
        Object.keys(obj).forEach(key => {
           const value = obj[key];
           if(key === searchKey && typeof value == 'object' && obj[key]!=null){
              console.log(value.data)
              r.push(value.data);
           }
        });
        return r;
     };
  }


