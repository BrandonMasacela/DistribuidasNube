import { Usuario } from './../model/usuario.interface';
import { RouterLink, RouterModule } from '@angular/router';
import { UsuarioService } from './../services/usuario.service';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [
    RouterModule, RouterLink, MatIconModule,
    MatButtonModule, MatDividerModule,
    MatTableModule, MatPaginatorModule, CommonModule
  ],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export default class UsuarioListComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  userRole: string = '';
  displayedColumns: string[] = ['id', 'nombre', 'email'];;
  dataSource = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    console.log(btoa('client:secret'));
    this.loadAll();
    const roles = JSON.parse(localStorage.getItem('userRoles') || '[]');
    if (roles.includes('ROLE_ADMIN')) {
      this.userRole = 'admin';
      this.displayedColumns.push('operaciones');
    } else {
      this.userRole = 'user';
    }
  }

  loadAll() {
    this.usuarioService.list().subscribe(usuarios => {
      this.dataSource.data = usuarios;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(usuario: Usuario) {
    this.usuarioService.delete(usuario.id).subscribe(() => {
      this.loadAll();
      console.log('Usuario eliminado');
    });
  }
}
