import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from "@angular/forms"; //FormBuilder es un servico hay qyue inyectarlo
@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form: FormGroup; //referencia del form

  constructor(
    private formBuilder: FormBuilder //es un servicio inyección de depencias
  )
  {
    this.buildForm();
  }

  ngOnInit(): void {
    this.nameField.valueChanges. //se vuelve un listener en tiempo real de typescript
      subscribe(value => { //se suscribe al valor que cambia
        console.log('value name input', value);
      });
    //console.log('dirty name inout', this.nameField.dirty)
    //console.log('touched name input', this.nameField.touched);
    this.form.valueChanges.subscribe(
      value => {
        console.log('listener form', value);
      }
    )

  }


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
  zoneField = new FormControl('');


  getNameValue() {
    console.log('nameField', this.nameField);
  }

  save(event) {
    /* this.form.markAllAsTouched();
    if (this.form.invalid) { return }
    console.log(this.form.value) */
    if(this.form.valid){
      console.log(this.form.value);
    }else{
      this.form.markAllAsTouched();
    }
  }

  private buildForm(){
    //FormGroup
    /* this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl(''),
      phone: new FormControl(''),
      color: new FormControl('#000000'),
      date: new FormControl('#000000'),
      age: new FormControl(12),
      category: new FormControl('category-2'),
      tag: new FormControl(''),
      agree: new FormControl(false),
      gender: new FormControl(''),
      zone: new FormControl('')
    }); */

    //FormBuilder
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      color: ['#000000'],
      date: [''],
      age: [18, [Validators.required, Validators.min(18), Validators.max(100)]],
      category: [''],
      tag: [''],
      agree: [false, [Validators.requiredTrue]],
      gender: [''],
      zone: [''],
    });

  }

  get isNameFieldValid() { //para quitar las validaciones del html
    return this.nameField.touched && this.nameField.valid
  }

  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid
  }

  get isNameFieldValidForm() {
    return this.form.controls.name.touched && this.form.controls.name.valid
  }

  get isNameFieldInvalidForm() {
    return this.form.controls.name.touched && this.form.controls.name.invalid
  }


  get isNamedValid() {
    return this.form.controls.name.touched && this.form.controls.name.valid
  }

  get isNameInvalid() {
    return this.form.controls.name.touched && this.form.controls.name.invalid
  }


  get getName() {
    return this.form.get('name');
    //return this.form.controls.name.value
  }

  get getEmail() {
    return this.form.get('email'); //return FormControl
  }

  get getPhone() {
    return this.form.get('phone');
  }

  get getColor() {
    return this.form.get('color');
  }

  get getDate() {
    return this.form.get('date');
  }

  get getAge() {
    return this.form.get('age');
  }

  get getCategory() {
    return this.form.get('category');
  }

  get getTag() {
    return this.form.get('tag');
  }

  get getAgree() {
    return this.form.get('agree');
  }

  get getGender() {
    return this.form.get('gender');
  }


  get getZone() {
    return this.form.get('zone');
  }

  /* Es una gran pregunta, la respuesta es que necesitas hacerlo en el
  constructor por que necesitas la referencia del form de forma inmediata si lo
  haces el en ngOnInit el form se va crear hasta cuando el componente este listo lo
  cual da un error ya que en el HTML tu usas:<form [formGroup]="form></form>
  y necesitas esa referencia desde el inicio sin esperar a que finalice en ciclo de vida del componente.
  En resumen siempre la creación del form en el constructor y llamadas asincronas cómo APIs en el ngOnInit. */


/* <h4>FormControl</h4>
Cada uno de los campos del formulario.

<h4>FormGroup</h4>
Conjunto de campos (FormControl)

<h4>FormBuilder</h4>
Servicio, requiere inyección de dependencias en el constructor. */

}
