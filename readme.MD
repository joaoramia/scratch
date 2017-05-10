# Scratch Card Game built with HTML5 Canvas and PixiJS (v4.5.1)

## Scratch card game focused only on the scratching functionality. It uses two HTML5 canvases, one 2d built natively and one webgl built with PixiJS.

## The scratching functionality sets the native 2d canvas' globalCompositeOperation to destination-out, so that every time it uses drawImage it will have the "eraser" effect, showing the webgl canvas underneath it.

### Other technologies: ExpressJS for the server, Babel for the ES6 front-end code and Webpack for its bundling.

## Steps to run application locally (localhost port 8000):

```
npm install
```

```
npm start
```
