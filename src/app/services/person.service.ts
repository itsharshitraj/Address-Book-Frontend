import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private persons: Person[] = [];
  

  private personsSubject = new BehaviorSubject<Person[]>(this.persons);
  persons$ = this.personsSubject.asObservable();

  getPersons(): Observable<Person[]> {
    return this.persons$;
  }
  
  getPersonById(id: number): Observable<Person | undefined> {
    return new Observable(observer => {
      const person = this.persons.find(p => p.id === id);
      console.log("Fetched person by ID:", person); // Debugging log
      observer.next(person);
      observer.complete();
    });
  }
 
  addPerson(person: Person): void {
    person.id = this.persons.length ? Math.max(...this.persons.map(p => p.id)) + 1 : 1;
    this.persons.push(person);
    console.log("Added person:", person); 
    this.personsSubject.next([...this.persons]);
  }

  updatePerson(updatedPerson: Person): void {
    const index = this.persons.findIndex(p => p.id === updatedPerson.id);
    if (index !== -1) {
      this.persons[index] = {...updatedPerson};
      console.log("Updated person:", updatedPerson); // Debugging log
      this.personsSubject.next([...this.persons]); // Ensure subscribers get the update
    } else {
      console.log("Person not found for update:", updatedPerson.id);
    }
  }
  

  deletePerson(id: number): void {
    console.log("Before delete, persons list:", this.persons);
    this.persons = this.persons.filter(person => person.id !== id);
    console.log("Deleted person ID:", id); 
    console.log("After delete, persons list:", this.persons);
    this.personsSubject.next([...this.persons]);
  }
}