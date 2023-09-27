import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ChatOxAi-clint';
  chats: any[]=[];
  chat_content!: string;
  questionNumber: number = 0;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  sendChat() {
    let chat = this.chat_content;
    if (this.questionNumber >= 1) {
      this.questionNumber++;
    } else {
      this.questionNumber = 1;
    }
    this.chats.unshift({
      q_number: this.questionNumber,
      response: '',
      chat_qustion: chat,
    });
    this.chat_content = '';
    this.http
      .post(
        `http://localhost:8000/inputs`,
        { content: chat, number: this.questionNumber },
        { withCredentials: true }
      )
      .subscribe((res: any) => {
        console.log(res.q_no);
        let isThere = this.chats.findIndex(
          (items) => items.q_number == res.q_no
        );
        this.chats[isThere].response = res.chat;
    console.log(this.chats[isThere]);

      });
  }
}
