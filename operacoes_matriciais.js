

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

    let linhas = parseInt(prompt("Quantas linhas terá a matriz?"));
    let colunas = parseInt(prompt("Quantas colunas terá a matriz?"));

    let matriz = new Matriz(linhas, colunas);

    console.log(matriz);

    for(var i = 0; i < matriz.getN(); i++){
        for (let j = 0; j < matriz.getM(); j++) {
            let termo = parseInt(prompt("Qual o valor do termo " + (i + 1) + (j + 1)+ ":"));
            matriz.matriz[i][j] = termo;
            //console.log(matriz.matriz[i])
        }
    }

    console.log(matriz);

    let tabela = document.getElementById("tabela");

    console.log(tabela);

    /*for (let i = 0; i < matriz.getN(); i++) {
        for (let j = 0; j < matriz.getM(); j++) {
            document.write(matriz.matriz[i][j] + " ")
            
        }
        document.write('<br>')
    }*/
    for (let i = 0; i < matriz.getN(); i++) {

        let tr = document.createElement('tr');

        for (let j = 0; j < matriz.getM(); j++) {
            var td = document.createElement('td')
            var data = document.createTextNode(matriz.matriz[i][j]);

            td.appendChild(data);

            tr.appendChild(td);
        }


        tabela.appendChild(tr);
    }