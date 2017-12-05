function affichage(event, formule){

	var exp = parserExpression(formule);
	var elem1 = exp.elt1;
	var elem2 = exp.elt2;
	var symb = exp.symbole;
	var el = event.target.parentElement.parentElement;
	var parent = el.parentElement;

	parent.removeChild(el);
	parent.appendChild(el);


	//console.log(parent.children);
	//on récupère les formules précédentes
	var listeElem = parent.children;

	var ListForm = [];

	for(var i =1; i<listeElem.length -1; i++){
		var sousListe = listeElem[i].children[0]
		//console.log(sousListe);
		for(var j=0; j<sousListe.children.length; j++){
			ListForm.push(sousListe.children[j]);
		}
	}

	console.log(ListForm);


	if(symb==="∧"){
		affichageEt(el,elem1,elem2,ListForm);
	}
	else if(symb==="∨"){
		affichageOu(el,elem1,elem2,ListForm);
	}
	else
		affichageEt(el,elem1,elem2,ListForm);

	//var txt = el.getElementsByClass("texteForm")[0].innerHTML;




}
	

function afficheElem(parent, formule, pos, listeForm){

	var element = document.createElement('div'); //div global
	element.setAttribute('class','element');
	

	if(pos==="gauche"){
		element.classList.add('filsGauche');
		element.innerHTML = "<b>/</b>" + element.innerHTML;
	}
	if(pos==="droite"){
		element.classList.add('filsDroit');
		element.innerHTML = "<b>\\</b>" + element.innerHTML;
	}

	if(pos==="et"){
		//element.innerHTML = "<b>|</b>" + element.innerHTML;
	}

	var divFormules = document.createElement('div'); //div d'affichage des formules
	divFormules.setAttribute('class','formules');
	for(var i=0; i<listeForm.length; i++){
		divFormules.appendChild(listeForm[i].cloneNode(true));
	}


	var texteForm = document.createElement('div'); //affichage première formule
	texteForm.setAttribute('class','texteForm');
	texteForm.innerHTML = formule;

	texteForm.setAttribute('onclick','affichage(event,"'+formule+'");');

	divFormules.appendChild(texteForm);

	var divFils = document.createElement('div');
	divFils.setAttribute('class','fils');

	element.appendChild(divFormules);
	element.appendChild(divFils);

	//interface.appendChild(element);
	parent.appendChild(element);
}

function affichePremierElem(formule){
	liste = [];
	afficheElem(interface, formule, "neutre",liste);
}

function affichageOu(el, form1, form2, listeForm){
	divFils = el.lastChild;
	afficheElem(divFils,form1,"gauche",listeForm);
	afficheElem(divFils,form2,"droite",listeForm);

}

function affichageEt(el, form1, form2, listeForm){
	divFils = el.lastChild;
	listeVide = [];
	divFils.innerHTML = "<b>|</b>" + divFils.innerHTML;
	afficheElem(divFils,form1,"et",listeForm);
	afficheElem(divFils,form2,"",listeVide);
}