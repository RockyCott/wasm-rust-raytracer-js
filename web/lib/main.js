import * as Wasm from './wasm'
import * as JavaScript from './javascript'
import Fps from './fps'

const canvas = {
    width: 480,
    height: 360
};

function hexToRgb(hex) {
    // Elimina el # al principio si está presente
    hex = hex.replace(/^#/, '');

    // Divide el valor hexadecimal en componentes r, g y b
    const x = parseInt(hex.substring(0, 2), 16);
    const y = parseInt(hex.substring(2, 4), 16);
    const z = parseInt(hex.substring(4, 6), 16);

    return { x: parseFloat(x), y: parseFloat(y), z: parseFloat(z) };
}

// selectores de colores

// color checker 1
const colorPickerChecker1 = document.getElementById('colorPickerChecker1');
let colorChecker1 = {
    // rgb purpura
    x: 128.0,
    y: 0.0,
    z: 128.0
};
colorPickerChecker1.addEventListener('input', () => {
  const selectedColor = colorPickerChecker1.value;
  colorChecker1 = hexToRgb(selectedColor);
});

// color checker 2
const colorPickerChecker2 = document.getElementById('colorPickerChecker2');
let colorChecker2 = {
    x: 255.0,
    y: 255.0,
    z: 255.0
};
colorPickerChecker2.addEventListener('input', () => {
    const selectedColor = colorPickerChecker2.value;
    colorChecker2 = hexToRgb(selectedColor);
});

// color sphere 1
const colorPickerSphere1 = document.getElementById('colorPickerSphere1');
let colorSphere1 = {
    x: 0.0,
    y: 0.0,
    z: 0.0
};
colorPickerSphere1.addEventListener('input', () => {
    const selectedColor = colorPickerSphere1.value;
    colorSphere1 = hexToRgb(selectedColor);
});

// color sphere 2
const colorPickerSphere2 = document.getElementById('colorPickerSphere2');
let colorSphere2 = {
    x: 0.0,
    y: 0.0,
    z: 0.0
};
colorPickerSphere2.addEventListener('input', () => {
    const selectedColor = colorPickerSphere2.value;
    colorSphere2 = hexToRgb(selectedColor);
});

// color sphere 3
const colorPickerSphere3 = document.getElementById('colorPickerSphere3');
let colorSphere3 = {
    x: 255.0,
    y: 255.0,
    z: 255.0
};
colorPickerSphere3.addEventListener('input', () => {
    const selectedColor = colorPickerSphere3.value;
    colorSphere3 = hexToRgb(selectedColor);
});


const getScene = () => {

    const input = (selector) => {
        return parseFloat(document.getElementById(selector).value);
    };

    return {
        camera: {
            point: {
                x: input('camera-x'),
                y: input('camera-y'),
                z: input('camera-z'),
            },
            vector: {
                x: 0,
                y: 0,
                z: 0
            },
            fov: input('camera-fov')
        },
        objects: [
            {
                type: 'Sphere',
                point: { x: -3, y: 0, z: 0 },
                color: { x: parseFloat(colorSphere1.x), y: parseFloat(colorSphere1.y), z: parseFloat(colorSphere1.z) },
                specular: input('obj-1-specular') / 100,
                lambert: input('obj-1-lambert') / 100,
                ambient: input('obj-1-ambient') / 100,
                radius: input('obj-1-radius') / 100
            },
            {
                type: 'Sphere',
                point: { x: 3, y: 0, z: 0 },
                color: { x: parseFloat(colorSphere2.x), y: parseFloat(colorSphere2.y), z: parseFloat(colorSphere2.z) },
                specular: input('obj-2-specular') / 100,
                lambert: input('obj-2-lambert') / 100,
                ambient: input('obj-2-ambient') / 100,
                radius: input('obj-2-radius') / 100
            },
            {
                type: 'Sphere',
                point: { x: 0, y: 0, z: 0 },
                color: { x: parseFloat(colorSphere3.x), y: parseFloat(colorSphere3.y), z: parseFloat(colorSphere3.z) },
                specular: input('obj-3-specular') / 100,
                lambert: input('obj-3-lambert') / 100,
                ambient: input('obj-3-ambient') / 100,
                radius: input('obj-3-radius') / 100
            },
            {
                type: 'Plane',
                point: { x: 0, y: 5, z: 0 },
                normal: { x: 0, y: -1, z: 0 },
                color: { x: 200, y: 200, z: 200 },
                specular: 0.0,
                lambert: 0.9,
                ambient: 0.2,
            },
            {
                type: 'Plane',
                point: { x: 0, y: -5, z: 0 },
                normal: { x: 0, y: 1, z: 0 },
                color: { x: 100, y: 100, z: 100 },
                specular: 0.0,
                lambert: 0.9,
                ambient: 0.2,
            },
            {
                type: 'Plane',
                point: { x: -5, y: 0, z: 0 },
                normal: { x: 1, y: 0, z: 0 },
                color: { x: 100, y: 100, z: 100 },
                specular: 0.0,
                lambert: 0.9,
                ambient: 0.2,
            },
            {
                type: 'Plane',
                point: { x: 5, y: 0, z: 0 },
                normal: { x: -1, y: 0, z: 0 },
                color: { x: 100, y: 100, z: 100 },
                specular: 0.0,
                lambert: 0.9,
                ambient: 0.2,
            },
            {
                type: 'Plane',
                point: { x: 0, y: 0, z: -12 },
                normal: { x: 0, y: 0, z: 1 },
                color: { x: 100, y: 100, z: 100 },
                specular: 0.0,
                lambert: 0.9,
                ambient: 0.2,
            },
            {
                type: 'Plane',
                point: { x: 0, y: 0, z: 12 },
                normal: { x: 0, y: 0, z: -1 },
                color: { x: 100, y: 100, z: 100 },
                specular: 0.0,
                lambert: 0.9,
                ambient: 0.2,
            },
        ],
        checker: [
            colorChecker1,
            colorChecker2
        ],
        lights: [{
            x: input('light-1-x'),
            y: input('light-1-y'),
            z: input('light-1-z')
        }]
    };
};

const putData = (data) => {
    const ctx = document.getElementById('canvas').getContext('2d');
    ctx.putImageData(new ImageData(new Uint8ClampedArray(data), canvas.width, canvas.height), 0, 0);
};

const renderWasm = (scene) => {

    const data = Wasm.render(canvas, scene);
    if (data) {         // may return undefined if wasm module not loaded
        putData(data);
    }
};

const renderJs = (scene) => {

    const data = JavaScript.render(canvas, scene);
    putData(data);
};

let inc = 0;

const fps = new Fps(250,  document.querySelector('.fps'));
let wasm = true;

const render = () => {

    fps.tick();

    const scene = getScene();

    scene.objects[0].point.x = Math.sin(inc) * 3.0;
    scene.objects[0].point.z = Math.cos(inc) * 3.0;
    scene.objects[0].point.y = Math.sin(inc) * 2.0;

    scene.objects[1].point.x = Math.sin(inc) * -3.0;
    scene.objects[1].point.z = Math.cos(inc) * -3.0;
    scene.objects[1].point.y = Math.cos(inc) * -2.0;

    inc += parseFloat(document.getElementById('orbit-speed').value / 250);

    if (wasm) {
        renderWasm(scene);
    } else {
        renderJs(scene);
    }

    requestAnimationFrame(render);
};

requestAnimationFrame(render);

document.querySelectorAll('.switch-container a')
    .forEach((e) => e.addEventListener('click', (e) => {

    const node = e.target;
    if (node.innerText === 'Rust+Wasm=❤️') {
        wasm = true;
        document.querySelectorAll('.switch-container a')[0].classList = 'selected';
        document.querySelectorAll('.switch-container a')[1].classList = '';
    } else {
        wasm = false;
        document.querySelectorAll('.switch-container a')[1].classList = 'selected';
        document.querySelectorAll('.switch-container a')[0].classList = '';
    }

    e.preventDefault();
}));