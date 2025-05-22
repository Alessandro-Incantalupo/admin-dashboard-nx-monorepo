import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  imports: [],
  templateUrl: './profile-info.component.html',
  styles: ``,
})
export class ProfileInfoComponent {
  userName = input.required<string>();
  userRole = input.required<string>();
  email = input.required<string>();
  avatarUrl = input.required<string>();
}
