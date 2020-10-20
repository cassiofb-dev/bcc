#include <stdio.h>

int main(){
    int i;
    char c;
    char str[30];
    float f;
    double d;
    long long ll;

    printf("\nenter with a char: ");
    scanf("%c",&c);
    printf("your char is: %c\n",c);
    fflush(stdin);                          //clear stdin buffer

    printf("\nenter with a string: ");
    gets(str);
    printf("your string is: %s\n",str);
    fflush(stdin);

    printf("\nenter with a int: ");
    scanf("%d",&i);
    printf("your integer is: %d\n",i);
    fflush(stdin);

    printf("\nenter with a float: ");
    scanf("%f",&f);
    printf("your float is: %f\n",f);
    fflush(stdin);

    printf("\nenter with a double: ");
    scanf("%lf",&d);
    printf("your double is: %lf\n",d);
    fflush(stdin);

    printf("\nenter with a long long: ");
    scanf("%lld",&ll);
    printf("your long long is: %lld\n",ll);
    fflush(stdin);
    
    return 0;
}
