import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ProfileInterface } from './../models/profile';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor( private afs: AngularFirestore) {
    this.profilesColletion = afs.collection<ProfileInterface>('profiles');
    this.profiles = this.profilesColletion.valueChanges();
  }
  private profilesColletion: AngularFirestoreCollection<ProfileInterface>;
  private profiles: Observable<ProfileInterface[]>;
  private profilesDoc: AngularFirestoreDocument<ProfileInterface>;
  private profile: Observable<ProfileInterface>;


  getAllProfiles() {
    return this.profiles = this.profilesColletion.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ProfileInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getIdProfile(idProfile: string) {
    console.log(idProfile);
    this.profilesDoc = this.afs.doc<ProfileInterface>(`profile/${idProfile}`);
    return this.profile = this.profilesDoc.snapshotChanges().pipe(map(action => {
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
