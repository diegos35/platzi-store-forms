import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  id: string;
  categories: Category[] = [];
  selectedCategory: string;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productsService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue(product);
      });
    });
    this.getCategories();
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.updateProduct(this.id, product)
      .subscribe((newProduct) => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      category_id: ['', [Validators.required]],
      image: [''],
      description: ['', [Validators.required]],
    });
  }

  get priceField() {
    return this.form.get('price');
  }

  
  private getCategories(){
    this.categoriesService.getAllCategories()
    .subscribe((categories) => {
      this.categories = categories;
    })
  }



}
