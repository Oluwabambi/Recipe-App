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
  searchInput: any;
  filterSearch: any = '';
  completeInput: any = null;


  constructor (private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.showRecipes();
  }

  recipeForm = this.fb.group({
    name : new FormControl('', Validators.required),
    ingredients : new FormControl('', Validators.required),
    directions : new FormControl('', Validators.required),
  })

  splitIngredients() {
    this.showRecipes();

  }

  showRecipes() {
    let loader: any = document.querySelector('.loader');  
    this.dataService.getRecipes().subscribe( res => {
      if (res) {
        loader.style.display = "none";
        this.allRecipes = res;
        console.log(res);
        // for (let i = 0; i < this.allRecipes.length; i++) {
        //   const curr:any = this.allRecipes[i]
        //   curr.ingredients = curr.ingredients.split("*");
        //   curr.directions = curr.directions.split("*");
        // }
        this.currentRecipe = this.allRecipes[0];
        this.currentIngredients = this.currentRecipe.ingredients.split("*");
        this.currentDirections = this.currentRecipe.directions.split("*");         
      }
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
    this.recipeForm.reset();
  }

  onEditClick() {
    this.editRecipeDialog = true;   
  }

  editRecipe(currentRec:any) {
    let editedRec: any = this.recipeForm.value;
    let recipeName: any = document.getElementById('editName');
    let editIngredient: any = document.getElementById('editIngredient');
    let editDirection: any = document.getElementById('editDirection');

    editedRec.name = recipeName.value;
    editedRec.ingredients = editIngredient.value;
    editedRec.directions = editDirection.value;
    console.log(editedRec);  
    this.dataService.editRecipe(currentRec.id, editedRec).subscribe( () => {
      
      this.editRecipeDialog = false;
      this.showRecipes();
      console.log(this.recipeForm.value);
      
    } )
  }

  removeRecipe(recipe:any) {
    if(confirm("Are you sure you want to delete?")){
      this.allRecipes = this.allRecipes.filter((r:any) => r !== recipe)
      this.dataService.deleteRecipe(recipe.id).subscribe(()=> {
        // this.showRecipes();
        const lastIndex = this.allRecipes.length - 1;
        this.currentRecipe = this.allRecipes[lastIndex];
        this.selectedRecipe(this.currentRecipe);
      })
    }
    
    
  }

  filter(text:any) {
    // this.completeInput = this.searchInput;
    // text = text.split(" ")
    // console.log(text);
    console.log('done');
    
    
    // let filteredArray:any = this.allRecipes
    // const searchInput = text.toLowerCase();
    // if (searchInput !== " ") {
    //   filteredArray = filteredArray.filter( (obj: any) => {
    //     return obj.ingredients.toLowerCase().includes(searchInput)
    //   });
    // }
    
    
    // this.showRecipes();
    // console.log(this.searchInput);
    
  }
}
