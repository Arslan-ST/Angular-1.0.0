import { Component, input, output, signal, effect } from '@angular/core';
export interface userInterface {
  name: string,
  id: string,
}
@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  user = input<userInterface>();
  userInput = signal('');
  deleteUser = output<string>();
  updateUser = output<userInterface>();
  edit = signal<boolean>(false)

  delete() {
    this.deleteUser.emit(this.user()!.id);
  }
  update(value: string) {
    this.edit.set(false)
    this.updateUser.emit({
      name: value,
      id: this.user()!.id
    })
  }
  constructor() {
    effect(() => {
      this.userInput.set(this.user()?.name ?? '');
    });
  }
}
