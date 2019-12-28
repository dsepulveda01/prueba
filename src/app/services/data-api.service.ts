import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { ProfileInterface } from './../models/profile';
import { map } from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor( private afs: AngularFirestore) {

  }

  private profileDoc: AngularFirestoreDocument<ProfileInterface>;
  private profile: Observable<ProfileInterface>;



  getIdProfile(idProfile: string) {
    return this.profileDoc = this.afs.doc<ProfileInterface>(`profile/${idProfile}`);
    return this.profile = this.profileDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists  == false) {
        return null;
      } else {
        const data = action.payload.data() as ProfileInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addProfile() {

  }

  updateProfile() {

  }

}
