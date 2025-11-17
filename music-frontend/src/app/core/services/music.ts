import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Music_model {
  id: number;
  Title: string;
  File: string;
}

@Injectable({
  providedIn: 'root',
})

export class Music {
  private apiUrl = 'http://10.190.162.37:8000/api/music/';
  constructor(private http: HttpClient) { }

  getMusicList(): Observable<Music_model[]> {
    return this.http.get<Music_model[]>(this.apiUrl)
  }

  deleteMusic(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
