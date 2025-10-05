import { Component } from '@angular/core'; // IMPORTA LA FUNCION PARA CREAR COMPONENTES
import { CommonModule } from '@angular/common'; // IMPORTA FUNCIONES BASICAS DE ANGULAR
import { FormsModule } from '@angular/forms'; // IMPORTA FUNCIONES PARA FORMULARIOS
import { PaqueteService, Paquete } from '../../servicios/paquete'; // IMPORTA EL SERVICIO Y LA INTERFAZ DE PAQUETE

@Component({
  selector: 'app-actualizar-orden', // NOMBRE DEL COMPONENTE PARA USAR EN HTML
  standalone: true, // INDICA QUE ESTE COMPONENTE SE USA SOLO
  imports: [CommonModule, FormsModule], // MODULOS QUE SE USAN EN ESTE COMPONENTE
  templateUrl: './actualizar-orden.html', // ARCHIVO HTML QUE MUESTRA LA VISTA
  styleUrl: './actualizar-orden.css' // ARCHIVO CSS PARA LOS ESTILOS
})
export class ActualizarOrden {
  numeroPaqueteBuscado = ''; // GUARDA EL NUMERO DE PAQUETE QUE SE BUSCA
  paqueteActual: Paquete | undefined; // GUARDA EL PAQUETE QUE SE ENCUENTRA
  modeloActualizacion = { nuevoEstado: '', comentario: '', responsable: '' }; // GUARDA LOS DATOS PARA ACTUALIZAR EL PAQUETE
  estadosDisponibles: string[] = []; // GUARDA LOS ESTADOS QUE SE PUEDEN ELEGIR

  // DEFINE LOS CAMBIOS DE ESTADO QUE SE PERMITEN SEGUN EL ESTADO ACTUAL
  private flujoDeEstados: { [key: string]: string[] } = {
    'Creado': ['En preparación'], // SI ESTA CREADO SOLO PUEDE PASAR A EN PREPARACION
    'En preparación': ['En transito', 'No entregado'], // SI ESTA EN PREPARACION PUEDE PASAR A EN TRANSITO O NO ENTREGADO
    'En transito': ['Entregado', 'No entregado'], // SI ESTA EN TRANSITO PUEDE PASAR A ENTREGADO O NO ENTREGADO
    'Entregado': [], // SI YA ESTA ENTREGADO NO PUEDE CAMBIAR MAS
    'No entregado': [] // SI NO SE ENTREGO YA NO CAMBIA MAS
  };

  constructor(private paqueteServicio: PaqueteService) { } // CREA EL SERVICIO PARA USARLO EN EL COMPONENTE

  buscarPaquete() {
    // BUSCA EL PAQUETE POR SU NUMERO
    this.paqueteActual = this.paqueteServicio.obtenerPaquetePorNumero(this.numeroPaqueteBuscado);
    if (this.paqueteActual) {
      // SI LO ENCUENTRA, CARGA LOS ESTADOS QUE SE PUEDEN ELEGIR SEGUN EL ESTADO ACTUAL
      this.estadosDisponibles = this.flujoDeEstados[this.paqueteActual.estado];
      this.modeloActualizacion.nuevoEstado = this.estadosDisponibles[0] || ''; // PONE EL PRIMER ESTADO DISPONIBLE
    } else {
      alert('Paquete no encontrado. Verifique el número e intente de nuevo.'); // MUESTRA UN MENSAJE SI NO LO ENCUENTRA
      this.paqueteActual = undefined; // LIMPIA EL PAQUETE ACTUAL
    }
  }

  actualizarEstado() {
    if (!this.paqueteActual) return; // SI NO HAY PAQUETE NO HACE NADA

    // LLAMA AL SERVICIO PARA CAMBIAR EL ESTADO DEL PAQUETE
    this.paqueteServicio.actualizarEstadoPaquete(
      this.paqueteActual.numeroPaquete, // NUMERO DEL PAQUETE
      this.modeloActualizacion.nuevoEstado, // NUEVO ESTADO QUE SE ELIGIO
      this.modeloActualizacion.comentario, // COMENTARIO QUE SE ESCRIBIO
      this.modeloActualizacion.responsable // RESPONSABLE QUE SE ESCRIBIO
    );
    alert('¡Estado del paquete actualizado correctamente!'); // MUESTRA MENSAJE DE EXITO
    
    // LIMPIA LOS DATOS PARA QUE SE PUEDA BUSCAR OTRO PAQUETE
    this.paqueteActual = undefined;
    this.numeroPaqueteBuscado = '';
    this.modeloActualizacion = { nuevoEstado: '', comentario: '', responsable: '' };
  }
}