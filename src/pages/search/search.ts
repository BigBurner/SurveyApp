import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SiteProvider } from '../../providers/site/site';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  allItems: any[];
  items: any[];
  selItems: any[] = [];;
  selItemIds: any[] = [];;
  queryDone: boolean = false;
  dataCallback;
  searchTerm: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private siteProvider: SiteProvider) {
  }

  ionViewDidLoad() {
    this.dataCallback = this.navParams.get("dataCallback");
    console.log('ionViewDidLoad SearchPage');
  }

  lclick(item) {
    console.log(item.doc)
    if (this.isItemSelected(item)) {
      this.deleteSelectedItem(item);
    }
    else {
      this.addSelectedItem(item);
    }
  }

  getItems(ev) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      if (!this.queryDone) {
        this.queryDone = true;
        this.siteProvider.getAllSites()
          .then(res => {
            this.allItems = res;
            console.log("intialized.....will display on next char");
            console.log('got1',this.allItems.length);
            // this.items = this.allItems.filter((item) => {
            //   console.log(item);
            //   if ('name' in item.doc)
            //     return (item.doc.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            //   else
            //     return (item.doc.desc.toLowerCase().indexOf(val.toLowerCase()) > -1);
            // })
          })
          .catch(err => {
            console.log(err);
          });
      }
      else {
          if (this.searchTerm && val.toLowerCase().indexOf(this.searchTerm) > -1){
            console.log('Reusing');
            this.items = this.items.filter((item) => {
              // console.log(item);
              return (item.doc.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })                
          }
          else{
            this.items = this.allItems.filter((item) => {
              // console.log(item);
              return (item.doc.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })    
          }
        this.searchTerm = val.toLowerCase();
    
        console.log('got',this.items.length);
      }
    }
  }
  okClick() {
    this.dataCallback(this.selItems[0])
      .then(res => this.navCtrl.pop());
  }

  addSelectedItem(item: any) {
    this.selItems = [];
    this.selItemIds = [];
    this.selItems.push(item);
    this.selItemIds.push(item.doc._id);
  }

  isItemSelected(item: any) {
    if (this.selItemIds) {
      return this.selItemIds.indexOf(item.doc._id) >= 0;
    }
    else {
      return false;
    }
  }

  deleteSelectedItem(item: any) {
    let idx = this.selItemIds.indexOf(item.doc._id);
    if (idx > -1) {
      this.selItemIds.splice(idx, 1);
      this.selItems.splice(idx, 1);
    }
  }
}
