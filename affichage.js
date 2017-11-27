function affichage(event, formule){

	var exp = parserExpression(formule);
	var elem1 = exp.elt1;
	var elem2 = exp.elt2;
	var symb = exp.symbole;
	var el = event.target.parentElement.parentElement;

	if(symb==="∧"){
		affichageEt(el,elem1,elem2);
	}
	if(symb==="∨"){
		affichageOu(el,elem1,elem2);
	}

	//var txt = el.getElementsByClass("texteForm")[0].innerHTML;

	console.log(txt);



}
	

function afficheElem(parent, formule, pos){

	var element = document.createElement('div'); //div global
	element.setAttribute('class','element');
	

	console.log(pos);
	if(pos==="gauche"){
		element.classList.add('filsGauche');
		element.innerHTML = "<b>/</b>" + element.innerHTML;
	}
	if(pos==="droite"){
		element.classList.add('filsDroit');
		element.innerHTML = "<b>\\</b>" + element.innerHTML;
	}

	if(pos==="et"){
		element.innerHTML = "<b>|</b>" + element.innerHTML;
	}

	var divFormules = document.createElement('div'); //div d'affichage des formules
	divFormules.setAttribute('class','formules');

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
	afficheElem(interface, formule, "neutre")
}

function affichageOu(el, form1, form2){
	divFils = el.lastChild;
	afficheElem(divFils,form1,"gauche");
	afficheElem(divFils,form2,"droite");

}

function affichageEt(el, form1, form2){
	divFils = el.lastChild;
	afficheElem(divFils,form1,"et");
	afficheElem(divFils,form2);
}