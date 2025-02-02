import * as Shapes from './noseShapes';
import { type Shape } from './noseShapes';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = 500;
canvas.height = 500;

const dropDown = document.getElementById('dropdown') as HTMLSelectElement;
const pram = document.getElementById('nosePram') as HTMLInputElement;
const lengthInput = document.getElementById('noseLength') as HTMLInputElement;
const radiusInput = document.getElementById('noseRadius') as HTMLInputElement;

// create a new dropdown select element for the nose shape
for (let i = 0; i < Object.values(Shapes.Shapes).length; i++) {

    let Name = Object.keys(Shapes.Shapes)[i];

    let option = document.createElement('option');
    option.value = Name;
    option.text = Name;

    dropDown.appendChild(option);
} 

let selectedShape: Shape = Object.values(Shapes.Shapes)[1];
// on the dropdown change, update the nose shape
dropDown.addEventListener('change', function () {
    selectedShape = Shapes.Shapes[dropDown.value];
    pram.max = selectedShape.maxParameter().toString();
    pram.value = selectedShape.defaultParameter().toString();

    UpdateDrawing();
});

pram.addEventListener('input', function () {
    console.log(pram.value);
    UpdateDrawing();
})

lengthInput.addEventListener('input', function () {
    UpdateDrawing();
})

radiusInput.addEventListener('input', function () {
    UpdateDrawing();
})

function UpdateDrawing()
{

    // clear the canvas
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // get the selected shape
    let shape = selectedShape;

    // get the parameter value
    let param = parseFloat(pram.value);

    // length of the nose cone
    let length = parseInt(lengthInput.value);

    // radius of the nose cone
    let radius = parseInt(radiusInput.value);

    // draw the shape
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    for (let x = 0; x <= length; x += 1) {
        let r = shape.getRadius(x, radius, length, param);
        ctx.lineTo(x - (length / 2), -r);
    }
    ctx.stroke();

    // draw the transition
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    for (let x = 0; x <= length; x += 1) {
        let r = shape.getRadius(x, radius, length, param);
        ctx.lineTo(x - (length / 2), r);
    }
    ctx.stroke();
    
    // close the end of the nose cone
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(length / 2, radius);
    ctx.lineTo(length / 2, -radius);
    ctx.stroke();
    
    // draw dotted lines though the center
    ctx.strokeStyle = 'red';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo((length / 2), 0);
    ctx.lineTo((-length / 2), 0);
    ctx.stroke();

    // draw dotted lines though the center
    ctx.strokeStyle = 'green';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(-length / 2, 0);
    ctx.lineTo(-length / 2, -radius);
    ctx.stroke();

    ctx.restore();
    
}
UpdateDrawing();