import './App.css';
import { useEffect, useRef } from 'react';

function App() {
   
  return (
    <div>
     <Canvas width="100%" height="100%"></Canvas>
     <Div />
    </div>
  )
  
}

function Div() {
  return(
    <div className="box-1">
      <h1>Transformation</h1>
      <p>this is a dummy text to show that the div is working perfectly with the respect to the absorlute positioning dispite canvas contradiction or disturbance </p>
    </div>
  )
}

 
const Canvas = ({width, height}) => {

  const canvasRef = useRef(null);

  useEffect(() => {


    const canv = document.querySelector('canvas');

    canv.width = window.innerWidth;
    canv.height = window.innerHeight;

    let canvas = canvasRef.current;
    if(!canvas){
      return;
    }
    var c = canvas.getContext("2d");
    if(!c) {
      return;
    }

    let mouse = {
      x: undefined,
      y: undefined

    }

    window.addEventListener('mousemove', 
          function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
          })

    let colorArray = [

      '#011140',
      '#011526',
      '#9BD1F2',
      '#025E73',
      '#037F8C',
    ];

    window.addEventListener('resize', function(){

      canv.width = document.body.clientWidth;
      canv.height = document.body.clientHeight;

      init();
    })
    

    class Circle {
      constructor(x, y, dx, dy, radius) {
        
        this.x = x ;
        this.y = y ;
        this.dx = dx;
        this.dy = dy ; 
        this.radius =radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
        
      }

      draw(c) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = 'blue'; 
        c.fillStyle = this.color;
        c.fill();
      }

      move() {
        if (this.x + this.radius > document.body.clientWidth || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
  
        if (this.y + this.radius > document.body.clientHeight || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }
  
        this.x += this.dx;
        this.y += this.dy;
  
        //interction

        if (mouse.x -this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {

          if(this.radius < 40){
            this.radius += 1;
          } 
        }else if (this.radius > this.minRadius) {
          this.radius -= 1;
        }
      }
    }

    
    let circleArray = [];

    function init() {

      circleArray = [];

      for (let i = 0 ; i<800 ; i++) {
        
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (document.body.clientWidth - radius * 2) + radius;
        let y = Math.random() * (document.body.clientHeight - radius * 2) + radius;
        let dx = (Math.random() -0.5) ;
        let dy = (Math.random() -0.5) ;
        circleArray.push(new Circle( x, y, dx, dy, radius));
        
      }
    }

    function animate () {

      requestAnimationFrame(animate);
      c.clearRect( 0, 0, document.body.clientWidth, document.body.clientHeight);

      for (let i = 0; i < circleArray.length; i++) {

       circleArray[i].draw(c);
       circleArray[i].move();

      }
      
    }

    init();
    animate(); 
    


    

  }, []);

  //console.log(canvasRef)

  return(
      <canvas 
      width={width} 
      height={height}
      ref={ canvasRef } />
  );
}




export default App;
