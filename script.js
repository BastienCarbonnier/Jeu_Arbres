var expression;
var op =['→','¬','∧','∨']


function init(){
	var expression ="¬(p→((p→q)→q))";
	interface = document.getElementById("interface");

	var expGraph = document.createElement('p');
	expGraph.setAttribute('class','exp');
	expGraph.innerHTML = expression;

	interface.appendChild(expGraph);


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