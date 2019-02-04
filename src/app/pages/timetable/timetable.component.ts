import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController } from '@ionic/angular';
import { LectureModelComponent } from '../lecture-model/lecture-model.component';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  timetables = [];
  currentTimeTable;
  subjectColors = {};
  isAddedAllSubjects = false;

  name = "TimeTable";
  breakpoints = ['8:30', '10:00', '11:30', '1:00', '2:30', '4:00', '5:30', '7:00']
  displayedColumns: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];


  constructor(private dataService: DataService, public modalController: ModalController) {
    dataService.getFromPath('timetable/timetables').subscribe(
      timetableList => {
        var timetableRef: DocumentReference;
        for (timetableRef of timetableList.other) {
          this.timetables.push(timetableRef);
        }
        this.setCurrentTimetable(timetableList.latest.path);
      }
    )
  }

  setCurrentTimetable(timetablePath: string){
    this.currentTimeTable = this.dataService.getFromPath(timetablePath);
    this.currentTimeTable.subscribe(
      data=>{
        this.name = data.name
      }
    )
  }

  setColor(subject, isFirstr, isFirstc, isLastr, isLastc) {
    if (!this.isAddedAllSubjects) {
      if (isFirstc && isFirstr) {
        setTimeout(() => { this.subjectColors = {}; })
      }
      if (isLastc && isLastr) {
        this.isAddedAllSubjects = true;
      }
      if(subject.subject == "") return "";
      setTimeout(() => {
        this.subjectColors[
          subject.subject + (subject.isLab ? " Lab" : "")
        ] = subject.color;
      })
    }
    return ""
  }

  keys(obj) {
    delete obj[""];
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
