import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-response.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnInit {


  public user = signal<User>({
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg"
  });

  public fullName = computed(() => `${this.user().first_name} ${this.user().last_name}`);
  public counter = signal(10);



  onEmailChange(key: keyof User, value: string): void {

    // Inseguro, puede llegar propiedades que no existan en el objeto user, por eso se usa keyof User
    // this.user.update(current => ({
    //   ...current,
    //   [key]: value
    // }));


    // Seguro, solo permite propiedades que existan en el objeto user
    this.user.update(current => {
      switch (key) {
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        default:
          break;
      }

      return current;
    });
  }

  changeCounter(value: number): void {
    this.counter.update(current => current + value);
  }

  // no es necesario la dependencia del efecto, directamente el effect lo aplica
  public userChangeEffect = effect(() => {
    console.log(`counter: ${this.counter()} - name: ${this.user().first_name}`);
  });

  ngOnInit(): void {
    setInterval(() => {
      this.counter.update(current => current + 1);

      if (this.counter() === 14) {
        // destruyendo el efecto, cuando llega a 4
        this.userChangeEffect.destroy();
        return;
      }
    }, 1000);
  }


}
