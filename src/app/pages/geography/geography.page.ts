import { Component, OnInit } from '@angular/core';

import { QuizService } from 'src/app/services/quiz.service';

import { Questions } from 'src/app/interfaces/questions';
import { QUESTIONS } from 'src/app/enums/data.geography';

@Component({
  selector: 'app-geography',
  templateUrl: './geography.page.html',
  styleUrls: ['./geography.page.scss'],
})
export class GeographyPage implements OnInit {

  questions:  Questions[]=[];

  question:   string;
  answer: string;
  opt_1:      string;
  opt_2:      string;
  opt_3:      string;
  baseUrl:    string;
  
  randNum:  number;
  try:      number;
  score:    number;

  tempString: string;
  tempNum2: number;
  tempNum: number;
  num:number;
  //memoryArray:number[];

  constructor(public quiz: QuizService) {
    this.questions=QUESTIONS.slice(0);
  }

  ngOnInit() {
    this.randNum=this.calcRandom(1,8);
    this.initializeApp();
  }

  calcRandom(a, b){
    return Math.round(Math.random() * (b-a) + parseInt(a,10));
  }

  initializeApp(){
    this.question = this.quiz.getQuestion(this.questions[this.randNum]);
    this.answer = this.quiz.getAnswer(this.questions[this.randNum]);

    this.opt_1 = this.quiz.getPossibilities(this.questions[this.randNum])[0];
    this.opt_2 = this.quiz.getPossibilities(this.questions[this.randNum])[1];
    this.opt_3 = this.quiz.getPossibilities(this.questions[this.randNum])[2];
  }
  
  checkAnswer(value){
    let userAnswer = value;
    this.quiz.setTries(this.questions[this.randNum]);

    if(userAnswer == this.answer){
      
      this.quiz.setGuessed(this.questions[this.randNum]);
      this.try = this.quiz.getTries(this.questions[this.randNum]);
      
      if(this.try == 1){
        this.quiz.setScore(this.questions[this.randNum], 3);
        this.score+3;
      } else if(this.try == 2){
        this.quiz.setScore(this.questions[this.randNum], 1);
        ++this.score;
      }
    }

    this.nextQuestion();

    //this.tempString=userAnswer;
    //this.tempNum=this.score;//this.quiz.getGuessed(this.questions[this.randNum]);
    //this.tempNum2=this.quiz.getGuessed(this.questions[this.randNum]);
  }

  nextQuestion(){
    this.randNum = 0;
    this.randNum = this.calcRandom(1,8);

    let isGuessed = this.quiz.getGuessed(this.questions[this.randNum]);
    let maxTries = 0;

    while(isGuessed==1){
      if(maxTries == 16){
        this.finishGame();
      }

      this.randNum = this.calcRandom(1,8); 

      isGuessed = this.quiz.getGuessed(this.questions[this.randNum]);
      ++maxTries;
    }

    let tries = this.quiz.getTries(this.questions[this.randNum]);

    if(tries == 3){
      this.randNum = this.calcRandom(1,8);
    }

    this.initializeApp();
  }

  finishGame(){

  }
  /*checkAnswer(value){
    let p = this.randNum;
    
    if(value==this.quiz.correctAnswer(this.questions[p])){
      this.quiz.setGuessed(this.questions[p]);
      this.quiz.setTries(this.questions[p]);

      this.try = this.quiz.getTries(this.questions[p]);

      if(this.try==1){
        this.quiz.setScore(this.questions[p], 3);
      } else {
        this.quiz.setScore(this.questions[p], 1);
      }
    } else {
      this.quiz.setTries(this.questions[p]);
    }

    this.randNum=0;

    this.nextQuestion();
  }

  nextQuestion(){
    let p = this.calcRandom(1,3);

    if(this.checkGuessed(this.questions[p])){
      this.nextQuestion();
    }

    if(this.checkTries(this.questions[p])){
      this.nextQuestion();
    }
    

    this.question = this.quiz.showQuestion(this.questions[p]);
    this.opt_1 = this.quiz.showPossibilities(this.questions[p])[0];
    this.opt_2 = this.quiz.showPossibilities(this.questions[p])[1];
    this.opt_3 = this.quiz.showPossibilities(this.questions[p])[2];
  }

  checkGuessed(value){
    if(this.quiz.getGuessed(value)){
      return true;
    }

    return false;
  }

  checkTries(value){
    if(this.quiz.getTries(this.questions[value]) == 3){
      return true;
    }

    return false;
  }

  finishGame(){

  }*/
}