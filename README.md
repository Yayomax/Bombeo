# BOMBEO

Landing de una sola página para una rutina de entrenamiento **full body de 5 días**, construida sobre principios de hipertrofia (tensión mecánica, sobrecarga progresiva, volumen efectivo, frecuencia y proximidad al fallo).

**Cinco días. Todo el cuerpo. Cero vueltas.**

## Qué incluye

- Hero con wordmark, tagline y tres datos destacados (5 días/semana · 93 series semanales · ~19 por sesión).
- Explicación de cómo funciona la hipertrofia en cinco conceptos.
- Gráfico de dona (SVG) con la distribución del volumen semanal por grupo muscular, con detalle al hover/tap, leyenda y tabla de frecuencia.
- La rutina completa en tabs por día (Día 1 a 5), con series, repeticiones, RIR y descanso.
- Notas de ejecución.

## Detalles técnicos

- **Un solo archivo:** todo vive en `index.html` — HTML, CSS y JS embebidos, con el gráfico dibujado a mano en SVG.
- **Sin backend, sin build, sin dependencias** (salvo Google Fonts). No se guarda progreso ni hay cuentas.
- **Responsive mobile-first:** en pantallas chicas las tablas de la rutina se apilan como tarjetas por ejercicio (sin scroll horizontal) y la leyenda del gráfico queda debajo.
- **Accesible:** contraste sobre fondo oscuro, navegación por teclado en los tabs, foco visible y respeto de `prefers-reduced-motion`.

## Cómo verla

Abrí `index.html` en el navegador (doble clic), o servila localmente:

```bash
python3 -m http.server 8000
# luego abrí http://localhost:8000
```

## Deploy

Al ser estática de un solo archivo, se puede publicar tal cual en GitHub Pages, Netlify, Vercel o cualquier hosting de estáticos.

## Descargo

Contenido informativo. No reemplaza el asesoramiento profesional. Consultá con un médico antes de iniciar un programa de entrenamiento.

---

Hecho por Joaquín Molina — [Lureon AI](https://lureon.ai)
