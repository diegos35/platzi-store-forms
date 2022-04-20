import { Component, OnInit } from '@angular/core';
import {  Validators, FormBuilder, FormGroup} from '@angular/forms';
import { CategoriesService } from '../../../../core/services/categories.service';
import { Router } from '@angular/router';

//fire Storage
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoriesService: CategoriesService,
    private storage: AngularFireStorage
    )
    { 
      this.buildForm();
    }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
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
    if (this.form.valid) {
      this.CreateCategory();
    }else{
      this.form.markAllAsTouched
    }
  }

  private CreateCategory(){
    const data = this.form.value; 
    this.categoriesService.createCategory(data)
    .subscribe(res => {
      console.log(res);
      this.router.navigate(['./admin/categories']);
    })
  }

  uploadFile(event){
    const image = event.target.files[0];
    const name = 'category.png';
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task.snapshotChanges()
    .pipe(
      finalize(()=>{
        const urlImage$ = ref.getDownloadURL(); //urlImage$ Observable
        urlImage$.subscribe(url => {
          console.log(url);
          this.imageField.setValue(url);
        })
      })
    )
      .subscribe();
  }
}
