
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