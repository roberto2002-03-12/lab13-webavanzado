export class Usuario{
    _id?: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    nacimiento: string;
    correo: string;
    contrasena: string;

    constructor(nombres: string, apellido_paterno: string, apellido_materno: string, nacimiento: string, correo: string, contrasena: string) {
        this.nombres = nombres;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.nacimiento = nacimiento;
        this.correo = correo;
        this.contrasena = contrasena;
    }
}