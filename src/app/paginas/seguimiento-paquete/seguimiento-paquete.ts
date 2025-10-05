import { Component } from '@angular/core'; // IMPORTA LA FUNCION PARA CREAR COMPONENTES
import { CommonModule } from '@angular/common'; // IMPORTA FUNCIONES BASICAS DE ANGULAR
import { FormsModule } from '@angular/forms'; // IMPORTA FUNCIONES PARA FORMULARIOS
import { PaqueteService, Paquete } from '../../servicios/paquete'; // IMPORTA EL SERVICIO Y LA INTERFAZ DE PAQUETE

@Component({
  selector: 'app-seguimiento-paquete', // NOMBRE DEL COMPONENTE PARA USAR EN HTML
  standalone: true, // INDICA QUE ESTE COMPONENTE SE USA SOLO
  imports: [CommonModule, FormsModule], // MODULOS QUE SE USAN EN ESTE COMPONENTE
  templateUrl: './seguimiento-paquete.html', // ARCHIVO HTML QUE MUESTRA LA VISTA
  styleUrl: './seguimiento-paquete.css' // ARCHIVO CSS PARA LOS ESTILOS
})
export class SeguimientoPaquete {
  idSeguimiento = ''; // GUARDA EL CODIGO DE SEGUIMIENTO QUE SE ESCRIBE
  paqueteEncontrado: Paquete | undefined; // GUARDA EL PAQUETE QUE SE ENCUENTRA

  constructor(private paqueteServicio: PaqueteService) { } // CREA EL SERVICIO PARA USARLO EN EL COMPONENTE

  rastrearPaquete() {
    // BUSCA EL PAQUETE USANDO EL CODIGO DE SEGUIMIENTO
    this.paqueteEncontrado = this.paqueteServicio.obtenerPaquetePorIdSeguimiento(this.idSeguimiento);
    if (!this.paqueteEncontrado) {
      alert('Código de seguimiento no válido.'); // MUESTRA MENSAJE SI NO ENCUENTRA EL PAQUETE
    } else {
      // ORDENA LAS ACTUALIZACIONES DEL PAQUETE POR FECHA, DE LA MAS ANTIGUA A LA MAS RECIENTE
      this.paqueteEncontrado.actualizaciones.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    }
  }
}