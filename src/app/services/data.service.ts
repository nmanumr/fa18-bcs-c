import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, Observer } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  semesters: Observable<any>;

  constructor(private afs: AngularFirestore) {
    this.semesters = this.getFromPath('semester', false);
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

  getFromPath(path, isDoc=true){
    if(isDoc)
      return this.getDocumentWithId(this.afs.doc(path));
    return this.getCollectionWithId(this.afs.collection(path));
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