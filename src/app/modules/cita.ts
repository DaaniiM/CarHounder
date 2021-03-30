export class Cita {
    constructor(public servicios:string, public fecha:string, public hora:string, public id_taller:number, public id_cliente:number, public id_reservas?: number){}
}
