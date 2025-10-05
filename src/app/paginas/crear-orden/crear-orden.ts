import { Component } from '@angular/core'; // IMPORTA LA FUNCION PARA CREAR COMPONENTES
import { CommonModule } from '@angular/common'; // IMPORTA FUNCIONES BASICAS DE ANGULAR
import { FormsModule } from '@angular/forms'; // IMPORTA FUNCIONES PARA FORMULARIOS
import { PaqueteService } from '../../servicios/paquete'; // IMPORTA EL SERVICIO DE PAQUETE

@Component({
  selector: 'app-crear-orden', // NOMBRE DEL COMPONENTE PARA USAR EN HTML
  standalone: true, // INDICA QUE ESTE COMPONENTE SE USA SOLO
  imports: [CommonModule, FormsModule], // MODULOS QUE SE USAN EN ESTE COMPONENTE
  templateUrl: './crear-orden.html', // ARCHIVO HTML QUE MUESTRA LA VISTA
  styleUrl: './crear-orden.css' // ARCHIVO CSS PARA LOS ESTILOS
})
export class CrearOrden {
  modelo = { // OBJETO DONDE SE GUARDAN LOS DATOS DEL FORMULARIO
    nombreRemitente: '', // NOMBRE DE QUIEN ENVIA EL PAQUETE
    direccionEntrega: { calle: '', zona: '', municipio: '', departamento: '' }, // DATOS DE LA DIRECCION DE ENTREGA
    correo: '', // CORREO DEL REMITENTE
    descripcion: '' // DESCRIPCION DEL PAQUETE
  };

  constructor(private paqueteServicio: PaqueteService) { } // CREA EL SERVICIO PARA USARLO EN EL COMPONENTE

  registrarOrden() {
    // CREA EL PAQUETE USANDO LOS DATOS DEL FORMULARIO
    const nuevoPaquete = this.paqueteServicio.crearPaquete(this.modelo);
    // MUESTRA UN MENSAJE CON EL NUMERO Y CODIGO DE SEGUIMIENTO DEL PAQUETE
    alert(`¡Orden creada con éxito!\n\nNúmero de Paquete: ${nuevoPaquete.numeroPaquete}\nCódigo de Seguimiento: ${nuevoPaquete.idSeguimiento}`);
    // LIMPIA EL FORMULARIO PARA QUE SE PUEDA CREAR OTRO PAQUETE
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    // REINICIA TODOS LOS CAMPOS DEL FORMULARIO
    this.modelo = {
      nombreRemitente: '',
      direccionEntrega: { calle: '', zona: '', municipio: '', departamento: '' },
      correo: '',
      descripcion: ''
    };
  }
}