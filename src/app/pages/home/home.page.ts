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
  search_pos = 0;
  scrollStartPos = null;
  isScrolling = false;

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

  onScrollStart() {
    this.isScrolling = true;
  }

  onScrollEnd() {
    if(this.search_pos >= -34 || this.scrollStartPos < 40)
      this.search_pos = 0;
    else
      this.search_pos = -68;
    
    this.scrollStartPos = null;
    this.isScrolling = false;
  }

  onScrolling(e) {
    if(!this.scrollStartPos){
      this.scrollStartPos = e.detail.currentY;
    }

    if (this.scrollStartPos > e.detail.currentY) { // scrolling above
      if (this.search_pos <= 0 && this.search_pos >= -68) {
        this.search_pos += (this.scrollStartPos - e.detail.currentY);
      }
    }
    else if (this.scrollStartPos < e.detail.currentY) { //scrolling below
      if (this.search_pos <= 0 && this.search_pos >= -68) {
        this.search_pos += (this.scrollStartPos - e.detail.currentY);
      }
    }

    this.search_pos = this.search_pos > 0 ? 0 : this.search_pos;
    this.search_pos = this.search_pos < -68 ? -68 : this.search_pos;
    this.scrollStartPos = e.detail.currentY;
  }
}
