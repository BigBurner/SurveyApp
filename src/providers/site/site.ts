import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find'
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
    PouchDB.plugin(PouchDBFind);
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
    // this.getFromFile('assets/data/projects.json')
    //   .then(res => {
    //     console.log(res);
    //     this.db.bulkDocs(res)
    //       .then(res2 => console.log(res2))
    //       .catch(err => console.log(err))
    //   });
    //   this.getFromFile('assets/data/parties.json')
    //   .then(res => {
    //     console.log(res);
    //     this.db.bulkDocs(res)
    //       .then(res2 => console.log(res2))
    //       .catch(err => console.log(err))
    //   });
      this.getFromFile('assets/data/surveys.json')
      .then(res => {
        console.log(res);
        this.db.bulkDocs(res)
          .then(res2 => console.log(res2))
          .catch(err => console.log(err))
      });
      this.getFromFile('assets/data/surveyQuestions.json')
      .then(res => {
        console.log(res);
        this.db.bulkDocs(res)
          .then(res2 => console.log(res2))
          .catch(err => console.log(err))
      });
      this.getFromFile('assets/data/surveyAnswers.json')
      .then(res => {
        console.log(res);
        this.db.bulkDocs(res)
          .then(res2 => console.log(res2))
          .catch(err => console.log(err))
      });
  }

  repDB(){
    this.db.replicate.to("https://ec2-35-178-77-240.eu-west-2.compute.amazonaws.com:6984/bidb", {
      live: false,
      retry: false
    })
    .on('complete', function (info) {
      console.log(info);
    }).on('error', function (err) {
      // handle error
      console.log(err);
    });
    ;
  }

  async getSurveys(): Promise<any>{
    let result = await this.db.allDocs({
      include_docs: true,
      startkey: "SURVEYS",
      endkey: "SURVEYS\ufff0"
    });
    return result;
  }

}
