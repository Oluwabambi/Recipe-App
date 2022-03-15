import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apiHandlerService: ApiHandlerService) { }

  getRecipes() {
    return this.apiHandlerService.get('recipes');
  }

  getRecipeById(id:number) {
    return this.apiHandlerService.get('recipes' + '/' + id);
  }

  addRecipe(data:any) {
    return this.apiHandlerService.post('recipes', data);
  }

  editRecipe(id:number, data:any) {
    return this.apiHandlerService.put('recipes' + '/' + id, data);
  }

  deleteRecipe(id:number) {
    return this.apiHandlerService.delete('recipes' + '/' + id);
  }

  

}
