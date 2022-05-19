import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  language: string; 
  wellcomeLang: string;
  phraseLang:   string;
  geoLang:      string;

  constructor(private _translate: TranslateService) { }

  ngOnInit() {
    
  }

  /*_initialiseTranslation() {
    this._translate.get("HOME.WELLCOME").subscribe((res: string) =>{
      this.wellcomeLang = res;
    });
    
    this._translate.get("HOME.PHRASE").subscribe((res: string) =>{
      this.phraseLang = res;
    });
    
    this._translate.get('HOME.GEO').subscribe((res: string) => {
      this.geoLang = res;
    });
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
      this.language = 'en';
    }
    this._translateLanguage();
  }*/
}
