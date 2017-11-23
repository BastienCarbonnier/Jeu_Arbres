var expression;
var op =['→','¬','∧','∨'];


function init(){
	var expression ="¬(p→((p→q)→q))";
	interface = document.getElementById("interface");

	var expGraph = document.createElement('p');
	expGraph.setAttribute('class','exp');
	expGraph.innerHTML = expression;

	interface.appendChild(expGraph);
	exp = parserExpressionEnDeux("(a∧b)∧¬(bvc)");
	afficherExpression(exp);
	
	exp = parserExpressionEnDeux("¬a");
	afficherExpression(exp);
	exp = parserExpressionEnDeux("¬a∧b");
	afficherExpression(exp);
	exp = parserExpressionEnDeux("¬av(c∧b)");
	afficherExpression(exp);
}

function Element (val,neg,taille){
	this.val = val;
	this.neg = neg;
	this.taille = taille;
}
function Expression (elt1,symbole,elt2){
	this.elt1 = elt1;
	this.symbole = symbole;
	this.elt2 = elt2;
}

function parserExpression (exp){

}

function resoudreEquation (exp){
	var e = parserExpressionEnDeux(exp);
	var elt1,elt2;
	switch(e.symbole) {
	    case "→":
	        e.elt1.neg = !e.elt1.neg;

	        break;
	    case "∧":

	        break;
		case "∨":

			break;
	    default:
			console.log("");
}
}

function parserExpressionEnDeux(exp){
	var symbole;

	elt1 = trouverElement(exp);
	symbole = exp[elt1.taille];
	elt2 = trouverElement(exp.substr(elt1.taille+1));

	return new Expression (elt1, symbole, elt2);

}
function afficherExpression(exp){
	console.log(exp.elt1.val + "     " +exp.symbole + "      "+ exp.elt2.val);

	console.log(exp.elt1.neg + "     " +exp.symbole + "      "+ exp.elt2.neg);
}


function trouverElement(exp){
	var elt = new String("");
	var neg =false;
	var taille = 0;
	var ind_par_f = 0;
	var ind_par_o = 0;


	if (exp[0] === "¬"&& exp[1] === "("){
		neg = true;
		ind_par_f = trouverParentheseFermante(exp,1)-1;
		ind_par_o = 1;
		taille += 1;
	}
	else if (exp[0] === "("){
		ind_par_f = trouverParentheseFermante(exp,0);
		ind_par_o = 0;
	}
	else if (exp[0] === "¬"){
		neg = true;
		elt = exp.substr(1,1);
		taille = 2;
		return new Element(elt,neg,taille);
	}

	if (ind_par_f==0){
		elt = exp;
		taille = exp.length;
	}
	else{
		elt = exp.substr(ind_par_o+1,ind_par_f-1);
		taille = taille + elt.length + 2;
	}
	return new Element(elt,neg,taille);
}

function trouverParentheseFermante(exp, indice){
	var trouve = false;
	var par = 0;
	exp = exp.substr(indice);
	for (i in exp){
		if (exp[i]==="(")
			par++;
		else if (exp[i]===")")
			par--;
		if (par == 0)
			break;
	}
	return (new Number(i)+new Number(indice));
}
