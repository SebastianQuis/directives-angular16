import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { User, UserReponse } from '../interfaces/user-response.interface';

@Injectable({ providedIn: 'root' })
export class UserService {

  public http = inject(HttpClient);
  public baseUrl = 'https://reqres.in/api/users';

  // api-key: free_user_3H9jRbJCB98aoobkWg9v9Cxs1hz

  getUserInfo(userId: number): Observable<User> {

    const url = `${this.baseUrl}/${userId}`;

    // agregar el bearer a la cabecera de la petición
    return this.http.get(url, {
      headers: {
        'x-api-key': 'free_user_3H9jRbJCB98aoobkWg9v9Cxs1hz'
      }
    })
      .pipe(
        map(response => (response as UserReponse).data),
        tap(data => console.log('User data:', data)),
      );
  }


}
