'use strict';

const sectionImg = document.getElementById( 'sectionImg' );

const leftImg = document.getElementById( 'leftImage' );

const centerImg = document.getElementById( 'centerImage' );

const rightImg = document.getElementById( 'rightImage' );

leftImg.src = './img/bag.jpg';
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
console.log( Img.all );
let count = 0;
let NumberOfClicKAllowable = 25;

sectionImg.addEventListener( 'click' , eventClick );


let leftImageIndex = 0;
let centerImageIndex = 0;
let rightImageIndex = 0;



function eventClick( c ) {

  count ++;

  if ( ( c.target.id === 'leftImage' || c.target.id === 'rightImage' || c.target.id === 'centerImage' )
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
  } else {
    document.getElementById( 'sectionImg' ).removeEventListener( 'click', eventClick );
  }

}

function renderImg() {
  let leftIndex = randomNumber( 0, imgArrayPath.length - 1 );
  let centerIndex ;randomNumber( 0, imgArrayPath.length - 1 );
  let rightIndex;

  do {
    centerIndex = randomNumber( 0, imgArrayPath.length - 1 );
    rightIndex = randomNumber( 0, imgArrayPath.length - 1 );
  } while ( leftIndex === rightIndex || leftIndex === centerIndex || centerIndex === rightIndex );

  leftImg.src = Img.all[leftIndex].img;
  centerImg.src = Img.all[centerIndex].img;
  rightImg.src = Img.all[rightIndex].img;

  leftImageIndex = leftIndex;
  centerImageIndex = centerIndex ;
  rightImageIndex = rightIndex;

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

function renderClick() {
  const parentElement = document.getElementById( 'main' );


  const ulElement = document.createElement( 'ul' );
  parentElement.appendChild( ulElement );

  for ( let i = 0 ; i < imgArrayPath.length; i++ ){

    let liElementT = document.createElement( 'li' );
    ulElement.appendChild( liElementT );
    liElementT.textContent = `${Img.all[i].name}  had  ${Img.all[i].clicks} votes, and was seen ${Img.all[i].shown}`;
  }


}

function clickButton() {
  renderClick();
}

