import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "reverse" })
export class ReversePipe implements PipeTransform {
  transform(input: any): any {
    if (typeof input == 'string') {
      return input
        .split("")
        .reverse()
        .join("");
    }

    return Array.isArray(input) ? input.slice().reverse() : input;
  }
}