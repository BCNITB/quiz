import { Component, OnInit } from '@angular/core';

//import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public language:    string;
  public settLang:    string;
  public selectLang:  string;
  public saveLang:    string;

  constructor(private _translate: TranslateService) { }

  ngOnInit() {
    //this.language='ca';
  }

  ionViewDidEnter(){
    this.getDeviceLanguage();
  }

  _initialiseTranslation() {
    this._translate.get("SEETINGS.LANGUAGE").subscribe((res: string) =>{
      this.settLang = res;
    });
    
    this._translate.get("SEETINGS.SELECTED").subscribe((res: string) =>{
      this.selectLang = res;
    });
    
    this._translate.get('SEETINGS.SAVELANGUAGE').subscribe((res: string) => {
      this.saveLang = res;
    });
  }

  public changeLanguage() {
    this._translateLanguage();
  }

  _translateLanguage() {
    this._translate.use(this.language);
    this._initialiseTranslation();
  }

  _initTranslate(language) {
    // Set the default language for translation strings, and the current language.
    this._translate.setDefaultLang('en');
    if (language) {
      this.language = language;
    }
    else {
      // Set your language here
      this.language = 'es';
    }
    this._translateLanguage();
  }

  getDeviceLanguage() {
    if (window.Intl && typeof window.Intl === 'object') {
      this._initTranslate(navigator.language)
    }
    /*else {
      this.globalization.getPreferredLanguage()
        .then(res => {
          this._initTranslate(res.value)
        })
        .catch(e => {console.log(e);});
    }*/
  }

  //Save Language 
  saveLanguage() {
    window.localStorage.setItem('language', this.language);
  }

}