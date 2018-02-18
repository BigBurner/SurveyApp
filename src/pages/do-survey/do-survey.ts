import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SiteProvider } from '../../providers/site/site';
import { UserSurveys } from '../../models/userSurveys.model';
import { UserSurveyAnswers } from '../../models/userSurveys.model';

/**
 * Generated class for the DoSurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-do-survey',
  templateUrl: 'do-survey.html',
})
export class DoSurveyPage {
  selectSurvey = "Start Survey"
  surveys: any[] = [];
  surveyQs: any[] = [];
  selSurvey: any;
  userSurvey: UserSurveys;
  // userSurveyAns: UserSurveyAnswers;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private siteProvider: SiteProvider) {
    this.siteProvider.getSurveys()
    .then(res => {this.surveys = res.rows; console.log(res)});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoSurveyPage');
  }

  onSelect(item){
    console.log("sel",item);
    let proms = [];
    let ua: UserSurveyAnswers;
    this.selSurvey = item;
    this.siteProvider.getSurveyQs(item.doc._id)
    .then(res => {
      console.log(res); 
      this.surveyQs = res.docs;
      this.selectSurvey = item.doc.description;
      this.userSurvey = new UserSurveys("","rushi",item.doc._id);
      // console.log(this.userSurvey)
      this.surveyQs.forEach(q => {
        ua = new UserSurveyAnswers(this.userSurvey._id,q._id,"")
        // console.log(ua)
        proms.push(this.siteProvider.getDocById(ua._id));
      });
      Promise.all(proms)
      .then(res => {
        // console.log("resloved")
        // console.log(res)
        res.forEach((res2, index) => {
          // console.log(res2)
          this.surveyQs[index].suraId = res2.suraId;
        })
      })
      .catch(err => {
        console.log(err)
      });

    })
  }

  onRadioListChange(evnt){
    // console.log("rv",evnt);
  }

  onAnswerSelect(surqId, suraId){
    this.siteProvider.saveDoc(this.userSurvey)
    .then(us => {
      this.siteProvider.saveDoc(new UserSurveyAnswers(us.id,surqId,suraId))
      .then(res => console.log(res))
    })
  }

  compareFn(e1: any, e2: any): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }
}
