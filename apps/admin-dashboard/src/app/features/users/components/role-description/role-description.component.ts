import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-role-description',
  imports: [CommonModule],
  templateUrl: './role-description.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleDescriptionComponent {
  hasError = input<boolean>(false);
}
