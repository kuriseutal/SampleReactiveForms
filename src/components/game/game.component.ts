import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  keyPressed: number;
  text: string = "Press start to begin";
  score: number = 0;
  time: number = 15;

  il: string = "T";
  i: string = "A";
  sam: string = "P";
  sa: string = "A";
  o: string = "W";
  yuk: string = "-";
  chil: string = "A";
  pal: string = "Y";
  gu: string = "!";

  array: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  interval: any;

  constructor() {}

  ngOnInit() {}

  onGetKey(event: KeyboardEvent) {
    this.keyPressed = event.keyCode;

    if (this.keyPressed == 103 && this.text == this.il) {
      this.score += 1; //this.time += 1;  
    }
    else if (this.keyPressed == 104 && this.text == this.i) {
      this.score += 1; //this.time += 1;  
    }
    else if (this.keyPressed == 105 && this.text == this.sam) {
      this.score += 1; //this.time += 1;  
    }
    else if (this.keyPressed == 100 && this.text == this.sa) {
      this.score += 1; //this.time += 1;  
    }
    else if (this.keyPressed == 101 && this.text == this.o) {
      this.score += 1; //this.time += 1;  
    }
    else if (this.keyPressed == 102 && this.text == this.yuk) {
      this.score += 1; //this.time += 1;  
    }
    else if (this.keyPressed == 97 && this.text == this.chil) {
      this.score += 1; //this.time += 1;  
    }
    else if (this.keyPressed == 98 && this.text == this.pal) {
      this.score += 1; //this.time += 1;  
    }
    else if (this.keyPressed == 99 && this.text == this.gu) {
      this.score += 1; //this.time += 1;  
    }
    else this.score -= 1;

    if(this.score == 10)
    this.time = 14;
    if(this.score == 20)
      this.time = 13;
      if(this.score == 30)
        this.time = 12;
        if(this.score == 40)
          this.time = 11;
          if(this.score == 50)
            this.time = 10;
            if(this.score == 60)
              this.time = 9;
              if(this.score == 70)
                this.time = 8;
                if(this.score == 80)
                  this.time = 7;
                  if(this.score == 90)
                    this.time = 6;
                    if(this.score == 100)
                      this.time = 5;

    if (this.score < 0) {
      this.quitGame();
    } else {
      this.shuffleArray();
    }
  }

  startGame() {
    this.time = 15;

    this.shuffleArray();

    this.interval = setInterval(() => {
      this.time -= 1;
      
      if(this.time < 0){
        this.time = 0;
        this.quitGame();
      }

    }, 1000);
  }

  shuffleArray() {
    for (let i = this.array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.array[i];
      this.array[i] = this.array[j];
      this.array[j] = temp;

      this.il = this.array[0];
      this.i = this.array[1];
      this.sam = this.array[2];
      this.sa = this.array[3];
      this.o = this.array[4];
      this.yuk = this.array[5];
      this.chil = this.array[6];
      this.pal = this.array[7];
      this.gu = this.array[8];

      this.text = this.array[Math.floor(Math.random() * 8)];
    }
  }

  quitGame() {
    this.keyPressed = 81;
    console.log(this.score);
    if (this.score < 0 || this.time == 0) {
      this.score = 0;
      this.text = "You Lose! Press start to try again";
    } else {
      this.text = "Press start to begin";
    }

    clearTimeout(this.interval);
  }
}
