import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  public colorStyle: string = 'red';
  private _errors?: ValidationErrors | null;


  @Input() set color(value: string) {
    this.colorStyle = value;
    this.setStyle(); // actualizar al enviar en el componente padre
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage(); // actualizar al enviar en el componente padre
  }


  constructor(
    private element: ElementRef<HTMLElement>,
  ) {
    this.htmlElement = element;
    this.htmlElement.nativeElement.innerHTML = 'El pepe :)'
  }

  ngOnInit(): void {
    console.log("customLabelDirective -> ngOnInit")
    this.setStyle();
  }

  setStyle(): void {
    if (this.htmlElement) {
      this.htmlElement.nativeElement.style.color = this.colorStyle;
    }
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerHTML = '';
      return;
    }

    const errorsArray = Object.keys(this._errors);
    if (errorsArray.includes('required')) {
      this.htmlElement.nativeElement.innerHTML = 'Este campo es requerido';
      return
    }

    if (errorsArray.includes('minlength')) {
      const min = this._errors['minlength'].requiredLength;
      const actual = this._errors['minlength'].actualLength;
      this.htmlElement.nativeElement.innerHTML = `Este campo debe tener al menos ${min} caracteres, actualmente tiene ${actual}`;
      return
    }

    if (errorsArray.includes('email')) {
      this.htmlElement.nativeElement.innerHTML = 'Este campo debe ser un correo electrónico válido';
      return
    }
  }


}
