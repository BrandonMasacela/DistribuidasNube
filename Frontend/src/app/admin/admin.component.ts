import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export default class AdminComponent implements OnInit {

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
    //location.href = 'http://localhost:9000/logout';
    location.href = 'http://tuURL:9000/logout';
  }

}
