import java.io.RandomAccessFile;

public class Main{

    public static long to_bit(long n){
        return 300*n;
    }

    public static void main(String[] args) throws Exception{

        if (args.length != 1 || args[0].length() != 8){
            System.out.println("Usar cep como parametro!");
            System.exit(1);
        }

        RandomAccessFile raf = new RandomAccessFile("cep_ordenado.dat", "r");
        Endereco e = new Endereco();
        long ini = 0, mid, fim = raf.length()/300, c = 0;

        while(ini <= fim){
            c++;
            mid = (ini + fim)/2;

            raf.seek(to_bit(mid));
            e.leEndereco(raf);

            if (e.getCep().equals(args[0])){
                System.out.println(e);
                break;
            }
            else{
                if(args[0].compareTo(e.getCep()) > 0){
                    ini = mid + 1;
                }
                else{
                    fim = mid - 1;
                }
            }
        }
        raf.close();
        System.out.println("Busca completa!\nTotal lido: " + c);
    }
}