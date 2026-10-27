import { Routes } from '@angular/router';
import { Users } from './users/users';
import { Slider } from './slider/slider';
export const routes: Routes = [
    {
        path: 'users',
        component: Users
    },
    {
        path: 'slider',
        component: Slider
    },
    {
        path: '',
        redirectTo: 'slider',
        pathMatch: 'full'
    }
];
