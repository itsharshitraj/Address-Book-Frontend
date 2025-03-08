import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';


@Component({
  selector: 'app-person-form-page',
  standalone: true,  // Ensure this is a Standalone Component
  templateUrl: './person-form-page.component.html',
  styleUrls: ['./person-form-page.component.css'],
  imports: [CommonModule, ReactiveFormsModule] //  Ensure ReactiveFormsModule is imported here
})
export class PersonFormPageComponent {
  personForm: FormGroup;
  editingPersonId: number | null = null; 

  constructor(private fb: FormBuilder, private router: Router, private personService: PersonService, private route: ActivatedRoute) {
    this.personForm = this.fb.group({
      fullName: [''],
      phoneNumber: [''],
      address: [''],
      city: [''],
      state: [''],
      zipCode: ['']
    });
  }
  ngOnInit(): void {
    // Check if editing (edit-person/:id)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editingPersonId = +id;
        this.loadPersonData(this.editingPersonId);
      }
    });
  }

  private loadPersonData(id: number) {
    this.personService.getPersonById(id).subscribe(person => {
      if (person) {
        console.log("Loaded person for edit:", person);
        this.personForm.patchValue(person);
      } else {
        console.log("No person found for ID:", id);
      }
    });
  }
  

  savePerson() {
    console.log("Save button clicked"); // Debugging log
  
    if (!this.personForm.valid) {
      console.log("Form is invalid", this.personForm.value);
      return; 
    }
  
    const personData: Person = {
      id: this.editingPersonId || 0,
      fullName: this.personForm.value.fullName,
      phoneNumber: this.personForm.value.phoneNumber,
      address: this.personForm.value.address,
      city: this.personForm.value.city,
      state: this.personForm.value.state,
      zipCode: this.personForm.value.zipCode,
      zip: undefined,
      name: '',
      phone: ''
    };
  
    if (this.editingPersonId) {
      console.log("Updating person:", personData);
      this.personService.updatePerson(personData);
    } else {
      console.log("Adding new person:", personData);
      this.personService.addPerson(personData);
    }
  
    this.router.navigate(['/']); // Navigate back to list after saving
  }


  resetForm() {
    this.personForm.reset();
  }
  closeForm() {
    this.router.navigate(['/']); // Redirect to the first page
  }
}
