import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebMagnat-frontend-test';
  dialogBox=false;
  allRecipes: any;


  constructor (private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.showRecipes();
  }

  recipeForm = this.fb.group({
    name : new FormControl('', Validators.required),
    ingredients : new FormControl('', Validators.required),
    directions : new FormControl('', Validators.required),
  })

  showRecipes() {
    this.dataService.getRecipes().subscribe( res => {
      this.allRecipes = res;
      console.log(res);
      
    })
  }

  addNewRecipe() {
    this.dialogBox = true;
    let bod: any = document.querySelector('body');
    console.log(bod);
  }

  submitRecipe() {

  }

  removeDialog() {
    this.dialogBox = false;
  }
}
