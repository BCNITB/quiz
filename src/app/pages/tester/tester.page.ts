import { Component, OnInit } from '@angular/core';

//import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-tester',
  templateUrl: './tester.page.html',
  styleUrls: ['./tester.page.scss'],
})
export class TesterPage implements OnInit {

  public title: string;
  public title_2: string;
  public description: string;
  public name: string;
  public language: string;

  constructor(
    //private globalization: Globalization, 
    private _translate: TranslateService
  ) { 
    _translate.setTranslation('en', {
      "TITLE": "Bye sir",
      "TITLE_2": "Bye {{value}}",
      "description": "Thanks for translating this text"
      });
      _translate.setTranslation('fr', {
      "TITLE": "Au revoir Monsieur",
      "TITLE_2": "Au revoir  {{value}}",
      "description": "Merci d'avoir traduit ce texte"
      });
      _translate.setTranslation('es', {
      "TITLE": "Adiós señor",
      "TITLE_2": "Adiós {{value}}",
      "description": "Gracias por traducir este texto"
      });
    
  }

  ngOnInit() {
    this.language='es';
    this._translate.use('es');
    this._translate.currentLang;
    
    this.getDeviceLanguage();
    
  }

  /*ionViewDidEnter(): void {
    this.getDeviceLanguage();
  }*/

  _initialiseTranslation(): void {
    this._translate.get('TITLE').subscribe((res: string) => {
      this.title = res;
    });
    this._translate.get('description').subscribe((res: string) => {
      this.description = res;
    });
    this._translate.get('TITLE_2', { value: 'John' }).subscribe((res: string) => {
      this.title_2 = res;
    });
    this._translate.get('data.name', { name_value: 'Marissa Mayer' }).subscribe((res: string) => {
      this.name = res;
    });

  }

  public changeLanguage(): void {
    this._translateLanguage();
  }

  _translateLanguage(): void {
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
  }

  getDeviceLanguage() {
    if (window.Intl && typeof window.Intl === 'object') {
      this._initTranslate(navigator.language)
    }
    else {
      /*this.globalization.getPreferredLanguage()
        .then(res => {
          this._initTranslate(res.value)
        })
        .catch(e => {console.log(e);});*/
        this._initTranslate(this._translate.getDefaultLang());
    }
  }
}