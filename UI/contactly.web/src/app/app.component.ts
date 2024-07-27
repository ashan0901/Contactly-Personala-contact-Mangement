import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Conatact } from '../models/contact.model';
import { AsyncPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  http = inject(HttpClient);

  contactsForm = new FormGroup({
    name: new FormControl<String>(''),
    email: new FormControl<String | null>(null),
    phone: new FormControl<String>(''),
    favorite: new FormControl<boolean>(false),
  });

  contacts$ = this.getContacts();

  onFormSubmit() {
    //console.log(this.contactsForm.value);
    const addContactRequest = {
      name: this.contactsForm.value.name,
      email: this.contactsForm.value.email,
      phone: this.contactsForm.value.phone,
      favorite: this.contactsForm.value.favorite,
    };
    this.http
      .post('https://localhost:7281/api/Contacts', addContactRequest)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.contacts$ = this.getContacts();
          this.contactsForm.reset();
        },
      });
  }

  onDelete(id: string) {
    this.http.delete(`https://localhost:7281/api/Contacts/${id}`).subscribe({
      next: (value) => {
        console.log(value);
        alert('Contact deleted successfully!');
        this.contacts$ = this.getContacts();
      },
    });
  }

  private getContacts(): Observable<Conatact[]> {
    return this.http.get<Conatact[]>('https://localhost:7281/api/Contacts');
  }
}
