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
    // PouchDB.debug.enable('pouchdb:find');
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
    try {
      return await this.db.get(docId)
    }
    catch (err) {
      return err.status
    }
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

  repDB() {
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

  async getSurveys(): Promise<any> {
    let result = await this.db.allDocs({
      include_docs: true,
      startkey: "SURVEYS",
      endkey: "SURVEYS\ufff0"
    });
    return result;
  }

  async getSurveyAs(surqId: string): Promise<any> {
    return await this.db.find({
      selector: {
        _id: { $gt: 'SURVEY_ANSWERS', $lt: 'SURVEY_ANSWERS\uffff' },
        surqId: surqId,
        sequence: { $gt: 0 }
      }
      ,
      sort: ['surqId', 'sequence']
    })
  }

  async getSurveyQs(survId: string): Promise<any> {
    console.log(survId);
    let sqId = [];
    let rows = await this.db.find({
      selector: {
        _id: { $gt: 'SURVEY_QUESTIONS', $lt: 'SURVEY_QUESTIONS\uffff' },
        survId: survId
        ,
        sequence: { $gt: 0 }
      }
      ,
      sort: ['survId', 'sequence']
    });

    rows.docs.forEach(element => {
      sqId.push(this.getSurveyAs(element._id));
    });

    await Promise.all(sqId)
      .then(res => {
        res.forEach((res2, index) => {
          rows.docs[index].sans = res2.docs;
        })
      });

    return rows;

  }

  async getDocByIdPrefix(idPrefix: string, includeDocs: boolean = true) {
    try {
      return await this.db.allDocs({
        include_docs: includeDocs,
        startkey: idPrefix,
        endkey: idPrefix+"\ufff0"
      })
    }
    catch (err) {
      throw (err);
    }
  }

  async saveDoc(doc): Promise<any> {
    try {
      return await this.db.put(doc)
    }
    catch (err) {
      try {
        let docRev = await this.db.get(doc._id)
        doc._rev = docRev._rev
        return await this.db.put(doc)
      }
      catch (err2) {
        throw err2;
      }
    }
  }

  createAllIndexes() {
    this.db.createIndex({
      index: { fields: ['survId', 'sequence'] }
    });
    this.db.createIndex({
      index: { fields: ['surqId', 'sequence'] }
    });

    // this.db.createIndex({
    //   index: {fields: ['sequence']}
    // });
  }

}
