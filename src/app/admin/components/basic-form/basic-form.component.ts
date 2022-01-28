import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  nameField = new FormControl('soy un control');

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

}
