//Variables
var wide= 20;
var long= 20;
var timer;
var sec;
const window_width=window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;
const window_height = window.innerHeight|| document.documentElement.clientHeight|| 
document.body.clientHeight;

var record = localStorage.best;
if (record == undefined){
	record=0
}
//Fonction qui donne un numero aleatoire
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//Change la couleur des cases autour
function change_color(cible,maxX,maxY) {
	if (cible.id=="conteneur"){
		return;
	}
	xy=cible.id.split("-")
	//var x = parseInt(cible.id.substring(s.lastIndexOf(":") + 1, str.lastIndexOf(";"));
	var x = parseInt(xy[0]);
	var y = parseInt(xy[1]);
	for (var movex = -1; movex < 2; movex++) {
		for (var movey = -1; movey < 2; movey++) {
			if (-1<y+movey && y+movey<maxY && -1<x+movex && x+movex<maxX){
				cell=document.getElementById((x+movex)+"-"+(y+movey));
				(cell.style.backgroundColor == "rgb(255, 0, 0)" || cell.style.backgroundColor == " ") ? (cell.style.backgroundColor="rgb(0, 255, 0)") : (cell.style.backgroundColor = "rgb(255, 0, 0)");
			}		
		}
	}
}
//Active quand on clique sur case
function on_click(e){
	change_color(e.target,wide,long);

	//Verifier si il gagne
		//fonction qui filtre sil est vert
	function checkColor(square) {
  		return ((square.style.backgroundColor=="rgb(0, 255, 0)") || (square.style.backgroundColor==""));
	}
	if (Object.values(document.getElementsByClassName("carre")).every(checkColor)) {
		finish();
	}
}
function finish() {
	//Retire les intervales et les event
	clearInterval(timer);
	document.querySelector("#conteneur").removeEventListener('click',on_click);
	//Compare avec le record en localStorage
	if (record==0 || sec<record){
		localStorage.best=sec;
		document.getElementById("Best").innerHTML=("Best: "+Math.floor(record/3600)+"h"+Math.floor(record/60)%61+"'"+record%61+"''");
	}
	//Rafraichit
	location.reload();
}	
//Commence avec tableau aleatoire
function shuffle(){
	for (var i = 0; i < (long+wide)*2; i++) {
		xrand=randomIntFromInterval(0, wide-1);
		yrand=randomIntFromInterval(0, long-1);
		change_color(document.getElementById(xrand+"-"+yrand),wide,long);
		
	}
}

//Creation du tableau
var ligne;
tableau=document.querySelector("#conteneur");
tableau.style.width=(window_height*0.8)+"px";
tableau.style.height=(window_height*0.8)+"px";
for (var row = 0; row < wide; row++) {
	ligne=document.createElement("tr");
	ligne.id="y"+row;
	for (var column = 0; column < long; column++) {
  		carre = document.createElement("td");
  		carre.className="carre";
  		carre.id=column+"-"+row;
  		carre.style.width=(100/wide)+"%";
  		carre.style.height=(100/long)+"%";
  		ligne.appendChild(carre);
	};
	tableau.appendChild(ligne);
};
//Mise en page
document.querySelector("body").style.borderWidth=(window_width-window_height*0.8)/2+"px";
document.getElementById("boite_commencer").style.height=window_height*0.2+"px";
//mise en place du record
document.getElementById("Best").innerHTML=("Best: "+Math.floor(record/3600)+"h"+Math.floor(record/60)%61+"'"+record%61+"''");
//Commencer
function start() {
	//Mise en place du temps
	document.getElementById("start").innerHTML=(0+"h"+0+"'"+0+"''");
	sec=0;
	var h;
	var min;
	timer=setInterval(function(){
		sec+=1;
		min=Math.floor(sec/60);
		h=Math.floor(sec/3600);
		document.getElementById("start").innerHTML=(h+"h"+min%61+"'"+sec%61+"''");
	},1000)
	//Melange le tableau
	shuffle();
	//Ajoute ecouteur sur le tableau
	document.querySelector("#conteneur").addEventListener('click',on_click);
	document.querySelector("#start").removeEventListener('click', start);
};
document.querySelector("#start").addEventListener('click',start);
