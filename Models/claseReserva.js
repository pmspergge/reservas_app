import { randomUUID } from 'crypto';
export class Reserva{

constructor(nombreCliente, cantidadDePersonas, idMesa, fecha, turno){
    this.id = randomUUID();//genera un id único
    this.nombreCliente = nombreCliente;
    this.cantidadDePersonas = cantidadDePersonas;
    this.idMesa = idMesa;
    this.fecha = fecha;
    this.turno = turno;
}

}

// const reserva1 = new Reserva("NIDIA",2,1,"14 de octubre","noche")
// console.log(reserva1)