'use strict';


const sectionImg = document.getElementById( 'sectionImg' );

const leftImg = document.getElementById( 'leftImage' );

const centerImg = document.getElementById( 'centerImage' );

const rightImg = document.getElementById( 'rightImage' );

const savein = document.getElementById( 'savein' );



let imgArrayName = ['bag','banana','bathroom','boots'
  ,'breakfast','bubblegum','chair',
  'cthulhu','dog-duck','dragon',
  'pen','pet-sweep','scissors',
  'shark','sweep','tauntaun',
  'unicorn','usb','water-can',
];

let imgArrayPath = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg',
  'breakfast.jpg','bubblegum.jpg','chair.jpg',
  'cthulhu.jpg','dog-duck.jpg','dragon.jpg',
  'pen.jpg','pet-sweep.jpg','scissors.jpg',
  'shark.jpg','sweep.png','tauntaun.jpg',
  'unicorn.jpg','usb.gif','water-can.jpg'
];

Img.all = [];


function Img( name,path ) {
  this.name = name;
  this.img = `./img/${path}`;
  this.shown = 0;
  this.clicks = 0;
  Img.all.push( this );
}


for ( let i = 0; i < imgArrayPath.length; i++ ) {
  new Img( imgArrayName[i],imgArrayPath[i] );
}
// console.log( Img.all );
let count = 0;
let NumberOfClicKAllowable = 25;

sectionImg.addEventListener( 'click' , eventClick );


let leftImageIndex = 0;
let centerImageIndex = 0;
let rightImageIndex = 12;



function eventClick( c ) {
  c.preventDefault();
  count ++;

  if ( ( c.target.id === 'leftImage' || c.target.id === 'centerImage' || c.target.id === 'rightImage' )
   && count < NumberOfClicKAllowable ) {

    if( c.target.id === 'leftImage' ) {
      Img.all[leftImageIndex].clicks++;

    }
    if( c.target.id === 'centerImage' ) {
      Img.all[centerImageIndex].clicks++;
    }
    if( c.target.id === 'rightImage' ) {
      Img.all[rightImageIndex].clicks++;
    }
    renderImg();
  } else {button.disabled = false;



    // document.getElementById( 'sectionImg' ).removeEventListener( 'click', eventClick );
  }

}

let leftIndex = 0;
let centerIndex = 0;
let rightIndex =  0;


function renderImg() {
  leftImageIndex = leftIndex;
  centerImageIndex = centerIndex ;
  rightImageIndex = rightIndex;
  leftIndex ;
  centerIndex ;
  rightIndex;


  do {leftIndex = randomNumber( 0, imgArrayPath.length - 1 );
    centerIndex = randomNumber( 0, imgArrayPath.length - 1 );
    rightIndex = randomNumber( 0, imgArrayPath.length - 1 );}
  while( leftIndex === rightIndex || leftIndex === centerIndex || centerIndex === rightIndex || leftIndex === leftImageIndex || leftIndex === centerImageIndex || leftIndex === rightImageIndex || centerIndex === leftImageIndex || centerIndex === centerImageIndex || centerIndex === rightImageIndex || rightIndex === leftImageIndex || rightIndex === centerImageIndex || rightIndex === rightImageIndex );






  leftImg.src = Img.all[leftIndex].img;
  centerImg.src = Img.all[centerIndex].img;
  rightImg.src = Img.all[rightIndex].img;



  Img.all[leftIndex].shown++;
  Img.all[centerIndex].shown++;
  Img.all[rightIndex].shown++;

}


renderImg();




function randomNumber( min, max ) {
  min = Math.ceil( min );
  max = Math.floor( max );
  return Math.floor( Math.random() * ( max - min + 1 ) + min ); //The maximum is inclusive and the minimum is inclusive
}





const button = document.getElementById( 'button' );

button.addEventListener( 'click' , clickButton );

function clickButton() {

  let data =  JSON.parse( localStorage.getItem( 'saveImg' ) );
  if ( data ) {
    for ( let i = 0 ; i < imgArrayPath.length; i++ ){
      Img.all[i].clicks = Img.all[i].clicks + data[i].clicks ;
      Img.all[i].shown = Img.all[i].shown + + data[i].shown;
    }}

  const ulElement = document.createElement( 'ul' );
  savein.appendChild( ulElement );
  for ( let i = 0 ; i < imgArrayPath.length; i++ ){

    let liElementT = document.createElement( 'li' );
    ulElement.appendChild( liElementT );

    liElementT.textContent = `${Img.all[i].name }  had  ${Img.all[i].clicks } votes, and was seen ${Img.all[i].shown }`;
  }

  renderChart();







  localStorage.setItem( 'saveImg', JSON.stringify( Img.all ) );


  button.removeEventListener( 'click', clickButton );
}



function renderChart() {

  let clicks = [];
  let names = [];
  let shown = [];
  for( let i = 0; i < Img.all.length; i++ ) {
    clicks.push( Img.all[i].clicks );
    names.push( Img.all[i].name );
    shown.push( Img.all[i].shown );

  }

  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  let myChart = new Chart( ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: clicks,
        backgroundColor:
        'rgba(255, 0, 0, 0.4)',
        borderColor:
          'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }, {
        label: '# of shown',
        data: shown,
        backgroundColor:
          'rgb(0, 0, 255)',
        borderColor:
          'rgba(144, 99, 100, 1)',
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  } );


}






