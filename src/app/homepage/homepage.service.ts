import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  constructor(private http: HttpClient) { }




  


  

   
    async testdata() {
      console.log('testdata')
    
      const httpOptions = {
        //mode: 'no-cors', 
        headers: new HttpHeaders({ 
          //'Access-Control-Allow-Credentials': 'true',
          'X-CMC_PRO_API_KEY':  'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
          //'Access-Control-Allow-Origin':'http://localhost:4200',
          // 'Access-Control-Allow-Methods': "GET,POST,OPTIONS,DELETE,PUT",
          // 'secure': 'false',
          // 'timeout': 6000000, 
          'Content-Type': 'application/json',
        })
      };


      let start = 1,
      limit = 100,
      time_period = '24h',
      convert_id = 'USD',
      api_key=  'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
      //sort = 'percent_change_24h',
      apiUrlExample = 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/trending/gainers-losers';
      let apiURL2 = 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/trending/latest';
      let actualUrl = apiUrlExample + `?start=${start}&limit=${limit}&time_period=${time_period}`; //CMC_PRO_API_KEY=${api_key}&

   
     
     
     return this.http.get(actualUrl,httpOptions).pipe(tap(data => console.log(data)), catchError(this.handleError)
    );
}

private handleError(err: HttpErrorResponse) {
  let errorMessage = '';
  if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
  } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}

}
