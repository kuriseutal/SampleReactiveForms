import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Song } from "../app/song.model";
import { KoreanService } from "./korean.service";

@Component({
  selector: "app-korean",
  templateUrl: "./korean.component.html",
  styleUrls: ["./korean.component.css"]
})
export class KoreanComponent implements OnInit {
  
  @Input() songs: Song[];
  @Output() updateList = new EventEmitter();
  @Output() tag = new EventEmitter();
  lyrics: string;
  
  constructor(private koreanService: KoreanService) {}
  
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
