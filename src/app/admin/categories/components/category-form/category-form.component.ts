import { Component, OnInit } from '@angular/core';
import {  Validators, FormBuilder, FormGroup} from '@angular/forms';
import { CategoriesService } from '../../../../core/services/categories.service';
import { Router, ActivatedRoute,  Params} from '@angular/router';

//fire Storage
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';

import { v4 as uuidv4 } from 'uuid';

import { MyValidators } from 'src/app/utils/validators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  image$: Observable<string>;
  categoriaId: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoriesService: CategoriesService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute //read params route
    )
    { 
      this.buildForm();
    }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoriaId = params.id;
      if (this.categoriaId) {
        this.getCategory();
      }
    })
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

  private getCategory(){
    this.categoriesService.getCategory(this.categoriaId)
    .subscribe(data => {
      //this.nameField.setValue(data.name); //o campo por campo
      this.form.patchValue(data); //tiene que tener las misma key del form
      console.log(data);
    })
  }

  uploadFile(event){
    const image = event.target.files[0];
    const name = `${uuidv4()}.png`;
    console.log('name', name)
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task.snapshotChanges()
    .pipe(
      finalize(()=>{
        this.image$ = ref.getDownloadURL(); //urlImage$ Observable
        this.image$.subscribe(url => {
          console.log(url);
          this.imageField.setValue(url);
        })
      })
    )
    .subscribe();
  }
}
