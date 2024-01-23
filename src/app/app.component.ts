import  AOS from 'aos'
import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  longitude = -20.028333;
  latitude = -12.043333;

  products=[
    {
      name:'Pollo Entero',
      precio:11,
      img:'../assets/image-pollo-entero.jpg'
    },
    {
      name:'Alitas',
      precio:10,
      img:'../assets/image-alita.jpg'
    },
    {
      name:'Piernitas',
      precio:8,
      img:'../assets/image-pierna.jpg'
    },

    {
      name:'Filete de Pollo',
      precio:8,
      img:'../assets/image-pechuga.jpg'
    },
    {
      name:'Menudencia',
      precio:8,
      img:'../assets/image-menudencia.png'
    },
    {
      name:'Higado',
      precio:8,
      img:'../assets/image-higado.png'
    },
  ]
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
       AOS.init({ once: true, duration: 1000 })
    }
  }

  title = 'landing-page';
  abrirWhatsApp(product:any) {
    const numeroTelefono = '51919695923'; // Reemplaza con el número de teléfono deseado
    const mensaje =  'Hola Avicola Thaigo, quisiera pedir ' + product.name + ' a S/' + product.precio; // Opcional: reemplaza con el mensaje deseado

    // Generar el enlace de redirección de WhatsApp
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;

    // Redirigir a la URL de WhatsApp
    window.open(url, '_blank');
  }
}
