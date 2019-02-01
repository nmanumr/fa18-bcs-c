import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit {

  name;
  resources: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.name = this.route.snapshot.queryParamMap.get('name');
    var semester = this.route.snapshot.params['semester'];
    var subject = this.route.snapshot.params['subject'];

    this.resources = this.dataService.getResources(semester, subject);
  }

}
