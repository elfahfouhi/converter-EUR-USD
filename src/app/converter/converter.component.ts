import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { SubSink } from 'subsink';
import { ExchangeRateStoreService } from './services/exchange-rate-store.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit,OnDestroy {
  interval: any;

  constructor(public store:ExchangeRateStoreService) { }
   fixedExchangeRate: number=1.1;
   isChedked:boolean=true;
  ngOnInit(): void {
    
  }
  
  subs=new SubSink();

ngOnDestroy(){
  this.subs.unsubscribe();
}

}
