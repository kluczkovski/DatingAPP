import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_models/message';
import { JsonPipe } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) { }

  //getUsers(): Observable<User[]> {
  //  return this.http.get<User[]>(this.baseUrl);
  //}

  getUsers(page?, itemsPerPage?, userParms?, likesParmrs?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParms != null) {
      params = params.append('minAge', userParms.minAge);
      params = params.append('maxAge', userParms.maxAge);
      params = params.append('gender', userParms.gender);
      params = params.append('orderBy', userParms.orderBy);
    }

    if (likesParmrs === 'Likers') {
      params = params.append('likers', 'true');
    }

    if (likesParmrs === 'Likees') {
      params = params.append('likees', 'true');
    }

    return this.http.get<User[]>(this.baseUrl, { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null ) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + '/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl +  '/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl +  '/' + userId + '/photos/' + id);
  }

  sendLike(userId: number, recipientId: number) {
    return this.http.post(this.baseUrl + '/' + userId + '/like/' + recipientId, {});
  }

  getMessages(userId: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

    let params = new HttpParams();
    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Message[]>(this.baseUrl + '/' +  userId + '/messages/', {observe: 'response', params})
      .pipe(
        map( response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
      })
    );
  }

  getMessageThread(userId: number, recipientId: number) {
    return this.http.get<Message[]>(this.baseUrl + '/' + userId + '/messages/thread/' + recipientId);
  }

  sendMessage(loginUserId: number, message: Message) {
    return this.http.post(this.baseUrl + '/' + loginUserId + '/messages/', message);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(this.baseUrl + '/' + userId + '/messages/' + id, {});
  }

  markAsRead(userId: number, messageId: number) {
    return this.http.post(this.baseUrl + '/' + userId + '/messages/' + messageId + '/read', {})
      .subscribe();
  }
}
