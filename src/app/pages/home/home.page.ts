import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  semesters: Observable<any[]>;
  subjects = {};

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.semesters = this.dataService.semesters;

    this.getSubjects();
  }

  getSubjects() {
    this.semesters.subscribe(
      sms => {
        for (var sm of sms) {
          this.subjects[sm['id']] = {}
          this.subjects[sm['id']]['subjects'] = this.dataService.getSubjects(sm['id']);
          this.subjects[sm['id']]['links'] = this.dataService.getLinks(sm['id']);
        }
      }
    )
  }
}
