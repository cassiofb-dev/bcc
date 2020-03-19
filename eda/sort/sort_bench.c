#include <time.h>
#include <stdio.h>
#include <stdlib.h>

unsigned long long swaps, comps, reads, writes;        //global variables for bench

//bench functions

void reset_bench(){
    swaps = comps = reads = writes = 0;
}

void print_bench(){
    printf("\nswaps:[%llu] comps:[%llu] reads:[%llu] writes:[%llu]\n\n",swaps,comps,reads,writes);
}

void clear(){
    system("cls||clear");
}

void pause(){
    printf("\n\n");
    system("pause||Sleep(5)");
}

//array functions

void reset_array(int *arr, int size){
    srand(time(NULL));
    for(int i = 0; i < size; i++){
        arr[i] = rand()%size;
    }
}

void copy_array(int *arr, int *brr, int size){
    for(int i = 0; i < size; i++){
        arr[i] = brr[i];
    }
}

void print_array(int *arr, int size){
    size--;
    printf("{");
    for(int i = 0; i < size; i++){
        printf("%d, ",arr[i]);
    }
    printf("%d}\n",arr[size]);
}

void swap(int *a, int *b){
    swaps++;
    int aux = *a;
    *a = *b;
    *b = aux;
}

int comp(int a, int b){
    comps++;
    return a < b;
}

int read(int *arr, int pos){
    reads++;
    return arr[pos];
}

void write(int *arr, int pos, int value){
    writes++;
    arr[pos] = value;
}

//sorting algorithms

void bubble_sort(int *arr, int size){
    reset_bench();
    for(int i = 0; comp(i,size); i++){
        for(int j = 0; comp(j,size-1); j++){
            if(comp(arr[j],arr[j+1])){
                swap(&arr[j],&arr[j+1]);
            }
        }
    }
    print_bench();
    reset_bench();
}

void selection_sort(int *arr, int size){
    reset_bench();
    int key;
    for(int i = 0; comp(i,size); i++){
        key = i;
        for(int j = i; comp(j,size); j++){
            if(comp(arr[key],arr[j])){
                key = j;
            }
        }
        swap(&arr[i],&arr[key]);
    }
    print_bench();
    reset_bench();
}

void insertion_sort(int *arr, int size){
    reset_bench();
    int j;
    for(int i = 1; comp(i,size); i++){
        j = i;
        while(comp(0,j) && !comp(arr[j],arr[j-1])){
            swap(&arr[j],&arr[j-1]);
            j--;
        }
    }
    print_bench();
    reset_bench();
}

void merge(int *arr, int ini, int mid, int fim){
    int size_l = mid - ini + 1;
    int size_r = fim - mid;

    int arr_left[size_l];
    int arr_right[size_r];

    for(int i = 0; comp(i,size_l); i++){
        write(arr_left,i,read(arr,ini+i));
    }

    for(int i = 0; comp(i,size_r); i++){
        write(arr_right,i,read(arr,ini+size_l+i));
    }

    int i = ini, l = 0, r = 0;
    while(comp(l,size_l) && comp(r,size_r)){
        write(arr,i++, !comp(read(arr_left,l),read(arr_right,r)) ? read(arr_left,l++) : read(arr_right,r++));
    }

    while(comp(l,size_l)){
        write(arr,i++,read(arr_left,l++));
    }

    while(comp(r,size_r)){
        write(arr,i++,read(arr_right,r++));
    }
}

void _merge_sort(int *arr, int ini, int fim){
    if(comp(ini,fim)){
        int mid = (ini + fim)/2;
        _merge_sort(arr,ini,mid);
        _merge_sort(arr,mid+1,fim);
        merge(arr,ini,mid,fim);
    }
}

void merge_sort(int *arr, int size){
    reset_bench();
    _merge_sort(arr,0,size);
    print_bench();
    reset_bench();
}

void _print_array(int *arr, int size, int flag){
    if(flag){
        print_array(arr,size);
    }
}

void run_bench(int *arr, int size, int flag){
    int aux[size];

    printf("\nbubble sort...\n");
    copy_array(aux,arr,size);
    _print_array(aux,size,flag);
    bubble_sort(aux,size);
    _print_array(aux,size,flag);

    printf("\nselection sort...\n");
    copy_array(aux,arr,size);
    _print_array(aux,size,flag);
    selection_sort(aux,size);
    _print_array(aux,size,flag);

    printf("\ninsertion sort...\n");
    copy_array(aux,arr,size);
    _print_array(aux,size,flag);
    insertion_sort(aux,size);
    _print_array(aux,size,flag);

    printf("\nmerge sort...\n");
    copy_array(aux,arr,size);
    _print_array(aux,size,flag);
    merge_sort(aux,size);
    _print_array(aux,size,flag);
}

void menu(){
    char input, aux;
    int go = 1, size = 1;
    while(go){
        int arr[size];
        reset_array(arr,size);
        clear();
        printf("\t\t\tmenu\n\nset size:[s]\nreset array:[r]\nrun bench:[b]\nrun bench showing array:[p]\nlist array:[l]\nexit:[e]\ninput: ");
        scanf("%c",&input);
        fflush(stdin);
        switch(input){

            case 's':
                printf("array size: ");
                scanf("%d",&size);
                fflush(stdin);
                break;
            
            case 'r':
                reset_array(arr,size);
                break;

            case 'b':
                run_bench(arr,size,0);
                break;

            case 'p':
                run_bench(arr,size,1);
                break;

            case 'l':
                print_array(arr,size);
                break;

            case 'e':
                go = 0;
                break;

            default:
                printf("wrong input!\n");
                break;
        }
        pause();
    }
}

int main(){
    menu();
    return 0;
}
