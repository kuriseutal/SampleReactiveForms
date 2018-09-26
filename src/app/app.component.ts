import { Component, TemplateRef, OnInit } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { FormBuilder, Validators, FormArray } from "@angular/forms";

import { Song } from "./song.model";
import { KoreanService } from "../components/korean/korean.service";
import { AmericanService } from "../components/american/american.service";

export type EditorType = "korean" | "american" | "game";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  songs: Song[];
  favorites: Song[];

  //error messages
  titleMsg: string = "";
  artistMsg: string = "";
  albumMsg: string = "";
  dateMsg: string = "";
  tagMsg: string = "";

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private koreanService: KoreanService,
    private americanService: AmericanService
  ) {
  }

  editor: EditorType = "korean";
  modalRef: BsModalRef;

  //for error
  songExists: boolean = false;
  modalRef2: BsModalRef;

  songForm = this.fb.group({
    title: ["", Validators.required],
    artist: ["", Validators.required],
    album: ["", Validators.required],
    date: ["", Validators.required],
    extraInfo: this.fb.group({
      lyrics: [""],
      chords: [""]
    }),
    tags: this.fb.array([this.fb.control("", Validators.required)])
  });

  more: boolean = false;
  viewOption: string = "everything";
  sortOption: string = "title";
  term: string = "";

  searchSuggestions: string[];

  idList: number[] = [];
  uploadedImage: string = "http://dalelyles.com/musicmp3s/no_cover.jpg";
  
  ngOnInit() {
    this.songs = this.koreanService.getKoreanSongs("").sort(this.sortByTitleAsc);
    

    for(let i = 0; i < this.songs.length; i++){
      this.searchSuggestions.push(this.songs[i].title);
      this.searchSuggestions.push(this.songs[i].artist);
      this.searchSuggestions.push(this.songs[i].);
    }
  }

  get tags() {
    return this.songForm.get("tags") as FormArray;
  }

  search(term: string): void {
    if(term.length == 0){
      this.term = "";
    }else{
      this.term = term;
    }
    this.getList(); 
  }

  uploadImage(){
    let url  = prompt("Please enter your image URL", "");
    if (url.length != 0 || url != null) {
      this.uploadedImage = url;
    }else{
      this.uploadedImage = "http://dalelyles.com/musicmp3s/no_cover.jpg";
    }
  }

  addTag() {
    if (this.tags.valid) {
      this.tags.push(this.fb.control(""));
    } else {
      console.log("error");
    }
  }

  removeTag(i){
    if(this.tags.length != 1){
      this.tags.removeAt(i);
    }
  }

  onSubmit() {
    if (this.songForm.status == "VALID") {

      for (let i = 0; i < this.songs.length; i++) {
        this.idList.push(this.songs[i].id);
        //check if song is already added
        if (
          this.songs[i].title == this.songForm.get("title").value &&
          this.songs[i].album == this.songForm.get("album").value
        ) {
          this.songExists = true;

          break;
        } else {
          this.songExists = false;
        }
      }
      if (this.songExists == false) {
        let lyrics: string;
        let chords: string;
        if (this.more == true) {
          lyrics = this.songForm.get("extraInfo.lyrics").value;
          chords = this.songForm.get("extraInfo.chords").value;
        } else {
          lyrics = "";  
          chords = "";
        }

        let newSong: Song = {
          id: Math.max(...this.idList) + 1,
          isFavorited: false,
          isLyricsShown: false,
          img: this.uploadedImage,
          title: this.songForm.get("title").value,
          artist: this.songForm.get("artist").value,
          album: this.songForm.get("album").value,
          date: this.songForm.get("date").value,
          lyrics: lyrics,
          chords: chords,
          tags: this.songForm.get("tags").value
        };
        this.songs.push(newSong);
        this.sortList(this.sortOption);
      }
    } else {
      //check title error
      if (this.songForm.get("title").status == "INVALID") {
        this.titleMsg = "Title is required";
      } else if (this.songForm.get("title").status == "VALID") {
        this.titleMsg = " ";
      }
      //check artist error
      if (this.songForm.get("artist").status == "INVALID") {
        this.artistMsg = "Artist is required";
      } else if (this.songForm.get("artist").status == "VALID") {
        this.artistMsg = " ";
      }
      //check album error
      if (this.songForm.get("album").status == "INVALID") {
        this.albumMsg = "Album is required";
      } else if (this.songForm.get("album").status == "VALID") {
        this.albumMsg = " ";
      }
      //check date error
      if (this.songForm.get("date").status == "INVALID") {
        this.dateMsg = "Date is required";
      } else if (this.songForm.get("date").status == "VALID") {
        this.dateMsg = " ";
      }
      //check tag error
      if (this.songForm.get("tags").status == "INVALID") {
        this.tagMsg = "Tag is required";
      } else if (this.songForm.get("tags").status == "VALID") {
        this.tagMsg = " ";
      }
    }
  }

  clearAllMsgs() {
    this.titleMsg = "";
    this.artistMsg = "";
    this.albumMsg = "";
    this.dateMsg = "";
    this.tagMsg = "";
  }

  showMore() {
    this.more = !this.more;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  openModal2(template: TemplateRef<any>, error: boolean) {
    if (error) {
      this.modalRef2 = this.modalService.show(template, { class: "modal-md" });
    }
  }

  get showKoreanEditor() {
    return this.editor === "korean";
  }

  get showGameEditor() {
    return this.editor === "game";
  }

  get showAmericanEditor() { 
    return this.editor === "american";
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }

  searchTag(tag){
    this.term = tag;
    this.getList();
  }

  changeList() {
    //transfering to another tab will view everything by title
    switch (this.editor) {
      case "korean":
        this.songs = this.koreanService
          .getKoreanSongs(this.term)
          .sort(this.sortByTitleAsc);
        break;

      case "american":
        this.songs = this.americanService
          .getAmericanSongs(this.term)
          .sort(this.sortByTitleAsc);
        break;
    }
  }

  viewList(option: string) {
    this.viewOption = option;
    this.getList();
  }

  sortList(option: string) {
    this.sortOption = option;
    this.getList();
  }

  updateList() {
    this.getList();
  }

  getList() {
    switch (this.editor) {
      case "korean":
        if (this.viewOption == "everything" && this.sortOption == "title") {
          this.songs = this.koreanService
            .getKoreanSongs(this.term)
            .sort(this.sortByTitleAsc);
        } else if (
          this.viewOption == "favorites" &&
          this.sortOption == "title"
        ) {
          this.songs = this.koreanService
            .getFavoriteKoreanSongs(this.term)
            .sort(this.sortByTitleAsc);
        } else if (
          this.viewOption == "everything" &&
          this.sortOption == "artist"
        ) {
          this.songs = this.koreanService
            .getKoreanSongs(this.term)
            .sort(this.sortByArtistAsc);
        } else if (
          this.viewOption == "favorites" &&
          this.sortOption == "artist"
        ) {
          this.songs = this.koreanService
            .getFavoriteKoreanSongs(this.term)
            .sort(this.sortByArtistAsc);
        } else if (
          this.viewOption == "everything" &&
          this.sortOption == "date"
        ) {
          this.songs = this.koreanService
            .getKoreanSongs(this.term)
            .sort(this.sortByDateAsc);
        } else if (
          this.viewOption == "favorites" &&
          this.sortOption == "date"
        ) {
          this.songs = this.koreanService
            .getFavoriteKoreanSongs(this.term)
            .sort(this.sortByDateAsc);
        }
        break;

      case "american":
        if (this.viewOption == "everything" && this.sortOption == "title") {
          this.songs = this.americanService
            .getAmericanSongs(this.term)
            .sort(this.sortByTitleAsc);
        } else if (
          this.viewOption == "favorites" &&
          this.sortOption == "title"
        ) {
          this.songs = this.americanService
            .getFavoriteAmericanSongs(this.term)
            .sort(this.sortByTitleAsc);
        } else if (
          this.viewOption == "everything" &&
          this.sortOption == "artist"
        ) {
          this.songs = this.americanService
            .getAmericanSongs(this.term)
            .sort(this.sortByArtistAsc);
        } else if (
          this.viewOption == "favorites" &&
          this.sortOption == "artist"
        ) {
          this.songs = this.americanService
            .getFavoriteAmericanSongs(this.term)
            .sort(this.sortByArtistAsc);
        } else if (
          this.viewOption == "everything" &&
          this.sortOption == "date"
        ) {
          this.songs = this.americanService
            .getAmericanSongs(this.term)
            .sort(this.sortByDateAsc);
        } else if (
          this.viewOption == "favorites" &&
          this.sortOption == "date"
        ) {
          this.songs = this.americanService
            .getFavoriteAmericanSongs(this.term)
            .sort(this.sortByDateAsc);
        }
        break;
    }
  }

  //#region sorting functions
  sortByTitleAsc(a: Song, b: Song) {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  }
  sortByArtistAsc(a: Song, b: Song) {
    if (a.artist < b.artist) return -1;
    if (a.artist > b.artist) return 1;
    return 0;
  }
  sortByDateAsc(a: Song, b: Song) {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  }
  //#endregion
}
