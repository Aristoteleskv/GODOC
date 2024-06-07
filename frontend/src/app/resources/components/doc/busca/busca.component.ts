import { Component } from '@angular/core';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent {
// modal
showBanner = false; // Inicialmente, o banner está visível
abrirfechar() {
  this.showBanner = !this.showBanner; // Emite o valor atualizado
}
}
