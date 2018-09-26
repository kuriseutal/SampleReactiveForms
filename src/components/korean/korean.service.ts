import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";

import { Song } from '../../app/song.model';
import { KOREANSONGS } from "./korean";
@Injectable({
  providedIn: "root"
})
export class KoreanService {
  constructor(private httpClient: HttpClient) {}
/*
  getCovers(){
    return this.httpClient
      .get('http://localhost:3000/covers')
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
*/
  getKoreanSongs(term: string): Song[] {
    if (term == "") {
      return KOREANSONGS;
    } else {
      return KOREANSONGS.filter(
        s =>
          s.title.toLowerCase().match(term.toLowerCase()) ||
          s.artist.toLowerCase().match(term.toLowerCase()) ||
          s.album.toLowerCase().match(term.toLowerCase()) ||
          s.tags
            .concat()
            .toString()
            .toLowerCase()
            .match(term.toLowerCase())
      );
    }
  }

  getFavoriteKoreanSongs(term: string): Song[] {
    return KOREANSONGS.filter(
      s => s.isFavorited == true &&
        (s.title.toLowerCase().match(term.toLowerCase()) ||
        s.artist.toLowerCase().match(term.toLowerCase()) ||
        s.album.toLowerCase().match(term.toLowerCase()) ||
        s.tags
          .concat()
          .toString()
          .toLowerCase()
          .match(term.toLowerCase()))
    );
  }
}
