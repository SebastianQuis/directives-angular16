import { Component, inject, OnInit, signal } from '@angular/core';

import { UserService } from '../../services/user-service.service';
import { User } from '../../interfaces/user-response.interface';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  private userService = inject(UserService);

  public userId = signal(1);
  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal(true);

  ngOnInit(): void {
    this.loadUser(this.userId());
  }


  loadUser(value: number): void {
    if (this.userId() < 1) return;

    this.userId.set(this.userId() + value); // establecer el valor del signal userId
    this.currentUser.set(undefined); // limpiar el valor del signal currentUser

    this.userService.getUserInfo(this.userId())
      .subscribe(
        user => {
          this.currentUser.set(user);

        }
      )
  }



}
