// import { Pipe, PipeTransform} from '@angular/core';
// @Pipe({name:'filter'})
// export class FilterArray implements PipeTransform{
//   transform(value, args) {
//     if(!args[0]){
//       return value;
//     } else if(value){
//       return value.filter(item => {
//         for( let key in item){
//           if((typeof item[key]==='string' || item[key] instanceof String)&& (item[key].indexOf(args[0])!= -1)){
//             return true;
//           }
//         }
//       })
//     }
//   }
// }
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterArray implements PipeTransform {
  transform(items:any[], searchText: string): any[] {
    debugger
    if(!items) return [{}] ;
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.toLowerCase().includes(searchText);
    });
   }
}