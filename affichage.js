function affichage(str1, str2, op, neg){
	//switch
}

function afficheElem(parent, formule){

	var element = document.createElement('div'); //div global
	element.setAttribute('class','element');

	var divFormules = document.createElement('div'); //div d'affichage des formules

	var texteForm = document.createElement('div'); //affichage première formule
	texteForm.setAttribute('class','texteForm');
	texteForm.innerHTML = formule;

	divFormules.appendChild(texteForm);

	var divFils = document.createElement('div');
	divFils.setAttribute('class','fils');

	element.appendChild(divFormules);
	element.appendChild(divFils);

	//interface.appendChild(element);
	parent.appendChild(element);
}

function affichePremierElem(formule){
	afficheElem(interface, formule)
}

function affichageOu(el){
	divFils = el.lastChild;
	console.log(divFils);
	afficheElem(divFils,"test fils gauche");
	afficheElem(divFils,"test fils droit");

}

function affichageEt(el){

}