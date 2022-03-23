import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;


    // let numArgs: any = args.split(" ")
    // const implodeValue = args.includes(" ") ? args.split(" "): null;
    // if (numArgs.length>1) {
    //   return numArgs.every((a: any) => value.includes(a))
    // }

    if (args.includes(" ")) {
      args = args.toLowerCase();
      const implodeValue = args.split(" ");
      const filteredResult = value.filter(function (data: any) {
        const ingedientArray = data.ingredients.split("*");
        for (let i of ingedientArray) {
          let arrind = ingedientArray.indexOf(i)
          ingedientArray[arrind] = ingedientArray[arrind].trim().toLowerCase();
        }
        const result = implodeValue.every((i: any) => ingedientArray.includes(i))
        console.log(ingedientArray, implodeValue, 'test result');
        return result;
      });
      console.log(filteredResult, 'test result');

      return filteredResult;
    } else {
      args = args.toLowerCase();
      return value.filter(function (data: any) {
        return JSON.stringify(data.ingredients).toLowerCase().includes(args);
      });
    }
  }

}
