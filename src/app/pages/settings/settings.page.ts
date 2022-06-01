import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  language: string="";
  /*title:    string;
  lbl:      string;*/
  
  constructor(
    private _translate: TranslateService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    this.language=window.localStorage.getItem('language');

    if(this.language==""){
      this.getDeviceLanguage();
    } else {
      this._translate.use(this.language);;
    }

  }

  /*ionViewDidEnter(): void {
    this.getDeviceLanguage();
  }*/

  /*_initialiseTranslation(): void {
    this._translate.get('SETTINGS.TITLE').subscribe((res: string) => {
      this.title = res;
    });

    this._translate.get('SETTINGS.LBL').subscribe((res: string) => {
      this.lbl = res;
    });

    /*this._translate.get('TITLE_2', { value: 'John' }).subscribe((res: string) => {
      this.title_2 = res;
    });
    this._translate.get('data.name', { name_value: 'Marissa Mayer' }).subscribe((res: string) => {
      this.name = res;
    });
  }*/

  public changeLanguage(): void {
    this._translateLanguage();
  }

  _translateLanguage(): void {
    this._translate.use(this.language);
    //this._initialiseTranslation();
  }

  _initTranslate(language) {
    // Set the default language for translation strings, and the current language.
    this._translate.setDefaultLang('ca');
    if (language) {
      this.language = language;
    }
    else {
      // Set your language here
      this.language = 'ca';
    }
    this._translateLanguage();
  }

  getDeviceLanguage() {
    if (window.Intl && typeof window.Intl === 'object') {
      this._initTranslate(navigator.language)
    }
    else {
      this._initTranslate(this._translate.getDefaultLang());
    }
  }

  save(){
    window.localStorage.setItem('language', this.language);
    this.navCtrl.navigateForward("/home");
  }
}