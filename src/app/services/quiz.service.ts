import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  getQuestion(value){
    return value.question;
  }

  getPossibilities(value){
    let options = [value.option_1, value.option_2, value.option_3];
  
    return options;
  }

  getAnswer(value){
    return value.answer;
  }

  setGuessed(value){
    value.guessed = 1;
  }

  getGuessed(value){
    return value.guessed;
  }

  setTries(value){
    value.tries++;
  }

  getTries(value){
    return value.tries
  }

  setScore(value, point){
    value.points + point;
  }

  getScore(value){
    return value.points
  }
}