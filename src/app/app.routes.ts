import { Routes } from '@angular/router';
import { CrearOrden } from './paginas/crear-orden/crear-orden';
import { ActualizarOrden } from './paginas/actualizar-orden/actualizar-orden';
import { SeguimientoPaquete } from './paginas/seguimiento-paquete/seguimiento-paquete';

export const routes: Routes = [
    { path: '', redirectTo: 'crear-orden', pathMatch: 'full' },
    { path: 'crear-orden', component: CrearOrden },
    { path: 'actualizar-orden', component: ActualizarOrden },
    { path: 'seguimiento', component: SeguimientoPaquete }
];