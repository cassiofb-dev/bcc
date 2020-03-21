import sys
import struct

def to_bit(n):
    return n*300

if len(sys.argv) != 2 or len(sys.argv[1]) != 8:
	print ("USO %s [CEP]" % sys.argv[0])
	quit()

registroCEP = struct.Struct("72s72s72s72s2s8s2s")
cepColumn = 5
count = 0

with open("cep_ordenado.dat","rb") as f:
    ini = 0
    fim = int(f.seek(0,2)/300) - 1

    while ini <= fim:
        count += 1
        mid = int((ini+fim)/2)

        f.seek(to_bit(mid),0)

        linha = f.read(registroCEP.size)
        endereco = registroCEP.unpack(f.read(registroCEP.size))
        cep = str(endereco[cepColumn],'latin1')

        if cep == sys.argv[1]:
            for e in endereco:
                print(str(e,'latin1'))
            break

        elif cep < sys.argv[1]:
            ini = mid + 1
            pass

        else:
            fim = mid - 1
            pass

        pass
    pass

print("Busca completa!\nTotal lido:",count)
