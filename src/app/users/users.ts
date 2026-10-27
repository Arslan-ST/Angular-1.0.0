import { Component, signal } from '@angular/core';
import { UserProfile, userInterface } from './user-profile/user-profile';
@Component({
  selector: 'app-users',
  imports: [UserProfile],
  templateUrl: './users.html',
  styleUrl: './users.css',
})

export class Users {
  users = signal<userInterface[]>([{
    name:'Arslan',
    id:'Alahd'
  }]);
  createUser(value: string) {
    this.users.update((prev) => [...prev, { name: value, id: crypto.randomUUID() }])
  }
  deleteUser(id: string) {
    if(id.trim()=='')return;
    this.users.update((prev) => prev.filter((e) => e.id !== id))
  }
  updateUser(user:userInterface){
      this.users.update((prev)=>prev.map((e)=>{
            if(e.id!==user.id)return e;
            return user
      }))
  }
} 
