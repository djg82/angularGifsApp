import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apikey: string = 'zPp1bPYBxfQN0k2L40K8VR0215oJIbXl';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizaHistotory(tag: string) {
    tag = tag.toLowerCase().trim();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    sessionStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }
  private loadLocalStorage(): void {
    const temp = sessionStorage.getItem('history');
    if (!temp) return;
    this._tagsHistory = JSON.parse(temp);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }
  searchTag(tag: string): void {
    console.log({ tag });
    if (tag.length === 0) return;
    this.organizaHistotory(tag);
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', 20)
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
        // console.log(resp.data);
      });
  }
}

// async searchTag(tag: string): Promise<void> {
//   if (tag.length === 0) return;
//   this.organizaHistotory(tag);
//   // this._tagsHistory.unshift(tag);
//   // console.log(this._tagsHistory);
//   // console.log(this.tagsHistory);
//   fetch(
//     `https://api.giphy.com/v1/gifs/search?api_key=zPp1bPYBxfQN0k2L40K8VR0215oJIbXl&q=${tag}&limit=20&offset=10`
//   )
//     .then((resp) => resp.json())
//     .then((data) => console.log(data));
// }
