import { Component, input, output } from '@angular/core';
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
  deleteUser = output<string>();
  updateUser = output<userInterface>();
  delete() {
    this.deleteUser.emit(this.user()!.id);
  }
  // update(value: string) {
  //   this.updateUser.emit({
  //     name: value,
  //     id: this.user()!.id
  //   })
  // }
}
