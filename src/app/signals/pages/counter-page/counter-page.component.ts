import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css']
})
export class CounterPageComponent {

  // signal siempre puede ser leida y escrita
  public counter = signal(10);

  // solo lectura por el computed
  public squareCounter = computed(() => this.counter() * this.counter()); // counter al cuadrado


  increaseBy(value: number): void {
    this.counter.update(current => current + value);
  }



}
