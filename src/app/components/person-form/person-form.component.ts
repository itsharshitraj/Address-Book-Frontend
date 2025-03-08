import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // ✅ Fix: Import ReactiveFormsModule
  templateUrl: './person-form.component.html',
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;
  editingPersonId: number | null = null;

  constructor(private fb: FormBuilder, 
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute ) 
    {
    this.personForm = this.fb.group({
      name: [''],
      phone: [''],
      address: ['']
    });
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.editingPersonId = +params['id'];
        this.personService.getPersonById(this.editingPersonId).subscribe(person => {
          if (person) {
            console.log("Editing person, pre-filling form:", person);
            this.personForm.patchValue(person);
          }
        });
      }
    });
  }
 
  savePerson(): void {
    const personData = this.personForm.value;

    if (this.editingPersonId) {
      personData.id = this.editingPersonId;
      this.personService.updatePerson(personData);
    } else {
      this.personService.addPerson(personData);
    }
    console.log("Saving person:", personData); 
    this.router.navigate(['/']);
  }
}
