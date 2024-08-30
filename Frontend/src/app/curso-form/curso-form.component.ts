import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoService } from '../services/curso.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../model/usuario.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Curso } from '../model/curso.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
    MatIconModule,
    MatButtonModule, MatDividerModule,
    MatTableModule, MatPaginatorModule
  ],
  styleUrls: ['./curso-form.component.css']
})
export default class CursoFormComponent implements OnInit {

  private cursoService = inject(CursoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  registerForm: FormGroup;
  cursoExiste? : Curso;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cursoService.get(parseInt(id)).subscribe(curso => {
        this.cursoExiste = curso;
        this.registerForm.patchValue({
          nombre: curso.nombre,
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
      if(this.cursoExiste) {
        this.cursoService.update(this.cursoExiste.id, usuario).subscribe(() => {
          this.router.navigate(['/mostrarCursos']);
        });
      } else {
        this.cursoService.create(usuario).subscribe(() => {
          this.router.navigate(['/mostrarCursos']);
        });
      }
    } else {
      console.log('Formulario no válido');
    }
  }

}
