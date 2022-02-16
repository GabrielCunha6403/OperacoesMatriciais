
//================================== CLASSES ================================== 
    
    class Matriz{
        constructor(n, m){
            this.n = n;
            this.m = m;

            let matriz = [n];
            
            for(var i = 0; i < n; i++){
                matriz[i] = [m];
            }

            this.matriz = matriz;
        }

        getN(){
            return this.n;
        }
        
        getM(){
            return this.m;
        }

    }

    /*class Termo{
        constructor(i, j){
            this.i = i;
            this.j = j;
        }

        getI(){
            return i;
        }
        
        getJ(){
            return j;
        }

    }*/

//================================== /CLASSES ==================================

//================================== FUNÇÃO PARA CRIAR UMA MATRIZ ==================================

    function createMatriz(){
        let linhas = parseInt(prompt("Quantas linhas terá a matriz?"));
        let colunas = parseInt(prompt("Quantas colunas terá a matriz?"));

        var matriz = new Matriz(linhas, colunas);

        console.log(matriz);

        for(let i = 0; i < matriz.getN(); i++){
            for (let j = 0; j < matriz.getM(); j++) {
                let termo = parseInt(prompt("Qual o valor do termo " + (i + 1) + (j + 1)+ ":"));
                matriz.matriz[i][j] = termo;
            }
        }
        console.log(matriz);

        return matriz;
    }

//================================== /FUNÇÃO PARA CRIAR UMA MATRIZ ==================================


//================================== FUNÇÃO PARA TRANSFORMAR MATRIZ EM UMA TABLE HTML ==================================
    let tabela = document.getElementById("tabela");

    console.log(tabela);
    
    function writeMatriz(matriz) {

        let table = document.createElement('table');

        for (let i = 0; i < matriz.getN(); i++) {

            let tr = document.createElement('tr');

            for (let j = 0; j < matriz.getM(); j++) {
                var td = document.createElement('td')
                var data = document.createTextNode(matriz.matriz[i][j]);

                td.appendChild(data);

                tr.appendChild(td);
            }

            table.appendChild(tr);
        }

        console.log(table);
        document.getElementById('matrizArea').appendChild(table);
    }

//================================== /FUNÇÃO PARA TRANSFORMAR MATRIZ EM UMA TABLE HTML ==================================

//================================== SOMA ENTRE DUAS MATRIZES ==================================

    function somaMatriz(matriz1, matriz2) {

        if(matriz1.getN() != matriz2.getN() || matriz1.getM() != matriz2.getM()){
            alert("Essa operação não pode ser realizada com matrizes de linhas ou colunas diferentes!");
            return(null);
        } else {

            var matriz = new Matriz(matriz1.getN(), matriz1.getM());

            console.log(matriz);
    
            for(let i = 0; i < matriz.getN(); i++){
                for (let j = 0; j < matriz.getM(); j++) {
                    let termo = matriz1.matriz[i][j] + matriz2.matriz[i][j];
                    matriz.matriz[i][j] = termo;
                }
            }
            console.log(matriz);
    
        }
        return(matriz);

    }

//================================== /SOMA ENTRE DUAS MATRIZES ==================================

//================================== MULTIPLICAÇÃO POR ESCALAR ==================================

    function multEscalar(matriz1, matriz2) {
        if (matriz1.getM() != matriz2.getN()) {
            alert("Essa operação não pode ser realizada! (colunas da Matriz1 é diferente do número de linhas da Matriz2)");
            return null;
        } else {

            var matriz = new Matriz(matriz1.getN(), matriz2.getM());
            let termo;

            for (let i = 0; i < matriz1.getM(); i++) {
                for (let j = 0; j < matriz2.getN(); j++) {
                    termo = 0;
                    for (let k = 0; k < matriz1.getN(); k++) {
                        termo += matriz1.matriz[i][k] * matriz2.matriz[k][j];
                    }
                    matriz.matriz[i][j] = termo;
                }
            }
            return matriz;
        }
    }

//================================== /MULTIPLICAÇÃO POR ESCALAR ==================================

//================================== FUNÇÃO DO BOTÃO ==================================

    function selectOperation(){
        let select = parseInt(prompt("Escolha a operação que você deseja fazer:\n1- Soma entre matrizes;\n2- Multiplicação por escalar;\n3- Multiplicação por escalar;"))
    
        switch(select){

            case 1:

                let soma = somaMatriz(createMatriz(), createMatriz());
                document.getElementById('matrizArea').appendChild(writeMatriz(soma));

            break;

            case 2:

                let mult = multEscalar(createMatriz(), createMatriz());
                document.getElementById('matrizArea').appendChild(writeMatriz(mult));

            break;
        }
    }