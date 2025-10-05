import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // <-- Añadir standalone
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // <-- Añadir imports
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  titulo = 'NERV'; // <-- Cambiado para simplicidad
}