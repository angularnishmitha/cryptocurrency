import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';


@Component({
  selector: 'app-cryptoconverter',
  templateUrl: './cryptoconverter.component.html',
  styleUrls: ['./cryptoconverter.component.scss']
})
export class CryptoconverterComponent implements OnInit {
  cryptoForm: any;
  fromCurrencylist: any[] | undefined;
  toCurrencyList = [];
  convertedprice: any;

  changetoCurrency(e: any) {
    this.toCurrencyVal.setValue(e.target.value, {
      onlySelf: true
    })
  }
  changefromCurrency(e: any) {
    this.fromCurrencyVal.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get fromCurrencyVal() {
    return this.cryptoForm.get('fromCurrencyVal');
  }

  get toCurrencyVal() {
    return this.cryptoForm.get('toCurrencyVal');
  }

  constructor(private router: Router) {
    this.cryptoForm = new FormGroup({
      amount: new FormControl('', ),
      fromCurrencyVal: new FormControl(''),
      toCurrencyVal: new FormControl('')
    })
  }


  ngOnInit(): void {
    this.getSupportedCurrencies().then((fromCurrencylist) => {
      this.fromCurrencylist = fromCurrencylist
    });

  }

  async getSupportedCurrencies() {
    let start = 1,
      limit = 90,
      sort = 'id',
      //include_metals //http://sandbox-api.coinmarketcap.com
      apiUrl = 'https://cors-anywhere.herokuapp.com/http://api.coinmarketcap.com/data-api/v1/fiat/map',
      actualUrl = apiUrl + `?start=${start}&limit=${limit}&sort=${sort}`;
    var apiResults = await fetch(actualUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'
      }
    }).then(async resp => resp.json()).then(data => {
      return data.data
    })
    return apiResults
  }

  async convertCurrencies() {
      let amount = this.cryptoForm.get('amount').value,
      id = this.cryptoForm.get('fromCurrencyVal').value,
      convert_id = this.cryptoForm.get('toCurrencyVal').value,
      //http://sandbox-api.coinmarketcap.com
      apiUrl = 'https://cors-anywhere.herokuapp.com/http://api.coinmarketcap.com/data-api/v3/tools/price-conversion',
      actualUrl = apiUrl + `?amount=${amount}&id=${id}&convert_id=${convert_id}`;

    var apiResults = await fetch(actualUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'
      }
    }).then(async resp => resp.json()).then(data => {
      return data.data.quote.filter((i: any) => i.price).map((i: any) => i.price).toString();
    })
    this.convertedprice = apiResults;
    return apiResults
  }

  get f() {
    return this.cryptoForm.controls;
  }

  onSubmit() {
    //console.log(this.loginForm.controls)
    this.convertCurrencies().then((toCurrencylist) => {
      //console.log(toCurrencylist)
    })
  }
}