export class LocalStorer {
    set(data:any) {
        let recipeList = JSON.stringify(data)
        localStorage.setItem('all_recipes', recipeList)
    }
    get() {
        let ls: any = localStorage.getItem('all_recipes');
        return JSON.parse(ls)
    }    
}
