import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  public colorStyle: string = 'red';


  @Input() set color(value: string) {
    // console.log("value: ", value);
    this.colorStyle = value;
    this.setStyle(); // actualizar al enviar en el componente padre
  }

  constructor(
    private element: ElementRef<HTMLElement>,
  ) {
    // console.log("element: ", element);
    this.htmlElement = element;
    this.htmlElement.nativeElement.innerHTML = 'El pepe :)'
  }

  ngOnInit(): void {
    console.log("customLabelDirective -> ngOnInit")
    // cambiar el color del label al iniciar el componente
    this.setStyle();
  }

  setStyle(): void {
    if (this.htmlElement) {
      this.htmlElement.nativeElement.style.color = this.colorStyle;
    }
  }


}
