import { Routes } from '@angular/router';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonFormPageComponent } from './components/person-form-page/person-form-page.component';

export const routes: Routes = [
  { path: '', component: PersonListComponent },
  { path: 'add-person', component: PersonFormPageComponent },
  { path: 'edit-person/:id', component: PersonFormPageComponent } 
];
