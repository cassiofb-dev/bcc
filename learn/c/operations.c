#include <stdio.h>

int main(){
    float a = -1/12.0, b =3.14;

    printf("%.2f + %.2f = %.2f\n",a,b,a+b);     //sum a + b

    printf("%.2f - %.2f = %.2f\n",b,a,b-a);     //sub b - a

    printf("%.2f * %.2f = %.2f\n",a,b,a*b);     //mult a * b

    printf("%.2f / %.2f = %.2f\n",b,a,b/a);     //div b / a
    
    return 0;
}
