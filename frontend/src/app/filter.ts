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
    name:any[]=[];
    if(!items) return [{}] ;
    for(let i=0;i<items.length;i++){
      for(let j=0;j<items.length;j++){
     this.name.push(items[i][j])
    }
  }
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.toLowerCase().includes(searchText);
    });
   }
}