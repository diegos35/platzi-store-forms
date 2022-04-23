import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'; //es una interface

@Component({
  selector: 'app-steppper',
  templateUrl: './steppper.component.html',
  styleUrls: ['./steppper.component.scss'],
  providers: [
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SteppperComponent),
    multi: true //puede tener multiple valores
    }
  ]
})
export class SteppperComponent implements OnInit, ControlValueAccessor {

  currentValue = 0;
  /* Funciones vacias */
  onChange = (_: any) => {};
  onTouch = () => {}; 
  isDisable: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  add(){
    this.currentValue = this.currentValue + 1;
    this.onTouch();
    this.onChange(this.currentValue);
  }

  sub(){
    this.currentValue = this.currentValue - 1;
    this.onTouch();
    this.onChange(this.currentValue);
  }

  //implemetacion de la interface ControlValueAccessor
  writeValue(obj: number): void {
    if (obj) {
      this.currentValue = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisable = isDisabled;
  }
}
