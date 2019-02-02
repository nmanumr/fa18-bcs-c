import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController } from '@ionic/angular';
import { LectureModelComponent } from '../lecture-model/lecture-model.component';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  timetables = [];
  name = "TimeTable";

  breakpoints = ['8:30', '10:00', '11:30', '1:00', '2:30', '4:00', '5:30', '7:00']

  displayedColumns: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  dataSource: any[];
  subjectColors;

  constructor(private dataService: DataService, public modalController: ModalController) {
    var sub = dataService.getTimeTables().subscribe(
      timetableList => {
        for(var timetableRef of timetableList.other){
          this.getTimetable(timetableRef).then(
            timetable => {
              this.timetables.push(timetable);
              console.log(timetable);
            }
          )
        }

        this.loadTimetable(timetableList.latest)
        sub.unsubscribe();
      }
    )
  }

  loadTimetable(timetableRef) {
    this.getTimetable(timetableRef).then(
      timetable=>{
        this.name = timetable["name"],
        this.dataSource = timetable['parsedTimeTable'];
        this.getSubjectColors();
      }
    )
  }

  setTimetable(timetable){
    this.dataSource = timetable['parsedTimeTable'];
    this.name = timetable['name'];
    this.getSubjectColors();
  }

  async getTimetable(timetableRef) {
    return new Promise(res => {
      timetableRef.get().then(
        timetable => {
          this.dataService.buildTimeTable(timetable.data().timetable).then(
            data => {
              return res({
                ...timetable.data(),
                parsedTimeTable: data
              })
            }
          );
        }
      )
    })
  }

  getSubjectColors() {
    var subjectColors = {};
    for (var periods of this.dataSource) {
      for (var period of periods) {
        if (period.isLab)
          subjectColors[period.subject + " Lab"] = period.color;
        else
          subjectColors[period.subject] = period.color;
      }
    }
    delete subjectColors[""];
    this.subjectColors = subjectColors;
  }

  keys(obj) {
    return Object.keys(obj);
  }

  ngOnInit() {
  }

  async openDetails(period, breakpoint) {
    function close() {
      modal.dismiss();
    }
    const modal = await this.modalController.create({
      component: LectureModelComponent,
      componentProps: {
        lecture: {
          ...period,
          startTime: this.breakpoints[breakpoint],
          endTime: this.breakpoints[++breakpoint],
          slot: breakpoint,
          name: period.subject + (period.isLab ? " (Lab)" : "")
        },
        close: close
      }
    });
    return await modal.present();
  }

}
