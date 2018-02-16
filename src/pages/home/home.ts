import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SiteProvider } from '../../providers/site/site';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedSite: any = "";
  selectedDev: any = "";

  callback;

  constructor(public navCtrl: NavController, public siteProvider: SiteProvider) {
    let _that = this;
    this.callback = function (_params) {
      return new Promise((resolve, reject) => {
        console.log('In callback:', _params);
        _that.selectedSite = _params.doc;
        resolve();
        this.siteProvider.getDocById(_params.doc.devParId)
        .then(res => {console.log("dev",res); _that.selectedDev = res;});
      });
    }

  }

  startSurvey(){
    this.navCtrl.push ('DoSurveyPage')
  }
  bclick() {
    this.siteProvider.loadDB();
    // this.namx = "xxx"
  }

  gotoSiteSearch() {
    this.navCtrl.push('SearchPage', { devParty: this.selectedDev, dataCallback: this.callback });
  }

  gotoDevSearch(){

  }
  repDB(){
    this.siteProvider.repDB();
  }
}
