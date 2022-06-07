import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { FinishGamePage } from '../finish-game/finish-game.page';

//LANGUAGE
import { TranslateService } from '@ngx-translate/core';

import { QuizService } from 'src/app/services/quiz.service';

//QUESTIONS
import { Questions } from 'src/app/interfaces/questions';
import { CA_QUESTIONS } from 'src/app/enums/ca.data.geography';
import { ES_QUESTIONS } from 'src/app/enums/es.data.geography';
import { EU_QUESTIONS } from 'src/app/enums/eu.data.geography';
import { GL_QUESTIONS } from 'src/app/enums/gl.data.geography';

@Component({
  selector: 'app-geography',
  templateUrl: './geography.page.html',
  styleUrls: ['./geography.page.scss'],
})
export class GeographyPage implements OnInit {

  questions:  Questions[]=[];

  language:     string;
  question:     string;
  answer:       string;
  opt_1:        string;
  opt_2:        string;
  opt_3:        string;
  baseUrl:      string;
  
  randNum:      number;
  score:        number;
  countClicks:  number;
  countGuess:   number;
  guessRatio:   number;

  constructor(
    public quiz: QuizService,
    private _translate: TranslateService,
    private navCtrl: NavController,
  ) {
    this.language="";
    this.score=0;
    this.countClicks=0;
    this.countGuess=0;
    this.guessRatio=0;

    this.language=window.localStorage.getItem('language');
    
    if(this.language==""){
      this.getDeviceLanguage();
    } else {
      this._translate.use(this.language);;
    }
    
    switch(this.language){
      case "ca":
        this.questions=CA_QUESTIONS.slice(0);
        break;
      
      case "es":
        this.questions=ES_QUESTIONS.slice(0);
        break;

      case "eu":
        this.questions=EU_QUESTIONS.slice(0);
        break;

      case "gl":
        this.questions=GL_QUESTIONS.slice(0);
        break;
    }
  }

  ngOnInit() {
    this.randNum=this.calcRandom(0,this.questions.length-1);
    this.initializeApp();
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

  calcRandom(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
    //return Math.round(Math.random() * (b-a) + parseInt(a,2*this.questions.length));
  }

  initializeApp(){
    this.question = this.quiz.getQuestion(this.questions[this.randNum]);
    this.answer = this.quiz.getAnswer(this.questions[this.randNum]);

    this.opt_1 = this.quiz.getPossibilities(this.questions[this.randNum])[0];
    this.opt_2 = this.quiz.getPossibilities(this.questions[this.randNum])[1];
    this.opt_3 = this.quiz.getPossibilities(this.questions[this.randNum])[2];
  }
  
  getUserAnswer(value){
    this.countClicks++;

    let userAnswer = value;
    
    this.checkAnswer(userAnswer);
  }

  checkAnswer(userAnswer){
    this.countClicks++;
    
    let correctAnswer=this.quiz.getAnswer(this.questions[this.randNum]);

    
    if(correctAnswer==userAnswer){
      this.quiz.setGuessed(this.questions[this.randNum]);
    }

    this.countTry(userAnswer);
  }

  countTry(userAnswer){
    let counter=this.quiz.getTries(this.questions[this.randNum]);

    
    this.quiz.setTries(this.questions[this.randNum]);

    this.addScore(userAnswer);
  }

  addScore(userAnswer){
    let correctAnswer=this.quiz.getAnswer(this.questions[this.randNum]);
    let countTries=this.quiz.getTries(this.questions[this.randNum]);

    if(userAnswer==correctAnswer){
      this.countGuess++;

      if(countTries==1){
        this.quiz.setScore(this.questions[this.randNum], 5);
        this.score=this.score+5;
      } else if(countTries==2){
        this.quiz.setScore(this.questions[this.randNum], 2);
        this.score=this.score+2;
      }
    }

    this.guessRatio=Math.round(200*(this.countGuess/this.countClicks));
    this.checkForMoreQuestions();
  }

  nextQuestion(){
    
    this.randNum = 0;
    this.randNum = this.calcRandom(0,this.questions.length-1);

    let guessed = this.quiz.getGuessed(this.questions[this.randNum]);
    
    
    if(guessed == 1){
      this.nextQuestion();
    }

    let tries = this.quiz.getTries(this.questions[this.randNum]);

    if(tries == 1){
      this.nextQuestion();
    }

    this.initializeApp();
  }

  checkForMoreQuestions(){
    let count=0;

    for(let i=0;i<this.questions.length; i++){
      if(this.quiz.getGuessed(this.questions[i])==1 || this.quiz.getTries(this.questions[i])==1){
        count++;
      }
    }

    console.log("QUESTIONS:", count);

    if(count==this.questions.length-1){
      this.endGame(this.score, this.guessRatio);
    } else {
      this.nextQuestion();
    }
  }

  endGame(score, ratio){
    window.localStorage.setItem('score', score);
    window.localStorage.setItem('ratio', ratio);

    this.navCtrl.navigateForward('/finish-game');
  }
}