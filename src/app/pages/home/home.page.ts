import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  language: string;

  constructor(
    private _translate: TranslateService,
    private navCtrl: NavController
  ) {
    this.language="";
   }

  ngOnInit() {
    this.language=window.localStorage.getItem('language');

    
    
    if(this.language==""){
      this.getDeviceLanguage();
    } else {
      this._translate.use(this.language);;
    }

    console.log("EL IDIOMA ES:", this.language);
  }

  _translateLanguage(): void {
    this._translate.use(this.language);
  }

  _initTranslate(language) {
    // Set the default language for translation strings, and the current language.
    this._translate.setDefaultLang('ca');
    if (language) {
      this.language = language;
    } else {
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
}