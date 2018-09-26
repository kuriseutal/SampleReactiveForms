import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import { Song } from '../../app/song.model';
import { AMERICANSONGS } from "./american";

@Injectable({
  providedIn: "root"
})
export class AmericanService {
  constructor(private httpClient: HttpClient) {}

  getAmericanSongs(term: string): Song[] {
    if (term == "") {
      return AMERICANSONGS;
    } else {
      return AMERICANSONGS.filter(
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

  getFavoriteAmericanSongs(term: string): Song[] {
    return AMERICANSONGS.filter(
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
