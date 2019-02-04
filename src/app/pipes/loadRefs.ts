import { Pipe, PipeTransform } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { DataService } from "../services/data.service";

@Pipe({ name: "loadRefs" })
export class LoadRefsPipe implements PipeTransform {

  constructor(private dataService: DataService) { }

  transform(input: any): any {
    return Observable.create((observer: Observer<any>) => {
      var documents = {};
      for (var document of input) {
        documents[document.id] = { id: document.id };
        this.dataService.getFromPath(document.path).subscribe(data => {
          documents[data.id] = data;
          observer.next(this.arrayFromObject(documents));
        })
      }
      observer.next(this.arrayFromObject(documents));
    })
  }

  private arrayFromObject(obj) {
    var arr = [];
    for (var key of Object.keys(obj)) {
      arr.push(obj[key])
    }
    return arr;
  }
}