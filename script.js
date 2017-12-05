var formules = [
	"p→((p→q)→q)",
	"p→(¬q→¬(p→q))",
	"(¬p→¬q)→(q→p)",
	"(p∧(p→q)∧((p→q)→r))→(p∧q∧r)",
	"(p→q)→((q→r)→(p→r))",
	"(((s∧p)→(q∧r))∧(¬r∨¬q)∧p)→¬s",
	"((p→q)∧((r∧s)→p)∧(t→r)∧(s∧t))→q",
	"(p→(q→r))→((p→q)→(p→r))",
	"(q→p)→((¬q→p)→p)",
	"p→(q→r)→((p→r)∨(q→r))",
	"((p→r)∨(q→r))→(p→(q→r))",
	"((p→q)∧(q→p))∨(p∧¬q)∨(¬p∧q)",
	"(¬(a∧b)→(¬a∨¬b))",
	"((¬a∨¬b)→¬(a∧b))",
	"((a∨b∨¬c)∧(a∨b∨c)∧(a∨¬b))→a",
	"(u∧(w→v)∧(t→v)∧(u→(w∨t)))→v",
	"r∨((p∧(p→q)∧((p→q)→r))→(p∧q∧r))∧(t→¬r)",
	"(p∨(q→¬p))∨((p∧(p→q)∧((p→q)→r))→(p∧q∧r))",
	"((p→(q→r))→((q→r)∨(q→r)))→((¬(¬q→¬p))∨¬q∨q)",
	"((((s∧p)→(q∧r))∧(¬r∨¬q)∧p)∧(t∧(s→¬t)))→¬s"
];
var scores = new Array();


function init(){
	var expression ="¬¬(p→((p→q)→q))";
	interface = document.getElementById("interface");

	affichePremierElem(expression);

	/** Test parserExpressionEnDeux
	testExpression("(a∧b)∧¬(bvc)");
	testExpression("¬a");
	testExpression("¬a∧b");
	testExpression("¬(av(c∧b))");
	*/
	/* Test resoudreEquation */
	//testResoudreEquation("av(c∧b)");
	//testResoudreEquation("¬(a→(c∧b))");
	//testParserExpression("¬(a→(¬c∧b))");
	/*var expr = "¬(((A→C)∨(B→C))→((A∨B)→C))";
	var expr2 = "(p∨(q→¬p))∨((p∧(p→q)∧((p→q)→r))→(p∧q∧r))";
*/
	var expr = obtenirFormuleAleatoire();

}
function reinitialiserScores(){
	for (i in formules){
		localStorage.setItem(formules[i],Infinity);
	}
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

	var e = resoudreEquation(exp); // Renvoi une Expression
	//console.log("Dans parser Expression : e = ");
	//afficherExpression(e);
	var elt1_string, elt2_string="";

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

function recupererStringExpressionAffichage (exp_aff){
	var res = "";
	if (exp_aff.symbole === "¬"){
		res = "¬(" + exp_aff.elt1 + ")";
	}
	else{
		res = exp_aff.elt1 + exp_aff.symbole + exp_aff.elt2;
	}
	return res;
}
function inverserElement (elt){
	return new Element(elt.val, !elt.neg, elt.taille);
}
function resoudreEquation(exp){
	var e = parserExpressionEnDeux(exp);
	//console.log("expression : "+exp);
	//console.log("Premier parsage : ");
	//afficherExpression(e);

	var symbole;
	var neg =false;
	if (e.neg){
		e2 = parserExpressionEnDeux(e.elt1.val);
		//console.log("Deuxième parsage : ");
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
				symbole = "¬";
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

	if (elt1 === "undefined"){
		return "undefined";
	}

	if ((elt1.taille === exp_string.length) && elt1.neg){
		symbole = "¬";
		elt2 = "";
		neg = true;
	}
	else{
		symbole = exp_string[elt1.taille];
		elt2 = trouverElement(exp_string.substr(elt1.taille+1));
	}

	return new Expression (elt1, symbole, elt2, neg);

}

function trouverElement(exp){
	var elt = "";
	var neg =false;
	var taille = 0;
	var ind_par_f = 0;
	var ind_par_o = 0;


	if (exp[0] === "¬"&& exp[1] === "("){
		neg = true;
		ind_par_f = trouverParentheseFermante(exp,1)-1;
		ind_par_o = 1;
		taille += 1;

		elt = exp.substr(ind_par_o+1,ind_par_f-1);
		taille = taille + elt.length + 2;
	}
	else if (exp[0] === "("){
		ind_par_f = trouverParentheseFermante(exp,0);
		ind_par_o = 0;

		elt = exp.substr(ind_par_o+1,ind_par_f-1);
		taille = taille + elt.length + 2;
	}
	else if (exp[0] === "¬"){
		neg = true;
		elt = exp.substr(1);
		taille = exp.length;
	}
	else if (exp === "undefined"){
		elt = "";
		taille = 0;
	}
	else{
		elt = exp[0];
		taille = 1;
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

function afficherExpression(exp){
	console.log(exp.elt1.val + "     " +exp.symbole + "      "+ exp.elt2.val);

	console.log(exp.elt1.neg + "     " +exp.symbole + "      "+ exp.elt2.neg);
}
function verifMeilleurScore(nb_mis, exp_string){
	//var max = calculerNbEtapesMax(exp_string);
	var nb_save = localStorage.getItem(exp_string);
	if (nb_mis<nb_save){
		nb_save = nb_mis;
		return true;
	}
	return false;

}

function calculerNbEtapesMax(exp_string){
	if (exp_string.length <=2)
		return 0;
	var exp = resoudreEquation(exp_string);
	console.log ("Debut calculerNbEtapes()    ");
	if (exp === "undefined"){
		return 0;
	}
	afficherExpression(exp);

	var op = ["∨","∧","→","¬"];
	if (!op.includes(exp.symbole)){
		return 0;
	}
	else if (exp.symbole === "¬"){
		console.log(recupererStringElement(exp.elt1));
		return 1
			+ calculerNbEtapesMax(recupererStringElement(exp.elt1));
	}
	else {
		return 2
			+ calculerNbEtapesMax(recupererStringElement(exp.elt1))
			+ calculerNbEtapesMax(recupererStringElement(exp.elt2));
	}
}

function obtenirFormuleAleatoire (){
	return formules[Math.floor(Math.random()*formules.length)];
}
function testCalculerNbEtapes(exp){
	var nb = calculerNbEtapesMax(exp);
	console.log("nb d'étapes = "+nb);
}
function testCalculerScore(nb_mis,exp){
	var res = calculerScore(nb_mis,exp);
	console.log("resultat   =   " + res);
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
