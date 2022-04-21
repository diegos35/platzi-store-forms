import { AbstractControl } from '@angular/forms';
import {  CategoriesService } from './../core/services/categories.service';

import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

export class MyValidators {

  static  validateCategory(service: CategoriesService){
    return (control: AbstractControl) => {
      console.log('control', control)
      const value = control.value;
      return service.checkCategory(value)
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((response: any) => {
          const isAvailable = response.isAvailable;
          if (!isAvailable) {
            return {not_available: true};
          }
          return null;
        })
      );
    }
  }

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }

  static validPassword(control: AbstractControl) {
    const value = control.value;
    if (!containsNumber(value)) {
      return {invalid_password: true};
    }
    return null;//si no hay errores
  }


  static matchPassword(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password === confirmPassword) {
      return null;
    }
    return {match_password: true}
  }
}


function containsNumber(value: string){
  return value.split('').find(v => isNumber(v)) !== undefined;
}


function isNumber(value: string){
  return !isNaN(parseInt(value, 10));
}