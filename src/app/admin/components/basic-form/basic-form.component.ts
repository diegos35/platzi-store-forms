import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  nameField = new FormControl('');
  emailField = new FormControl('');
  phoneField = new FormControl('');
  colorField = new FormControl('#000000');
  dateField = new FormControl('#000000');
  ageField = new FormControl(12);

  categoryField = new FormControl('category-2');
  tagField = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.nameField.valueChanges. //se vuelve un listener en tiempo real de typescript
      subscribe(value => { //se suscribe al valor que cambia
        console.log(value) ;
      });

      console.log(this.nameField.untouched);
  }

  getNameValue(){
    console.log(this.nameField);
  }
  ngChange(){

  }

}
