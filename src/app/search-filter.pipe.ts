import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return null;
      if(!args)return value;

      
      // let numArgs: any = args.split(" ")
      const implodeValue = args.includes(" ") ? args.split(" "): null;
      // if (numArgs.length>1) {
      //   return numArgs.every((a: any) => value.includes(a))
      // }

      

       const filteredResult = value.filter(function(data:any){
        const ingedientArray = data.ingredients.split("*");
        for (let i of ingedientArray) { 
          let arrind = ingedientArray.indexOf(i)
          ingedientArray[arrind] = ingedientArray[arrind].trim()
      }
        const result = implodeValue.every((i:any) => ingedientArray.includes(i))
        console.log(ingedientArray, implodeValue, 'test result');
        return result;
        
        //  const test = data.ingredients.toLowerCase().includes(args);
        //   return data.ingredients.toLowerCase().includes(args);
      });
      console.log(filteredResult, 'test resiult');
      
      return filteredResult;

  }

}
