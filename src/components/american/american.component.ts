import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Song } from '../../app/song.model';

@Component({
  selector: 'app-american',
  templateUrl: './american.component.html',
  styleUrls: ['./american.component.css']
})
export class AmericanComponent implements OnInit {

  @Input() songs: Song[];
  @Output() updateList = new EventEmitter();
  @Output() tag = new EventEmitter();
  lyrics: string;

  constructor() { }

  ngOnInit() {
  }

  showLyrics(s: Song) {
    this.lyrics = s.lyrics;
    this.update();
  }

  update(){
    this.updateList.emit();
  }

  searchTag(tag){
    this.tag.emit(tag);
  }

}
