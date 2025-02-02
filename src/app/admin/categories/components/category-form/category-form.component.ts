import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {  Validators, FormBuilder, FormGroup} from '@angular/forms';
import { CategoriesService } from '../../../../core/services/categories.service';
import { Router, ActivatedRoute,  Params} from '@angular/router';

//fire Storage
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';

import { v4 as uuidv4 } from 'uuid';

import { MyValidators } from 'src/app/utils/validators';
import { Category } from 'src/app/core/models/category';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  image$: Observable<string>;
  isNew= true; //flag

  /*category: Category; */
  @Input()  //es async,Input como seter
  set category(data: Category){
    if(data){
      this.isNew = false;
      this.form.patchValue(data);
    }
  }

  @Output() create =  new EventEmitter();
  @Output() update = new EventEmitter();
  categoriaId: string;


  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService

    )
    { 
      this.buildForm();
    }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)], MyValidators.validateCategory(this.categoriesService)],
      image: ['', Validators.required]
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  save(){
    if (this.form.controls.name.valid) { //momento exacto en que llega la infrmacion ya habra pasado por const, Oninit
      if (this.isNew) {
        this.create.emit(this.form.value);
      }else{
        this.update.emit(this.form.value);
      }
    }else{
      this.form.markAllAsTouched
    }
  }

  uploadFile(event) {
    const image = event.target.files[0];
    const name = 'category.png';
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = ref.getDownloadURL();
        this.image$.subscribe(url => {
          console.log(url);
          this.imageField.setValue(url);
        });
      })
    )
    .subscribe();
  }
}
