# DELABURO redesign

Landing B2B estática para DELABURO S.R.L., enfocada en outsourcing, recruitment, payroll e IT services.

## Qué incluye

- Narrativa clara de negocio y arquitectura de conversión.
- Diseño responsive para móvil, tablet y desktop.
- Motion premium de bajo costo: reveal, drift cinematográfico y focal pulse.
- Estado `prefers-reduced-motion` y navegación mobile accesible.
- CTA comercial por email, sin backend ni dependencias de servidor.

## Ejecutar localmente

Es una web estática: abrí `index.html` o servila con cualquier servidor estático. También incluye un servidor Node mínimo para el importador de aplicaciones de Hostinger:

```bash
npm run build
npm start
```

## Publicar en Hostinger

Para el flujo Git normal, elegí despliegue estático y dejá la ruta de instalación vacía para publicar en `/public_html`. Si elegís el importador Node de la captura, `package.json` ya está incluido y el comando de inicio es `npm start`.

## Conectar con GitHub

Creá un repositorio vacío llamado `delaburo-redesign` y ejecutá desde esta carpeta:

```bash
git remote add origin https://github.com/TU_USUARIO/delaburo-redesign.git
git branch -M main
git push -u origin main
```

## Evidencia editorial

Los servicios, datos de contacto y la lista de empresas se basan en la web y la página pública de LinkedIn de DELABURO consultadas en agosto de 2026. La lista de clientes es una declaración pública de la empresa y no se presenta como validación contractual independiente.
