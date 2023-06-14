import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateStoreService implements OnDestroy{
  
  public static readonly  DEFAULT_EXCHANGE_RATE=1.1;

exhangeRate$=new BehaviorSubject<number>(ExchangeRateStoreService.DEFAULT_EXCHANGE_RATE)

subs=new SubSink();

constructor() { 
   //émettre des callback change rate chaque 3 s
    this.subs.sink= interval(3000).subscribe(x => {
      this.changeRate();
      });
  }

get exchangeRate():number{
   return this.exhangeRate$.value;
}
set  exchangeRate(value:number){
   this.exhangeRate$.next(value);
}
//ajouter un random -0.5,0.5 au taux de change
changeRate(){
  let generaedvalue=this.randomNumber(-0.5,0.5);
  let newExchangeRate=this.exchangeRate+generaedvalue;
  if(newExchangeRate>0) this.exchangeRate=this.exchangeRate+generaedvalue
  else {
    this.changeRate()}
}
randomNumber(min:number, max:number):number {
  return Math.random() * (max - min) + min;
}

ngOnDestroy(){
  //désinscrire de tout les souscribtions
  this.subs.unsubscribe();
}
}
