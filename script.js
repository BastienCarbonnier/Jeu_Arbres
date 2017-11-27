var expression;
var op =['→','¬','∧','∨']


function init(){
	var expression ="¬(p→((p→q)→q))";
	interface = document.getElementById("interface");

	affichePremierElem(expression);


}

function parentheseFermante(expr, index){
	var i = index+1;
	var trouve = false;
	var para = 1;
	while (i<expr.length && para!=0){
		if(index[i]=='('){
			para++;
		}
		if(index[i]==')'){
			para--;
		}
		i++;
	}
	return i;
}

function decompEnDeux(){

}