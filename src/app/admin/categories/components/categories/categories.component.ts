import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from '../../../../core/services/categories.service';
import { Category } from 'src/app/core/models/category';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  //public data$: Observable<Category[]>;//para formulario anterio sin angular material

  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'image', 'actions'];

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.getAllInfo();
  }
  
  getAllInfo(){
    //this.data$ = this.categoriesService.getAllCategories(); //para formulario anterio sin angular material
    this.categoriesService.getAllCategories()
    .subscribe(categories => {
      this.categories = categories;
    });
  }
}
