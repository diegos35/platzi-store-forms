import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms";
@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl(''),
    phone: new FormControl(''),
    color:  new FormControl('#000000'),
    date: new FormControl('#000000'),
    age: new FormControl(12),
    category: new FormControl('category-2'),
    tag: new FormControl(''),
    agree: new FormControl(false),
    gender: new FormControl(''),
    zone:  new FormControl('')
  });

  //nameField = new FormControl('value Default', [Sync,Sync], [validaciones async])
  nameField = new FormControl('', [Validators.required, Validators.maxLength(10)])
  emailField = new FormControl('');
  phoneField = new FormControl('');
  colorField = new FormControl('#000000');
  dateField = new FormControl('#000000');
  ageField = new FormControl(12);

  categoryField = new FormControl('category-2');
  tagField = new FormControl('');

  agreeField = new FormControl(false);
  genderField = new FormControl('');
  zoneField =  new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.nameField.valueChanges. //se vuelve un listener en tiempo real de typescript
      subscribe(value => { //se suscribe al valor que cambia
        console.log('value name input',value) ;
      });
      console.log('dirty name inout',this.nameField.dirty)
      console.log('touched name input',this.nameField.touched);
  }

  getNameValue(){
    console.log('nameField',this.nameField);
  }

  save(event){
    this.form.markAllAsTouched();
		if (this.form.invalid) { return }
		console.log(this.form.value)

  }

  get isNameFieldValid(){ //para quitar las validaciones del html
    return this.nameField.touched && this.nameField.valid
  }

  get isNameFieldInvalid(){
    return this.nameField.touched && this.nameField.invalid
  }

  get getName(){
    //return //this.form.get('name');
    return this.form.controls.name.value
  }

  get  getEmail(){
    return this.form.get('email'); //return FormControl
  }

  get getPhone(){
    return this.form.get('phone');
  }

  get getColor(){
    return this.form.get('color');
  }

  get getDate(){
    return this.form.get('date');
  }

  get getAge(){
    return this.form.get('age');
  }

  get getCategory(){
    return this.form.get('category');
  }

  get getTag(){
    return this.form.get('tag');
  }

  get getAgree(){
    return this.form.get('agree');
  }

  get getGender(){
    return this.form.get('gender');
  }


  get getZone(){
    return this.form.get('zone');
  }

}
