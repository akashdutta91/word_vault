import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  data = {};
  dataLoaded = false;
  currentQuestionKeyIndex = 0;
  currentQuestionKey = '';
  currentQuestions = {};
  currentIndex = 0;
  disableOk = true;
  selectedAnswer = '';
  isSelected = [];
  vaultImage = "assets/images/fl/lock0001.png";
  constructor(private commonService: CommonService) { }
  ngOnInit() {
    this.commonService.getQuestions().subscribe((res) => {
      this.data = res;
      this.dataLoaded = true;
      this.currentQuestionKey = Object.keys(this.data['rounds'])[this.currentQuestionKeyIndex];
      this.currentQuestions = this.data['rounds'][this.currentQuestionKey];
    });
  }
  setAnswers(selectedAns, index) {
    this.disableOk = false;
    this.selectedAnswer = selectedAns;
    this.isSelected = [];
    this.isSelected[index] = true;
  }
  checkAnswers() {
    let imgName = '';
    let imgIndex = this.currentQuestions['questions'][this.currentIndex].startIndex;
    this.disableOk = true;
    this.isSelected = [];
    if (this.currentQuestions['questions'][this.currentIndex].answers[this.currentQuestions['questions'][this.currentIndex].correctAnswer - 1] === this.selectedAnswer) {
      if (this.currentIndex < this.currentQuestions['questions'].length - 1) {
        let interval = setInterval(() => {
          if (imgIndex > this.currentQuestions['questions'][this.currentIndex].endIndex) {
            clearInterval(interval);
            this.currentIndex++;
          }
          else {
            if (imgIndex.toString().length === 1) {
              imgName = "assets/images/fl/lock000" + imgIndex + ".png";
            }
            else if (imgIndex.toString().length === 2) {
              imgName = "assets/images/fl/lock00" + imgIndex + ".png";
            }
            else if (imgIndex.toString().length === 3) {
              imgName = "assets/images/fl/lock0" + imgIndex + ".png";
            }
            this.vaultImage = imgName;
            imgIndex++;
          }
        }, 50);
      }
      else {
        if (this.currentQuestionKeyIndex < Object.keys(this.data['rounds']).length - 1) {
          let interval = setInterval(() => {
            if (imgIndex > this.currentQuestions['questions'][this.currentIndex].endIndex) {
              clearInterval(interval);
              this.currentQuestionKeyIndex++;
              this.currentQuestionKey = Object.keys(this.data['rounds'])[this.currentQuestionKeyIndex];
              this.currentQuestions = this.data['rounds'][this.currentQuestionKey];
              this.currentIndex = 0;
            }
            else {
              if (imgIndex.toString().length === 1) {
                imgName = "assets/images/fl/lock000" + imgIndex + ".png";
              }
              else if (imgIndex.toString().length === 2) {
                imgName = "assets/images/fl/lock00" + imgIndex + ".png";
              }
              else if (imgIndex.toString().length === 3) {
                imgName = "assets/images/fl/lock0" + imgIndex + ".png";
              }
              this.vaultImage = imgName;
              imgIndex++;
            }
          }, 50);
        }
      }
    }
  }
}
