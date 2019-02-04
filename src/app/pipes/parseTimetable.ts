import { Pipe, PipeTransform } from "@angular/core";
import { DataService } from "../services/data.service";

@Pipe({ name: "parseTimetable" })
export class ParseTimetablePipe implements PipeTransform {
  constructor(public dataService: DataService) { }

  async transform(input: any): Promise<any> {
    if (!input || !input.timetable) return;
    var ttArr = input.timetable;
    var tt = [];
    for (var i = 0; i < ttArr.length; i++) {
      tt[i] = [];
      var periods = JSON.parse(ttArr[i]);
      for (var j = 0; j < periods.length; j++) {
        tt[i][j] = await this.parsePeriod(periods[j])
      }
    }
    return tt;
  }

  async parsePeriod(period) {
    if (!period[0])
      return { code: "", subject: "", teacher: "", room: "", rowspan: 1, color: "", isLab: false }

    return new Promise(r => {
      var sub = this.dataService.getFromPath(`subjects/${period[0]}`).subscribe(
        data => {
          sub.unsubscribe();
          return r({
            code: period[0],
            subject: data["name"],
            teacher: data["teacher"],
            room: period[1],
            rowspan: period[3] || 1,
            color: period[2] ? data["colorL"] : data["color"],
            isLab: !!period[2]
          })
        }
      )
    })
  }
}