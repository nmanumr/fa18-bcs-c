import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  timetables = [];
  name="TimeTable";

  breakpoints = ['8:30', '10:00', '11:30', '1:00', '2:30', '4:00', '5:30', '7:00']

  displayedColumns: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  dataSource: any[];
  subjectColors;

  constructor(private dataService: DataService) {
    var sub = dataService.getTimeTables().subscribe(
      timetable=>{
        this.timetables = timetable;
        this.loadTimetable(timetable.latest)
        sub.unsubscribe();
      }
    )
  }

  loadTimetable(timetable){
    timetable.get().then(
      timetable => {
        this.name = timetable.data().name;
        this.dataService.buildTimeTable(timetable.data().timetable).then(
          data=>{
            this.dataSource = data;
            this.getSubjectColors();
          }
        );
      }
    )
  }

  getSubjectColors(){
    var subjectColors = {};
    for(var periods of this.dataSource){
      for(var period of periods){
          if(period.isLab)
            subjectColors[period.subject+" Lab"] = period.color;
          else
            subjectColors[period.subject] = period.color;
      }
    }
    delete subjectColors[""];
    this.subjectColors=subjectColors;
  }

  keys(obj){
    return Object.keys(obj);
  }

  ngOnInit() {
  }

}
