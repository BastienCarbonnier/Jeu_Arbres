var op =['→','¬','∧','∨'];


function init(){
	var expression ="¬(p→((p→q)→q))";
	interface = document.getElementById("interface");

	affichePremierElem(expression);

	interface.appendChild(expGraph);

	/** Test parserExpressionEnDeux
	testExpression("(a∧b)∧¬(bvc)");
	testExpression("¬a");
	testExpression("¬a∧b");
	testExpression("¬(av(c∧b))");
	*/
	/* Test resoudreEquation */
	//testResoudreEquation("av(c∧b)");
	//testResoudreEquation("¬(a→(c∧b))");
	testParserExpression("¬(a→(¬c∧b))");
}
function testParserExpression(expression){
	exp = parserExpression(expression);
	afficherExpressionAffichage(exp);
}
function testParserExpressionEnDeux(expression){
	exp = parserExpressionEnDeux(expression);
	afficherExpression(exp);
}
function testResoudreEquation(expression){
	exp = resoudreEquation(expression);
	afficherExpression(exp);
}

function Element (val,neg,taille){
	this.val = val;
	this.neg = neg;
	this.taille = taille;
}
function Expression (elt1,symbole,elt2,neg){
	this.elt1 = elt1;
	this.symbole = symbole;
	this.elt2 = elt2;
	this.neg = neg;
}
function ExpressionAffichage (elt1,symbole,elt2){
	this.elt1 = elt1;
	this.symbole = symbole;
	this.elt2 = elt2;
}

function afficherExpressionAffichage(exp){
	console.log(exp.elt1 + "     " +exp.symbole + "      "+ exp.elt2);
}

function recupererStringElement (elt){
	var val = elt.val;
	var res="";
	if (elt.neg){
		res += "¬";
		if(val.length>1)
			res += "("+val+")";
		else
			res += val;
	}
	else
		res +=val;
	return res;
}
function parserExpression (exp){
	e = resoudreEquation(exp); // Renvoi une Expression
	afficherExpression(e);
	if (e.neg){
		elt1_string = recupererStringElement(e.elt1);
		symbole = "¬";
	}
	else {
		elt1_string = recupererStringElement(e.elt1);
		elt2_string = recupererStringElement(e.elt2);
		symbole = e.symbole;
	}
	return new ExpressionAffichage(elt1_string,symbole,elt2_string);
}
function inverserElement (elt){
	return new Element(elt.val, !elt.neg, elt.taille);
}
function resoudreEquation(exp){
	e = parserExpressionEnDeux(exp);

	var symbole;
	var neg =false;
	if (e.neg){
		e2 = parserExpressionEnDeux(e.elt1.val);
		//console.log("Je suis dans resoudreEquation");
		//afficherExpression(e2);
		switch(e2.symbole) {
			case "→":
			elt1 = e2.elt1;
			elt2 = inverserElement(e2.elt2);
			symbole = "∧";
			break;
			case "∧":
			elt1 = inverserElement(e2.elt1);
			elt2 = inverserElement(e2.elt2);
			symbole = "∨";
			break;
			case "∨":
			elt1 = inverserElement(e2.elt1);
			elt2 = inverserElement(e2.elt2);
			symbole = "∧";
			break;
			case "¬":
			elt1 = inverserElement(e2.elt1);
			symbole = "";
			neg = true;
			break;
			default:
			console.log("Erreur lors de la vérification des symboles");
		}
	}
	else {
		switch(e.symbole) {
			case "→":
			elt1 = inverserElement(e.elt1);
			elt2 = e.elt2;
			symbole = "∨";
			break;
			default:
			elt1 = e.elt1;
			elt2 = e.elt2;
			symbole = e.symbole;
		}
	}
	return new Expression(elt1,symbole,elt2,neg);

}

function parserExpressionEnDeux(exp_string){
	var symbole;
	var neg =false;
	elt1 = trouverElement(exp_string);
	//console.log("Je suis dans parserExpressionEnDeux	" + exp_string);

	if ((elt1.taille === exp_string.length) && elt1.neg){
		symbole = "¬";
		elt2 = "";
		neg = true;
	}
	else{
		symbole = exp_string[elt1.taille];
		elt2 = trouverElement(exp_string.substr(elt1.taille+1));
	}
	e = new Expression (elt1, symbole, elt2, neg);
	//afficherExpression(e);
	return e;

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
		elt = exp[1];
		taille = 2;
		return new Element(elt,neg,taille);
	}
	else{
		elt = exp[0];
		return new Element(elt,neg,1);
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
