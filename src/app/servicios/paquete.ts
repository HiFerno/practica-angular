import { Injectable } from '@angular/core'; // IMPORTA UNA FUNCION PARA QUE ESTE SERVICIO SE PUEDA USAR EN TODA LA APP

// ESTA INTERFAZ SIRVE PARA DEFINIR COMO SE VE UNA ACTUALIZACION DE PAQUETE
export interface ActualizacionPaquete {
  fecha: Date; // FECHA DE LA ACTUALIZACION
  comentario: string; // COMENTARIO SOBRE LA ACTUALIZACION
  responsable: string; // QUIEN HIZO LA ACTUALIZACION
  estado: string; // ESTADO DEL PAQUETE EN ESTA ACTUALIZACION
}

// ESTA INTERFAZ SIRVE PARA DEFINIR COMO SE VE UN PAQUETE
export interface Paquete {
  numeroPaquete: string; // NUMERO UNICO DEL PAQUETE
  idSeguimiento: string; // ID PARA SEGUIMIENTO DEL PAQUETE
  nombreRemitente: string; // NOMBRE DE QUIEN ENVIA EL PAQUETE
  direccionEntrega: { // DIRECCION DONDE SE ENTREGA EL PAQUETE
    calle: string; // CALLE DE ENTREGA
    zona: string; // ZONA DE ENTREGA
    municipio: string; // MUNICIPIO DE ENTREGA
    departamento: string; // DEPARTAMENTO DE ENTREGA
  };
  correo: string; // CORREO DEL REMITENTE
  descripcion: string; // DESCRIPCION DEL PAQUETE
  estado: string; // ESTADO ACTUAL DEL PAQUETE
  actualizaciones: ActualizacionPaquete[]; // LISTA DE ACTUALIZACIONES DEL PAQUETE
}

// ESTA PARTE HACE QUE EL SERVICIO SE PUEDA USAR EN TODA LA APP
@Injectable({
  providedIn: 'root'
})
export class PaqueteService {
  private paquetes: Paquete[] = []; // LISTA DONDE SE GUARDAN TODOS LOS PAQUETES

  constructor() { } // CONSTRUCTOR VACIO, NO HACE NADA AL INICIAR

  // FUNCION PARA CREAR UN ID DE SEGUIMIENTO ALEATORIO
  private generarIdSeguimiento(longitud: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // CARACTERES QUE SE PUEDEN USAR
    let resultado = ''; // VARIABLE DONDE SE VA GUARDANDO EL ID
    for (let i = 0; i < longitud; i++) { // REPITE SEGUN LA LONGITUD QUE SE PIDA
      resultado += chars.charAt(Math.floor(Math.random() * chars.length)); // AGREGA UN CARACTER ALEATORIO
    }
    return resultado; // DEVUELVE EL ID GENERADO
  }

  // FUNCION PARA CREAR UN PAQUETE NUEVO
  crearPaquete(paquete: Omit<Paquete, 'numeroPaquete' | 'idSeguimiento' | 'estado' | 'actualizaciones'>): Paquete {
    const nuevoPaquete: Paquete = {
      ...paquete, // COPIA LOS DATOS QUE RECIBE
      numeroPaquete: `NRV-${Math.floor(Math.random() * 9000) + 1000}`, // CREA UN NUMERO DE PAQUETE ALEATORIO CON PREFIJO NRV
      idSeguimiento: this.generarIdSeguimiento(6), // CREA UN ID DE SEGUIMIENTO DE 6 CARACTERES
      estado: 'Creado', // ESTADO INICIAL DEL PAQUETE
      actualizaciones: [{ // AGREGA LA PRIMERA ACTUALIZACION
        fecha: new Date(), // FECHA ACTUAL
        comentario: 'Orden creada exitosamente.', // MENSAJE DE CREACION
        responsable: 'Sistema', // QUIEN CREO EL PAQUETE
        estado: 'Creado' // ESTADO EN ESTA ACTUALIZACION
      }]
    };
    this.paquetes.push(nuevoPaquete); // AGREGA EL PAQUETE A LA LISTA
    return nuevoPaquete; // DEVUELVE EL PAQUETE CREADO
  }

  // FUNCION PARA BUSCAR UN PAQUETE POR SU NUMERO
  obtenerPaquetePorNumero(numeroPaquete: string): Paquete | undefined {
    return this.paquetes.find(p => p.numeroPaquete === numeroPaquete); // BUSCA Y DEVUELVE EL PAQUETE SI LO ENCUENTRA
  }

  // FUNCION PARA BUSCAR UN PAQUETE POR SU ID DE SEGUIMIENTO
  obtenerPaquetePorIdSeguimiento(idSeguimiento: string): Paquete | undefined {
    return this.paquetes.find(p => p.idSeguimiento === idSeguimiento); // BUSCA Y DEVUELVE EL PAQUETE SI LO ENCUENTRA
  }

  // FUNCION PARA CAMBIAR EL ESTADO DE UN PAQUETE Y AGREGAR UNA NUEVA ACTUALIZACION
  actualizarEstadoPaquete(numeroPaquete: string, nuevoEstado: string, comentario: string, responsable: string): Paquete | undefined {
    const paquete = this.obtenerPaquetePorNumero(numeroPaquete); // BUSCA EL PAQUETE POR SU NUMERO
    if (paquete) { // SI LO ENCUENTRA
      paquete.estado = nuevoEstado; // CAMBIA EL ESTADO DEL PAQUETE
      paquete.actualizaciones.push({ // AGREGA UNA NUEVA ACTUALIZACION
        fecha: new Date(), // FECHA ACTUAL
        comentario, // COMENTARIO QUE RECIBE
        responsable, // RESPONSABLE QUE RECIBE
        estado: nuevoEstado // NUEVO ESTADO
      });
    }
    return paquete; // DEVUELVE EL PAQUETE ACTUALIZADO
  }
}