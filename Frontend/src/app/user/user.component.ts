import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent implements OnInit {
  
  welcomeMessage: string = '';
  constructor() { }
  
  ngOnInit(): void {
    this.welcomeMessage = localStorage.getItem('welcomeMessage') || 'Bienvenido al Sistema de Gestión de Cursos';
  }

  onLogout() {
    localStorage.removeItem('userRoles');
    localStorage.removeItem('welcomeMessage');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    //slocation.href = 'http://localhost:9000/logout';
    location.href = 'http://tuURL:9000/logout';
  }

}
