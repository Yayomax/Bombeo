# BOMBEO

Sitio multi-página para un **programa full body de 10 semanas** pensado para los que recién empiezan, construido sobre principios de hipertrofia (tensión mecánica, sobrecarga progresiva, volumen efectivo, frecuencia y proximidad al fallo).

**Cinco días. Todo el cuerpo. Cero vueltas.**

🔗 En vivo: https://yayomax.github.io/Bombeo/

## Estructura

Sitio estático multi-página con navbar compartida:

| Página | Archivo | Contenido |
|---|---|---|
| Inicio | `index.html` | Hero, datos destacados y tarjetas de navegación |
| Método | `metodo.html` | Los cinco principios de hipertrofia |
| Volumen | `volumen.html` | Gráfico de dona interactivo + tabla de frecuencia |
| Rutina | `rutina.html` | Programa de 10 semanas, día por día, con progresión |

Estilos y lógica compartidos:

- `styles.css` — design system completo (tokens de color/tipografía, componentes, responsive).
- `app.js` — datos del programa + render por página (cada bloque se activa solo si su contenedor existe) + interacciones (navbar mobile, tabs, gráfico, progresión semanal, reveal on scroll).

## La rutina, progresiva

El programa son **9 semanas de sobrecarga progresiva + 1 de descarga**. Se calcula sobre datos base únicos: las repeticiones suben del piso al techo del rango prescripto y el RIR baja (te acercás al fallo) semana a semana, con una curva conservadora para principiantes que nunca supera el RIR de la tabla. La semana 10 es descarga: mitad de series, cargas livianas.

## Detalles técnicos

- **Sin backend, sin build, sin dependencias** (salvo Google Fonts). No se guarda progreso ni hay cuentas.
- **Responsive mobile-first**, verificado sin scroll horizontal de 320px a 1440px. En pantallas chicas las tablas de la rutina se apilan como tarjetas por ejercicio y el menú pasa a hamburguesa.
- **Accesible:** contraste sobre fondo oscuro, navegación por teclado (tabs, foco visible), roles ARIA, `aria-current` en la navegación, y respeto de `prefers-reduced-motion`.
- **Diseño e interacción** apoyados en las skills `ui-ux-pro-max` y `emil-design-eng` (easing Expo, feedback al presionar, reveal escalonado en scroll, íconos SVG en vez de emoji).

## Cómo verlo localmente

Al ser multi-página, servilo con un servidor estático (no abras los `.html` con `file://` para que las rutas relativas funcionen bien):

```bash
python3 -m http.server 8000
# luego abrí http://localhost:8000
```

## Deploy

Publicado con GitHub Pages desde la branch `gh-pages` (raíz). Cualquier hosting de estáticos (Netlify, Vercel) sirve igual.

## Descargo

Contenido informativo. No reemplaza el asesoramiento profesional. Consultá con un médico antes de iniciar un programa de entrenamiento.

---

Hecho por Joaquín Molina — [Lureon AI](https://lureon.ai)
