import { Component, OnInit } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';

//LANGUAGE
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-finish-game',
  templateUrl: './finish-game.page.html',
  styleUrls: ['./finish-game.page.scss'],
})
export class FinishGamePage implements OnInit {

  language: string;

  score:    number;
  ratio:    number;

  constructor(
    private navCtrl: NavController,
    private _translate: TranslateService,
    private platform: Platform
  ) { 
    this.language="";
    this.score=parseInt(window.localStorage.getItem('score'));
    this.ratio=parseInt(window.localStorage.getItem('ratio'));
  }

  ngOnInit() {
    this.language=window.localStorage.getItem('language');
    
    if(this.language==""){
      this.getDeviceLanguage();
    } else {
      this._translate.use(this.language);;
    }  
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

  newGame(){
    this.navCtrl.navigateForward('/home');
  }

  exitGame(){
    navigator['app'].exitApp();
  }
}
