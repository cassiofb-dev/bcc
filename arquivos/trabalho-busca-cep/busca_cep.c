#include <stdio.h>
#include <string.h>

struct endereco{
    char rua[72];
	char bairro[72];
	char cidade[72];
	char uf[72];
	char sigla[2];
	char cep[8];
	char lixo[2];
};

long to_bits(long n){
    return n*(sizeof(struct endereco));
}

int main(int argc, char **argv){

    if(argc != 2){
        fprintf(stderr, "USO: %s [CEP]", argv[0]);
		return 1;
    }

    FILE *f;
    f = fopen("cep_ordenado.dat","r");
    struct endereco e;
    long ini = 0, mid, fim, c = 0;

    fseek(f,0,SEEK_END);
    fim = ftell(f)/sizeof(struct endereco);
    rewind(f);

    while(ini <= fim){
        c++;
        mid = (ini + fim)/2;
        fseek(f,to_bits(mid),SEEK_SET);
        fread(&e,sizeof(struct endereco),1,f);

        if( strncmp(e.cep,argv[1],8)  == 0 ){
            printf("%.72s\n%.72s\n%.72s\n%.72s\n%.2s\n%.8s\n",e.rua,e.bairro,e.cidade,e.uf,e.sigla,e.cep);
			break;
        }else{
            if( strncmp(e.cep,argv[1],8)  < 0 ){
                ini = mid + 1;
            }else{
                fim = mid - 1;
            }
        }
    }

    printf("Busca completa!\nTotal Lido: %d\n", c);
    return 0;
}
