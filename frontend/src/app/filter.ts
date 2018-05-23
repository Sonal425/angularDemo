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
  name=[];
  transform(items:any[], searchText: string):any[] {
    if(!items) return [{}] ;
    for(let i=0;i<items.length;i++){
      this.name[i]=items[i]["name"];
    }
    console.log(this.name)
    debugger
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return this.name.filter( it => {
       console.log(it);
      return it.toLowerCase().includes(searchText);

    });
  }
}
// import { Pipe, PipeTransform } from '@angular/core';
// @Pipe({
//   name: 'filter'
// })
// export class FilterArray implements PipeTransform {
//   transform(items: any[], searchText: string): any[] {
//     if(!items) return [];
//     if(!searchText) return items;
//     searchText = searchText.toLowerCase();
//     return items.filter( it => {
//       return it.toLowerCase().includes(searchText);
//     });
//    }
// }