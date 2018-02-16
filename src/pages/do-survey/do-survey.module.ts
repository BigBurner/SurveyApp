import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoSurveyPage } from './do-survey';

@NgModule({
  declarations: [
    DoSurveyPage,
  ],
  imports: [
    IonicPageModule.forChild(DoSurveyPage),
  ],
})
export class DoSurveyPageModule {}
