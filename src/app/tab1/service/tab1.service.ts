import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiInterface } from '../type/tab1.interface';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = 'https://api.github.com';

  constructor(private httpClient: HttpClient) {}

  getUser(username:string): Observable<ApiInterface[]> {
    return this.httpClient.get<ApiInterface[]>(this.apiUrl+"/users/"+username);
  }
}