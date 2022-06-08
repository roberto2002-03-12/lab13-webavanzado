import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  titulo = 'Registrarse';
  id: string | null;
  imagen_form!: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _usuarioService: UsuarioService,
              private aRouter: ActivatedRoute) {
      this.usuarioForm = this.fb.group({
        nombres: ['', Validators.required],
        apellido_paterno: ['', Validators.required],
        apellido_materno: ['', Validators.required],
        nacimiento: ['', Validators.required],
        correo: ['', Validators.required],
        contrasena: ['', Validators.required],
      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

  agregarUsuario() {
    console.log(this.usuarioForm);

    const usuario: Usuario = {
      nombres: this.usuarioForm.get('nombres')?.value,
      apellido_paterno: this.usuarioForm.get('apellido_paterno')?.value,
      apellido_materno: this.usuarioForm.get('apellido_materno')?.value,
      nacimiento: this.usuarioForm.get('nacimiento')?.value,
      correo: this.usuarioForm.get('correo')?.value,
      contrasena: this.usuarioForm.get('contrasena')?.value,
    }


    console.log(usuario);

    this._usuarioService.guardarUsuario(usuario).subscribe(data => {
      console.log('funciono correctamente');
      this.router.navigate(['/']);
    }, error => {
      console.error(error);
      this.usuarioForm.reset();
    });
  }

}
