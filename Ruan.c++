#include <iostream>
#include <cstdlib>
#include <math.h>
#include <iomanip>
#include <stdio.h>
#include <vector>
#include <algorithm>
//By: Ruan Severiano da Silva
using namespace std;

class Matrix
{
    private:
        //declarando as variaveis que serão usadas na construção das matrizes
        int linhas = 0;
        int colunas = 0;
        //declara a nova matriz
        float ** mat;

    public:

        Matrix(int linhas, int colunas) : linhas(linhas), colunas(colunas)
        {
        this->mat = generateMatrix(this->linhas, this->colunas);
        }

        //deconstructor para ajudar a alocar espaço para uma matriz nova
        ~Matrix()
        {
            for (int i = 0; i < this->linhas; i++)
            {
                delete[] this->mat[i];
            }
            delete[] this->mat;
        }
        //função que declara cada um dos espaços da matriz
        float** generateMatrix(int linhas, int colunas)
        {

            float** temp = new float*[linhas];
            for (int i = 0; i < linhas; i++)
            {
                temp[i] = new float[colunas];
            }
            return temp;
        }
        //função para imprimir os valores de cada termo da matriz
        void print()
        {
            //varre a linha de valor 'i'
            for (int i = 0; i < linhas; i++)
            {
                //varre a coluna de valor 'j'
                for (int j = 0; j < colunas; j++)
                {

                    printf("%.2f", this->mat[i][j]);
                    cout << "\t";
                }
                cout << endl;
            }
            cout << endl;
        }

        void transp()
        {
            //cria uma matriz temporaria que será preenchida com os valores da matriz anterior com a linha e coluna invertidos
            float **temp = generateMatrix(this->colunas, this->linhas);

            for (int i = 0; i < this->colunas; i++)
            {
                for (int j = 0; j < this->linhas; j++)
                {
                    temp[i][j] = this->mat[j][i];
                }
            }
            //deconstructor para liberar a memoria de uma matriz que será deletada
            for (int i = 0; i < this->linhas; i++)
            {
                delete[] this->mat[i];
            }

            this->mat = temp;
            //trocando as dimesões da matriz
            int tmp = this->linhas;
            this->linhas = this->colunas;
            this->colunas = tmp;
        }
        //função que preenche cada um dos espaços da matriz com os valores da array solicitada
        void constructor(float *src)
        {
            int pos = 0;
            for (int i = 0; i < linhas; i++)
            {
                for (int j = 0; j < colunas; j++)
                {
                    this->mat[i][j] = src[pos++];
                }
            }
        }
        //função de soma
        void sum(Matrix &m)
        {
            //teste de erros, neste caso, as colunas precisam ser do mesmo tamanho para a soma ser possível
            if(this->linhas != m.getNumLinhas() || this->colunas != m.getNumColunas())
            {
                cout << "Matrizes devem ser do mesmo tamanho (linhas e colunas)" << endl;
                exit(-1);
            }

            for (int i = 0; i < this->linhas; i++)
            {
                for (int j = 0; j < this->colunas; j++)
                {
                    //soma o valor da primeira matriz com o valor da matriz recebida
                    this->mat[i][j] += m.getValue(i,j);
                }
            }
        }
        //multiplicação termo a termo
        void times(Matrix &m)
        {
            if(this->linhas != m.getNumLinhas() || this->colunas != m.getNumColunas())
            {
                cout << "Matrizes devem ser do mesmo tamanho (linhas e colunas)" << endl;
                exit(-1);
            }
            //funciona exatamente como a função sum só que multiplica os termos
            for (int i = 0; i < this->linhas; i++)
            {
                for (int j = 0; j < this->colunas; j++)
                {
                    this->mat[i][j] = this->mat[i][j] * m.getValue(i,j);
                }
            }
        }
        //função de multiplicação de matrizes
        void dot(Matrix &m)
        {
            if(this->colunas != m.getNumLinhas())
            {
                cout << "Nao e possivel multiplicar essas matrizes!" << endl;
                exit(-1);
            }

            float** result = generateMatrix(this->linhas, m.getNumColunas());
            //declarando a matriz resultante com as linhas da primeira matriz e as colunas da segunda, zerando todos os seus espaços para não ter valores discrepantes depois
            for (int i = 0; i < this->linhas; i++)
            {
                for (int j = 0; j < m.getNumColunas(); j++)
                {
                    result[i][j] = 0;
                }
            }

            for (int i = 0; i < this->linhas; i++)
            {
                for (int j = 0; j < this->colunas; j++)
                {
                    for (int k = 0; k < this->colunas; k++)
                    {
                        //aqui vemos a operação de multiplicação de matriz, com 'k' sendo a coluna da primeira matriz e linha da segunda
                        result[i][j] += this->mat[i][k] * m.getValue(k,j);
                    }
                }
            }
            //deconstructor
            for (int i = 0; i < this->linhas; i++)
            {
                delete[] this->mat[i];
            }
            //a nossa matriz resultante agora é inserida na matriz principal e a multiplicação é concluida
            this->mat = result;
            //igualando o numero de colunas com a segunda matriz pois agora é possivelmente de uma dimensão diferente
            this->colunas = m.getNumColunas();
        }
        //funções utilizada em outras funções para retornar o valores de outra matriz
        float getValue(int i, int j)
        {
            return this->mat[i][j];
        }

        int getNumLinhas()
        {
            return this->linhas;
        }

        int getNumColunas()
        {
            return this->colunas;
        }
        //função setn serve para o usuário mudar um valor específico em qualquer matriz
        void setn(int i, int j, float v)
        {
            this->mat[i-1][j-1] = v;
        }
        //função setn serve para o usuário retornar um valor específico em qualquer matriz
        void getn(int i, int j)
        {
            printf("%.2f", this->mat[i-1][j-1]);
            cout << endl << endl;
        }


        void gauss()
        {
            //Pivotização
            for (int i=0;i<this->linhas;i++)
            {
                for (int k=i+1;k<this->linhas;k++)
                {
                    //testa se o elemento pivotizado é menor que todos os valores abaixo dele
                    if (fabs(this->mat[i][i])<fabs(this->mat[k][i]))
                    {
                        //começa um loop para trocar a linha inteira de posição com a linha de baixo
                        for (int j=0;j<=this->linhas;j++)
                        {
                            double temp=this->mat[i][j];
                            this->mat[i][j]=this->mat[k][j];
                            this->mat[k][j]=temp;
                        }
                    }
                }
            }
            //loop para começar a eliminação gaussiana
            //varrendo todas as linhas exceto a última "this->linhas-1"
            for (int i=0;i<this->linhas-1;i++)
            {
                //varrendo todas as linhas abaixo do valor pivotizado "k=i+1"
                for (int k=i+1;k<this->linhas;k++)
                {
                    //variavel t recebe o valor abaixo do pivot dividido pelo próprio pivot Ex: 2/1 = 2 ou 5/1 = 5 considerando que o pivot seja 1
                    double t=this->mat[k][i]/this->mat[i][i];
                    for (int j=0;j<=this->linhas;j++)
                    {
                        //subtrai todos os valores restantes da linha de baixo por t vezes o valor que está na linha de cima acima, zerando assim o valor abaixo do pivot
                        this->mat[k][j]=this->mat[k][j]-t*this->mat[i][j];
                    }
                }
            }
        }
        //função solve retorna os valores finais após o método de substituição
        void solve()
        {
            //x é uma array cujos valores correspondem aos valores de x,y e z.
            float x [this->linhas];
            //começa o loop de substituição pela última linha 'this->linhas - 1'
            for (int i = this->linhas - 1;i >= 0;i--)
            {
                //primeiramente, x recebe o valor do ultimo pivot
                x[i] = this->mat[i][this->linhas];
                for (int j = i+1;j < this->linhas;j++)
                {
                    //testa se o loop está no pivot ou não, se está ignora
                    if (j!=i)
                    {
                        //como já temos o resultado de "z", supondo que seja uma matriz 3x3, o programa faz a substituição multiplicando o pivot de baixo pelo valor que está na linha acima e subtraindo com a coluna de resultado
                        x[i] = x[i] - this->mat[i][j] * x[j];
                    }
                }
                //divide o valor que esta na coluna de resultado pelo pivot
                x[i] = x[i] / this->mat[i][i];
            }
            for (int i = 0;i < this->linhas;i++)
            {
                // Imprime os valores de x, y e z...
                printf("%.2f\n", x[i]);
            }
            cout << endl;
        }

};
//classe de vetores, com funções simples
class Vector
{
    private:
        //declara o novo vetor
        vector<int> vet;
        //declara a dimensão do vetor
        int dim;

    public:
        //função contructor que preenche cada um dos espaços do vetor com os valores da array solicitada
        Vector(int d, int *src)
        {
            this->dim = d;
            for (int i = 0; i < dim; i++)
            {
                this->vet.push_back(src[i]);
            }
        }

        void sum(Vector &v)
        {
            if(this->dim != v.getDim())
            {
                cout << "Vetores devem ser do mesmo tamanho" << endl;
                exit(-1);
            }

            for(int i=0;i<this->vet.size();++i)
            {
                this->vet[i] = this->vet[i] + v.getValue(i);
            }
        }

        void times(Vector &v)
        {
            if(this->dim != v.getDim())
            {
                cout << "Vetores devem ser do mesmo tamanho" << endl;
                exit(-1);
            }

            for(int i=0;i<this->vet.size();++i)
            {
                this->vet[i] = this->vet[i] * v.getValue(i);
            }
        }

        int getValue(int i)
        {
            return this->vet[i];
        }

        int getDim()
        {
            return this->dim;
        }

        void setn(int i, int v)
        {
            this->vet[i-1]= v;
        }

        void getn(int i)
        {
            cout << this->vet[i-1] << endl << endl;
        }

        void print()
        {
            for(int i=0;i<this->vet.size();++i)
            {
                cout<<this->vet[i]<<' ';
            }
            cout<<endl<<endl;
        }

};

int main()
{
    int I[] = {1,2,3,4,5,6};
    Vector v1(6,I);

    int II[] = {2,2,1,3,3,3};
    Vector v2(6,II);

    v1.sum(v2);
    v1.print();
    v2.setn(5,12);
    v2.getn(3);
    v2.getn(5);


    float A[] = {8,9,8,5,1,3,4,10,5,2,12,15};
    Matrix matA(3,4);
    matA.constructor(A);

    float B[] = {1,2,3,4,5,6};
    Matrix matB(2,3);
    matB.constructor(B);

    float C[] = {1,2,3,4,5,6};
    Matrix matC(2,3);
    matC.constructor(C);

    float D[] = {1,1,1,1,1,1};
    Matrix matD(3,2);
    matD.constructor(D);

    float E[] = {2,2,2,2,2,2};
    Matrix matE(3,2);
    matE.constructor(E);

    matA.gauss();
    matA.solve();

    matB.transp();
    matC.dot(matB);
    matC.print();



    matB.sum(matD);
    matB.print();
    matB.setn(1,2,50);
    matB.print();
    matB.times(matE);
    matB.print();

    return 0;
}
