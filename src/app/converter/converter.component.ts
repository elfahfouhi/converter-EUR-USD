import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ExchangeRateStoreService } from './services/exchange-rate-store.service';
const rotate: { [key: string]: string } = { 'EUR': 'USD', 'USD': 'EUR' };

export interface ConverterHisto{
  realExchangeRate?:number;
  fixedExchangeRate?:number;
  inputAmount?:Amount;
  outputAmount?:Amount;
}
export interface Amount{
  value:number;
  currency:string;
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit,OnDestroy {
  outputCurrency = "USD";
  inputCurrency = "EUR";

  inputAmountTerm$ = new BehaviorSubject<number>(0);
  inputCurrencyTerm$ = new BehaviorSubject<string>("EUR");

  fixedExchangeRate$ = new BehaviorSubject<number>(0);
  outputAmountTerm$: Observable<number> = of(0);

  inputAmountTermControl = new FormControl();
  fixedExchangeRateControl = new FormControl();

  isChekedFixedExchangeRate: boolean = false;
  usedExchangeRate: string = '';
  subs = new SubSink();
  listOperationHisto:ConverterHisto[]=[];
  constructor(public store: ExchangeRateStoreService) {

    this.outputAmountTerm$ = combineLatest([this.store.exhangeRate$,  
                                            this.inputAmountTerm$,
                                            this.inputCurrencyTerm$, 
                                            this.fixedExchangeRate$]).
                                            pipe(
                                            map(([exchangeRate,
                                                  inputAmountTerm,
                                                  inputCurrencyTerm,
                                                  fixedExchangeRate]) => {

                                                    let outputAmountTerm;
                                              if ((Math.abs((exchangeRate - fixedExchangeRate)) / fixedExchangeRate) > 0.02 && this.isChekedFixedExchangeRate) {
                                                this.usedExchangeRate = 'fixé'
                                                outputAmountTerm=inputCurrencyTerm == "EUR" ? inputAmountTerm * fixedExchangeRate : inputAmountTerm / fixedExchangeRate
                                                //TODO Factorisé pour ne pas appler deux foix saveOperation
                                                this.saveOperation({value:inputAmountTerm,currency:inputCurrencyTerm},{value:outputAmountTerm,currency:this.outputCurrency},exchangeRate,fixedExchangeRate)

                                                return outputAmountTerm
                                              }
                                              this.usedExchangeRate = 'réel'
                                              outputAmountTerm=inputCurrencyTerm == "EUR" ? inputAmountTerm * exchangeRate : inputAmountTerm / exchangeRate 
                                                                                            
                                                //TODO Factorisé pour ne pas appler deux foix saveOperation                                               
                                                this.saveOperation({value:inputAmountTerm,currency:inputCurrencyTerm},{value:outputAmountTerm,currency:this.outputCurrency},exchangeRate,fixedExchangeRate)

                                              return outputAmountTerm;
                                            })
                                             
                                          )
  }

  ngOnInit(): void {
    //value change sur le montant en input pour declencher l'event dans le combinelatest
    this.subs.sink = this.inputAmountTermControl.valueChanges.subscribe((value) => {
      this.inputAmountTerm$.next(value);
    }
    )
    //value change sur le taux fixé pour declencher l'event dans le combinelatest
    this.fixedExchangeRateControl.valueChanges.subscribe((value) => {
      this.fixedExchangeRate$.next(value);
    }
    )

  }
  //permet de switcher entre EUR et USD
  chooseCurrency($event: any) {
    this.inputCurrencyTerm$.next($event);
    this.outputCurrency = rotate[$event]
  }
  //TODO remove to service
  saveOperation(inputAmount:Amount,outputAmount:Amount,realExchangeRate:number,fixedExchangeRate:number){
    this.listOperationHisto.push({realExchangeRate:realExchangeRate,
                                 fixedExchangeRate:fixedExchangeRate,
                                 inputAmount:inputAmount,
                                 outputAmount:outputAmount});
    //extraire les 5 derniers element de la liste                              
    this.listOperationHisto = this.listOperationHisto.slice(Math.max(this.listOperationHisto.length - 5, 0));                            
  }

  ngOnDestroy() {
    //désinscrire de tout les souscribtions
    this.subs.unsubscribe();
  }

}
