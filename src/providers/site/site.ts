import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import 'rxjs/Rx';

/*
  Generated class for the SiteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SiteProvider {

  db: any;

  constructor(public http: Http) {
    this.db = new PouchDB('BIDB');
    console.log('Hello SiteProvider Provider');
  }

  getAllSites(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.allDocs({
        include_docs: true,
        startkey: "PROJECTS",
        endkey: "PROJECTS\ufff0"
      })
        .then(res => {
          console.log(res);
          resolve(res.rows)
        })
        .catch(err => console.log(err));
    });
  }

  async getDocById(docId) {
    return this.db.get(docId)
  }

  getFromFile(file: string) {
    console.log(file);
    return this.http.get(file).map(resm => {
      return resm.json()
    }).toPromise();
  }

  loadDB() {
    this.getFromFile('assets/data/projects.json')
      .then(res => {
        console.log(res);
        this.db.bulkDocs(res)
          .then(res2 => console.log(res2))
          .catch(err => console.log(err))
      });
      this.getFromFile('assets/data/parties.json')
      .then(res => {
        console.log(res);
        this.db.bulkDocs(res)
          .then(res2 => console.log(res2))
          .catch(err => console.log(err))
      });
  }

  data: any = [{
    _id: "SITE10",
    name: "New haven estate",
    bldrId: "PARTY1",
    devId: "PARTY1",
    status: "ACTIVE"
  }, {
    _id: "SITE20",
    name: "New paradise estate",
    bldrId: "PARTY3",
    devId: "PARTY2",
    status: "ACTIVE"
  }, {
    _id: "SITE30",
    name: "New cassio estate",
    bldrId: "PARTY2",
    devId: "PARTY1",
    status: "ACTIVE"
  }, {
    _id: "SITE40",
    name: "New wodburn estate",
    bldrId: "PARTY3",
    devId: "PARTY3",
    status: "ACTIVE"
  }, {
    _id: "SITE50",
    name: "New jungle estate",
    bldrId: "PARTY4",
    devId: "PARTY4",
    status: "ACTIVE"
  }, {
    _id: "PARTY1",
    name: "Taylor Wimpey"
  }, {
    _id: "PARTY2",
    name: "Bovis Homes"
  }, {
    _id: "PARTY3",
    name: "Persimmon Developers"
  }, {
    _id: "PARTY4",
    name: "Yo Mama Homes"
  }];

}
