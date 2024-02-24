import  AOS from 'aos'
import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { productService } from '../../service/product.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent {
  longitude = -20.028333;
  latitude = -12.043333;
  date = new Date();
  products:any[]=[ ];
  modal:boolean=false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router:Router,private productService:productService, private sanitize:DomSanitizer,
  private renderer:Renderer2 ) {}
  recomendations:any[]=[]
  images:any[]=[]
  recomendation:any;
  url:any='';
  async ngOnInit() {
/*     await this.productService.getRecomendations().subscribe((data) => {
      this.recomendations= data;
      const compararPorOrder = (a: any, b: any) => {
        return a.order - b.order;
      };
      this.recomendations.sort(compararPorOrder);
      this.recomendation= this.recomendations.find((element:any) => element.isVisible === true && element.order === this.date.getDay());
      if(this.recomendation){
        if (this.recomendation.url) {
          // Asegúrate de sanitizar la URL correctamente antes de usarla
          const sanitizedUrl = this.sanitize.bypassSecurityTrustResourceUrl(this.getVideoId(this.recomendation.url)!);

          // Verifica si la URL es segura antes de asignarla
          if (sanitizedUrl) {
            this.url = sanitizedUrl;
          } else {
            // Manejo de caso en el que la URL no es segura
            console.error('URL no segura:', this.recomendation.url);
            // Puedes asignar una URL segura predeterminada o manejarlo según tus necesidades
          }
        }
        this.modal=true;
        const modal = document.getElementById('default-modal');
        const body = document.querySelector('body');

        // Add Tailwind classes for modal visibility and overflow
        modal!.classList.remove('hidden');
        modal!.classList.add('flex');
        body!.classList.add('overflow-hidden');
      }
    }); */
     await this.productService.getPrincipalImages().subscribe((data) => {
      this.images= data;
      const compararPorOrder = (a: any, b: any) => {
        return a.order - b.order;
      };
      this.images.sort(compararPorOrder);
     });
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
  getVideoId(url: string): string | null {
    // Validar si la URL es de YouTube
    this.isYoutube = url.includes('youtube.com') || url.includes('youtu.be');

    if (!this.isYoutube) {
      return null;
    }

    // Obtener el ID del video
    const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    console.log(match);

    if (match === null) {
      return null;
    }

    return 'https://www.youtube.com/embed/' + match[1];
  }
  isYoutube: boolean = false;
  isFacebook: boolean = false;
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
  closeModal() {
    this.modal = false;
    const modal = document.getElementById('default-modal');
    const body = document.querySelector('body');

    const iframe = modal?.querySelector('iframe');
    const message = { action: 'pauseVideo' }; // Adjust for video player API
    iframe?.contentWindow?.postMessage(message, '*');

    modal!.classList.add('hidden');
    modal!.classList.remove('flex');
    body!.classList.remove('overflow-hidden');
    this.url = null;
  }


 }
