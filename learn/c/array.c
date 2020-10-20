#include <stdio.h>

int main(){

    int arr[] = {1,8,2,0,6,0,9};                //making a array

    int arr_size = sizeof(arr)/sizeof(int);     //getting array size

    for(int i = 0; i < arr_size; i++){          //print array
        printf("%d,",arr[i]);
    }

    printf("\n");

    for(int i = 0; i < arr_size; i++){          //setting array elements
        arr[i] = 14;
    }

    for(int i = 0; i < arr_size; i++){          //print array with new values
        printf("%d,",arr[i]);
    }

    printf("\n");

    return 0;
}