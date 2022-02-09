import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

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

  ngChange(){
  }

}
