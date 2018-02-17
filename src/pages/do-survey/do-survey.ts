import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SiteProvider } from '../../providers/site/site';
import { UserSurveys } from '../../models/userSurveys.model';

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
  surveyAs: any[] = [];
  selSurvey: any;
  sel

  constructor(public navCtrl: NavController, public navParams: NavParams, private siteProvider: SiteProvider) {
    this.siteProvider.getSurveys()
    .then(res => {this.surveys = res.rows; console.log(res)});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoSurveyPage');
  }

  onSelect(item){
    console.log("sel",item);
    this.selSurvey = item;
    this.siteProvider.getSurveyQs(item.doc._id)
    .then(res => {
      console.log(res); 
      this.surveyQs = res.docs;
      this.selectSurvey = item.doc.description;
    })
  }

  compareFn(e1: any, e2: any): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }
}
