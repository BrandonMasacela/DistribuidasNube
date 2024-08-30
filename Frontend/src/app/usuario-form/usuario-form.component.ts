import { Usuario } from './../model/usuario.interface';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
    MatIconModule,
    MatButtonModule, MatDividerModule,
    MatTableModule, MatPaginatorModule
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export default class UsuarioFormComponent implements OnInit{
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  registerForm: FormGroup;
  usuarioExiste? : Usuario;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeatPass: ['', [Validators.required]]
    }, { validators: CustomValidators.passwordsMatch('password', 'repeatPass') });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioService.get(parseInt(id)).subscribe(usuario => {
        this.usuarioExiste = usuario;
        this.registerForm.patchValue({
          nombre: usuario.nombre,
          email: usuario.email,
          password: '',
          repeatPass: ''
        });
      });
    }
  }

  submit() {
    if (this.registerForm.valid) {
      console.log('Formulario enviado', this.registerForm.value);
      this.save();
    } else {
      console.log('Las contraseñas no coinciden');
    }
  }

  save() {
    if (this.registerForm.valid) {
      const { repeatPass, ...usuario } = this.registerForm.value;
      if(this.usuarioExiste) {
        this.usuarioService.update(this.usuarioExiste.id, usuario).subscribe(() => {
          this.router.navigate(['/mostrarUsuarios']);
        });
      } else {
        this.usuarioService.create(usuario).subscribe(() => {
          this.router.navigate(['/mostrarUsuarios']);
        });
      }
    } else {
      console.log('Formulario no válido');
    }
  }
}
