import  AOS from 'aos'
import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { productService } from '../../service/product.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent {
  longitude = -20.028333;
  latitude = -12.043333;

  products:any[]=[ ]
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router:Router,private productService:productService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      const compararPorOrder = (a: any, b: any) => {
        return a.order - b.order;
      };
      this.products.sort(compararPorOrder);

// El array 'personas' ahora está ordenado por la propiedad 'order'

      console.log(this.products);

      // Verificar si la plataforma es el navegador antes de inicializar AOS
      if (isPlatformBrowser(this.platformId)) {
        // Inicializar AOS después de recibir los productos
        AOS.init({ once: true, duration: 3000 });
      }
    });
  }

  title = 'landing-page';
  abrirWhatsApp(product:any) {
    const numeroTelefono = '51919695923'; // Reemplaza con el número de teléfono deseado
    const mensaje =  'Hola Avicola THIAGO & LUKA, vengo de su pagina web, quisiera pedir ' + product.name + ' a S/' + product.price; // Opcional: reemplaza con el mensaje deseado

    // Generar el enlace de redirección de WhatsApp
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;

    // Redirigir a la URL de WhatsApp
    window.open(url, '_blank');
  }
  routerNavigate(){
    this.router.navigate(['/acceso']);
  }
  linkFacebook(){
    window.open('https://www.facebook.com/profile.php?id=100077795906116', '_blank');
  }
 }
