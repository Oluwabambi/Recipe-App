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
  editRecipeDialog = false;
  allRecipes: any;
  currentRecipe: any = '';
  currentIngredients = []
  currentDirections = []


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
      this.currentRecipe = this.allRecipes[0];
      this.currentIngredients = this.currentRecipe.ingredients.split("*");
      this.currentDirections = this.currentRecipe.directions.split("*"); 
    })
  }

  selectedRecipe(recipe:any) {
    this.currentRecipe = recipe;
    this.currentIngredients = this.currentRecipe.ingredients.split("*");
    this.currentDirections = this.currentRecipe.directions.split("*");
  }

  addNewRecipe() {
    this.dialogBox = true;
    let bod: any = document.querySelector('body');
    console.log(bod);
    
  }

  submitRecipe() {
    this.dataService.addRecipe(this.recipeForm.value).subscribe( res => {
      console.log(res);
      this.dialogBox = false;
      this.showRecipes();
    })
  }

  onEditClick() {
    this.editRecipeDialog = true;
    // let recipeName: any = document.getElementById('editName');
    // recipeName.value = this.currentRecipe.name;
  }

  editRecipe(id:any) {
    
    this.dataService.editRecipe(id, this.recipeForm.value).subscribe( () => {
      this.editRecipeDialog = false;
      this.showRecipes();
    } )
  }

  removeRecipe(id:any) {
    if(confirm("Are you sure you want to delete?")){
      this.dataService.deleteRecipe(id).subscribe(()=> {
        this.showRecipes();
      })
    }
  }
}
