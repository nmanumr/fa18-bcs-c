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

  getResources(sm, subj) {
    return this.getCollectionWithId(
      this.afs.collection(
        `semester/${sm}/subjects/${subj}/Resources`,
        ref => ref.orderBy('index')
      )
    );
  }
}