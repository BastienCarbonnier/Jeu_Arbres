var aVerif = [];
var nbBranche = 1;
var svg;
var tabLien = [];


function Lien(el1,el2) {
    this.el1 = el1;
    this.el2 = el2;
}

function affichage(event, formule){

	var exp = parserExpression(formule);
	var elem1 = exp.elt1;
	var elem2 = exp.elt2;
	var symb = exp.symbole;
	var el = event.target.parentElement.parentElement;
	var parent = el.parentElement;

	parent.removeChild(el);
	parent.appendChild(el);


	//on récupère les formules précédentes
	var divForm = el.children[1];

	var ListForm = [];

	for(var i =0; i<divForm.children.length; i++){
		if (divForm.children[i].innerHTML!==formule) {
			ListForm.push(divForm.children[i]);
		}
		divForm.children[i].setAttribute('onclick','');
		divForm.children[i].classList.remove('cliquable');
	}



	if(symb==="∧"){
		affichageEt(el,elem1,elem2,ListForm);
	}
	else if(symb==="∨"){
		affichageOu(el,elem1,elem2,ListForm);
	}
	else
		affichageEt(el,elem1,elem2,ListForm);

}


function afficheElem(parent, formule, pos, listeForm){

	resetAVerif();

	var element = document.createElement('div'); //div global
	element.setAttribute('class','element');


	if(pos==="gauche"){
		element.classList.add('filsGauche');
		element.innerHTML = "<b></b>" + element.innerHTML;
	}
	if(pos==="droite"){
		element.classList.add('filsDroit');
		element.innerHTML = "<b></b>" + element.innerHTML;
	}

	if(pos==="et"){
		element.innerHTML = "<b></b>" + element.innerHTML;
	}

	if(pos==="neutre"){
		element.innerHTML = "<b></b>" + element.innerHTML;
	}

	var divFormules = document.createElement('div'); //div d'affichage des formules
	divFormules.setAttribute('class','formules');
	for(var i=0; i<listeForm.length; i++){
		divFormules.appendChild(listeForm[i].cloneNode(true));
	}

	//Activation des event
	for(var i=0; i<divFormules.children.length; i++){ //pour toutes les formules
		var form = divFormules.children[i];
		if(!estUnLitteral(form.innerHTML)){
			form.setAttribute('onclick','affichage(event,"'+form.innerHTML+'");');
		}else{
			form.setAttribute('onclick','contradiction(event);');
		}
		form.classList.add('cliquable');
	}


	var texteForm = document.createElement('div'); //affichage première formule
	texteForm.setAttribute('class','texteForm');
	texteForm.innerHTML = formule;

	if(!estUnLitteral(formule)){
		texteForm.setAttribute('onclick','affichage(event,"'+formule+'");');
	}else{
		texteForm.setAttribute('onclick','contradiction(event);');
	}
	texteForm.classList.add('cliquable');

	divFormules.appendChild(texteForm);

	var divFils = document.createElement('div');
	divFils.setAttribute('class','fils');

	element.appendChild(divFormules);
	element.appendChild(divFils);

	//interface.appendChild(element);
	parent.appendChild(element);

	if(pos!=="neutre"){
		//creerLien(parent,element);
		var lien = new Lien(parent,element);
		tabLien.push(lien);
	}

}

function suiteEt(parent, formule){

	var element = parent.children[0]; //première partie du ET

	var divFormules = element.children[1]; //première partie de l'elem : divFormules


	var texteForm = document.createElement('div'); //affichage première formule
	texteForm.setAttribute('class','texteForm');
	texteForm.innerHTML = formule;

	if(!estUnLitteral(formule)){
		texteForm.setAttribute('onclick','affichage(event,"'+formule+'");');
	}else{
		texteForm.setAttribute('onclick','contradiction(event);');
	}
	texteForm.classList.add('cliquable');


	divFormules.appendChild(texteForm);


}

function affichePremierElem(formule){
	liste = [];
	svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
		svg.setAttribute("height",interface.scrollHeight + 100);
		svg.setAttribute("width","100%");
		svg.setAttribute('id','monsvg');
	interface.appendChild(svg);
	afficheElem(interface, formule, "neutre",liste);
}

function affichageOu(el, form1, form2, listeForm){
	divFils = el.lastChild;
	afficheElem(divFils,form1,"gauche",listeForm);
	afficheElem(divFils,form2,"droite",listeForm);
	nbBranche++; //on obtient une branche supplémentaire
	actualiserLiens();

}

function affichageEt(el, form1, form2, listeForm){
	divFils = el.lastChild;
	listeVide = [];
	//divFils.innerHTML = "<b>|</b>" + divFils.innerHTML;
	afficheElem(divFils,form1,"et",listeForm);
	if(form2!==undefined){
		suiteEt(divFils,form2);
	}
	
	actualiserLiens();
}

function affichageFin(el){
	divFils = el.lastChild;
	listeVide = [];
	//divFils.innerHTML = "<b>|</b>" + divFils.innerHTML;
	afficheElem(divFils,"⊥","et",listeVide);
	actualiserLiens();
}

function estUnLitteral(txt){

	switch(txt.length){
		case 1 :
			return true;
		case 2 :
			if (txt[0]==='¬'){
				return true;
			}else{
				return false;
			}
		default :
			return false;
	}
}

function contradiction(event){

	elem = event.target;
	switch(aVerif.length){
		case 0 :
			aVerif.push(elem);
			elem.classList.add('actif');
			break;
		case 1 :
			if(aVerif[0].parentElement == elem.parentElement){ //si dans la même branche
				var e1 = aVerif[0].innerHTML;
				var e2 = elem.innerHTML;
				if(e1.slice(1)===e2 || e2.slice(1)===e1){ //si pareil sauf premier char (le non)
					affichageFin(elem.parentElement.parentElement);
                	var divForm = elem.parentElement;

					for(var i =0; i<divForm.children.length; i++){
						divForm.children[i].setAttribute('onclick','');
						divForm.children[i].classList.remove('cliquable');
					}

					nbBranche--;
					if (nbBranche==0) {
						var score = document.getElementById("score");
						var scoreMin = getScoreMin();
						var scoreCourant = getScoreCourant();
                        var formule = localStorage.getItem("formule");
                        if (scoreMin ===Infinity){
                            calculerScore();
                            alert("Toutes les contradictions ont été trouvées ! \nLa formule : "+formule.substring(2,formule.length-1)+" est valide !\nVous avez inscrit un nouveau meilleur score de "+scoreCourant);
                        }
                        else{
                            if(calculerScore()){
    							//joueur gagnant
    							score.innerHTML = scoreCourant;
    							alert("Toutes les contradictions ont été trouvées ! \nLa formule : "+formule.substring(2,formule.length-1)+" est valide !\nBravo vous avez battu le meilleur score qui était de "+scoreMin+" avec un score de "+scoreCourant);

    						}
    						else{
    							alert("Toutes les contradictions ont été trouvées ! \nLa formule : "+formule.substring(2,formule.length-1)+" est valide !\nVous n'avez pas battu le meilleur score qui était de "+scoreMin+". Votre score est de "+scoreCourant);

    						}
                        }

                        initialiserScore();

					}

					resetAVerif();
				}else{
					resetAVerif();
				}

			}else{
				resetAVerif();
				aVerif.push(elem);
				elem.classList.add('actif');
			}
			break;
		default:
			resetAVerif();

	}
}

function resetAVerif(){
	while(aVerif.length!=0){
		aVerif[aVerif.length - 1].classList.remove('actif');
		aVerif.pop();
	}
}

/*Met en place la liste des formuales dans le menu déroulant
*/
function afficheMenu(){
	var dropList = document.getElementById("choix");

	for(var i=0; i<formules.length; i++){
		var form = document.createElement('option'); //affichage première formule
		form.innerHTML = formules[i];
		dropList.appendChild(form);
	}
}

function viderInterface(){
	interface = document.getElementById("interface");
	interface.innerHTML="";
}

function changerFormule(){
	localStorage.setItem("score_courant",0);
	var dropList = document.getElementById("choix");
	var choix = dropList.value;
	localStorage.setItem("formule",choix);
	viderInterface();
    affichePremierElem(choix);
    nbBranche = 1;
    aVerif = [];

    initialiserScore();

}

function formuleAleatoire(){
	var choix = obtenirFormuleAleatoire();
	localStorage.setItem("formule",choix);
    initialiserScore();
	viderInterface();
    affichePremierElem(choix);
    nbBranche = 1;
    aVerif = [];
}
function initialiserScore(){
    var score = document.getElementById("score");
    var scoreMin = getScoreMin();

    if (scoreMin === Infinity){
        score.innerHTML = "---";
    }
    else{
        score.innerHTML = getScoreMin();
    }

}

function creerLien(parent,element){
	var formulesParent = parent.parentElement.children[1];

	var posPere = getPosition(formulesParent);
	var posFils = getPosition(element);
	var posInterface = getPosition(interface);


	var xp = posPere.x+Math.trunc(formulesParent.clientWidth/2) - posInterface.x;
	var yp = posPere.y+formulesParent.clientHeight - posInterface.y;

	var xf = posFils.x+Math.trunc(element.clientWidth/2) - posInterface.x;
	var yf = posFils.y- posInterface.y;

	var line = document.createElementNS('http://www.w3.org/2000/svg', "line");
		line.setAttribute('x1',xp);
		line.setAttribute('y1',yp);
		line.setAttribute('x2',xf);
		line.setAttribute('y2',yf);
		line.setAttribute('stroke','black');

	svg.appendChild(line);

}

function actualiserLiens(){
	svg.innerHTML = ""; //on détruit tous les traits précédents
	for(var i=0;i<tabLien.length;i++){
		creerLien(tabLien[i].el1,tabLien[i].el2);
	}
	svg.setAttribute("height",interface.scrollHeight + 100);
}


function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}
