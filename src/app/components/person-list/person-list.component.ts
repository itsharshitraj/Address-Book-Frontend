import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';


@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit{
 persons: Person[] = [];
  

  constructor(private personService: PersonService, private router: Router) {}

  ngOnInit(): void {
    this.personService.persons$.subscribe(data => {
      console.log("Updated person list:", data); // Debugging log
      this.persons = data;
    });
  }

  deletePerson(id: number): void {
    this.personService.deletePerson(id);
  
  }
  editPerson(id: number): void {
    console.log("Navigating to edit person:", id);
    this.router.navigate(['/edit-person',id]);
  }
}
