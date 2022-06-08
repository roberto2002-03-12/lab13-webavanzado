import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productoForm: FormGroup;
  titulo = 'Crear Produto';
  id: string | null;
  uploadedFiles!: File;
  imagen_Form!: any;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService, 
              private _productoService: ProductoService,
              private aRouter: ActivatedRoute) { 
     this.productoForm = this.fb.group({
       nombre: ['', Validators.required],
       categoria: ['', Validators.required],
       ubicacion: ['', Validators.required],
       precio: ['', Validators.required],
       imagen: ['']
     })
     this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  onFileChange(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.uploadedFiles = file;
    }
  }

  agregarProducto(){
    console.log(this.productoForm);
    console.log(this.productoForm.get('producto')?.value);

    //encontrar un metodo para subirlo con modelo
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('nombre')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    };

    let formData = new FormData();

    formData.append('nombre', PRODUCTO.nombre);
    formData.append('categoria', PRODUCTO.categoria);
    formData.append('ubicacion', PRODUCTO.ubicacion);
    formData.append('precio', PRODUCTO.precio.toString());
    formData.append('imagen', this.uploadedFiles);

    if(this.id !== null){
      this._productoService.actualizarProducto(formData, this.id).subscribe(data => {
        this.toastr.success('Producto actualizado', 'Producto actualizado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      })
    } else {
      this._productoService.guardarProducto(formData).subscribe(data => {
        this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    }
  }

  esEditar(){
      if(this.id !== null){
        this.titulo = 'Editar Producto';
        this._productoService.obtenerProducto(this.id).subscribe(data => {
          this.productoForm.setValue({
            nombre: data.nombre,
            categoria: data.categoria,
            ubicacion: data.ubicacion,
            precio: data.precio,
            imagen: data.imagen
          })
        })
      }
  }

}
