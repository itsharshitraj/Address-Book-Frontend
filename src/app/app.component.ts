import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {}
  persons = [
    { 
      id: 1, 
      name: 'John Doe', 
      address: '123 Street', 
      city: 'New York', 
      state: 'NY', 
      zip: '10001', 
      phone: '123-456-7890' 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      address: '456 Avenue', 
      city: 'Los Angeles', 
      state: 'CA', 
      zip: '90001', 
      phone: '987-654-3210' 
    }
  ];
  showAddButton(): boolean {
    return this.router.url === '/';
  }
  deletePerson(id: number): void {
    this.persons = this.persons.filter(person => person.id !== id);
  }
}
