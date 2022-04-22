import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';

import { Product } from './../../../core/models/product.model';
import { CartService } from './../../../core/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<Product[]>;
  form: FormGroup;

  
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.products$ = this.cartService.cart$;
    this.buildForm();
  }

  ngOnInit() {
    console.log(this.form.get('address'))
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      address: this.formBuilder.array([])
    });
  }

  addAddressField(){
    this.addressField.push(this.createAddressField());
  }

  private createAddressField(): FormGroup{
    return this.formBuilder.group({
      zip: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  //getter
  get addressField(): FormArray{
    //return <FormArray>this.form.get('address')
    return this.form.get('address')  as FormArray//return Abstract Control as FormArray
  }

  save(){
    console.log(this.form.value)
  }
}
