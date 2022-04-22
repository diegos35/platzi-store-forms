import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: Category;


  constructor( 
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute //read params route
  ) 
  { }

 
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.getCategory(params.id);
      }
    })
  }
  
  CreateCategory(data){
    console.log('entra')
    this.categoriesService.createCategory(data)
    .subscribe(res => {
      console.log(res);
      this.router.navigate(['./admin/categories']);
    })
  }


   updateCategory(data){
    this.categoriesService.updateCategory(this.category._id, data)
    .subscribe(res => {
      console.log(res);
      this.router.navigate(['./admin/categories']);
    })
  }

  private getCategory(id: string){
    this.categoriesService.getCategory(id)
    .subscribe(data => {
      this.category = data;
      //this.nameField.setValue(data.name); //o campo por campo
      //this.form.patchValue(data); //tiene que tener las misma key del form
      console.log(data);
    })
  }
}
