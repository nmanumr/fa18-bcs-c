import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  semesters: Observable<any>;

  constructor(private afs: AngularFirestore) {
    this.semesters = afs.collection('semester').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return {
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        }
      }))
    );
  }

  getCollectionWithId(el): Observable<any> {
    return el.snapshotChanges().pipe(
      map((actions: any[]) => actions.map(a => {
        return {
          id: a.payload.doc.id,
          ...a.payload.doc.data()
        }
      }))
    );
  }

  getDocumentWithId(el): Observable<any> {
    return el.snapshotChanges().pipe(
      map((action: any) => {
        return {
          id: action.payload.id,
          ...action.payload.data()
        }
      })
    );
  }

  getSemesters(): Observable<any> {
    return this.getCollectionWithId(this.afs.collection(`semester`));
  }

  getSubject(sm, subj): Observable<any> {
    return this.getDocumentWithId(this.afs.doc(`semester/${sm}/subjects/${subj}`));
  }

  getSubjects(sm): Observable<any> {
    return this.getCollectionWithId(this.afs.collection(`semester/${sm}/subjects`));
  }

  getLinks(sm) {
    return this.getCollectionWithId(this.afs.collection(`semester/${sm}/links`));
  }

  getTimeTables() {
    return this.getDocumentWithId(this.afs.doc(`timetable/timetables`));
  }

  async buildTimeTable(ttArr) {
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
      return { code: "", subject: "", teacher: "", room: "", rowspan: 1, color: "", isLab:false }
    
    return new Promise(r=>{
      var sub = this.afs.doc(`subjects/${period[0]}`).valueChanges().subscribe(
        data=>{
          sub.unsubscribe();
          return r({
            code: period[0],
            subject: data["name"],
            teacher: data["teacher"],
            room: period[1],
            rowspan: period[3] || 1,
            color: period[2]? data["colorL"] : data["color"],
            isLab: !!period[2]
          })
        }
      )
    })
  }

  getResources(sm, subj) {
    return this.getCollectionWithId(
      this.afs.collection(
        `semester/${sm}/subjects/${subj}/Resources`,
        ref => ref.orderBy('index')
      )
    );
  }
}