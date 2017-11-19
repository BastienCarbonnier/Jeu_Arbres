var expression;
var op =['→','¬','∧','∨']


function init(){
	var expression ="¬(p→((p→q)→q))";
	interface = document.getElementById("interface");

	var expGraph = document.createElement('p');
	expGraph.setAttribute('class','exp');
	expGraph.innerHTML = expression;

	interface.appendChild(expGraph);
    console.log(trouverParentheseFermante("((Salu))t",0));
    console.log(trouverParentheseFermante("((Salu)thziz)",1));
}

var Expression = function (){};

function Expression (elt1,symbole,elt2){

}
function trouverElement(exp){
    var elt = new String("");
    var neg =false;

    var ind_par_f = 0;
    var ind_par_o = 0;


    if (exp[0] === "¬"){
        neg = true;

        ind_par_f = trouverParentheseFermante(exp,1);
        ind_par_o = 1;

    }
    else if (exp[0] === "("){
        ind_par_f = trouverParentheseFermante(exp,0);
        ind_par_o = 0;
    }

    if (ind_par_f==0)
        elt = exp;
    else
        elt = exp.substr(ind_par_o,ind_par_f);

}
function decoupage(){

		
}

function trouverParentheseFermante(expression, indice){
	var trouve = false;
	var par = 0;
    expression = expression.substr(index);
	for (i in expression){
        if (expression[i]==="(")
            par++;
        else if (expression[i]===")")
            par--;
        if (par == 0)
            break;
	}
	return (new Number(i)+new Number(indice));
}
