import { ApiBase } from "../base/api-base";

export class UserService extends ApiBase {

    async getProfileUID(uid) {
        return await this.get(`persona/ObtenerPersonaUid?uid=${uid}`);
    }

    async socialNetworkLogIn(person) {
        return await this.post(`persona/AgregarPersonaRedes`, person);
    }

    async addPerson(person) {
        return await this.post(`persona/AgregarPersona`, person);
    }

    async addPerson(person) {
        return await this.post(`persona/AgregarPersona`, person);
    }

    async updatePerson(person) {
        return await this.post(`persona/UpdatePerson`, person);
    }

    async logIn(request) {
        return await this.post(`login`, request);
    }

    async getProfileEmail(email) {
        return await this.post(`persona/ObtenerPersonaEmail`, email);
    }

    async recoveryPassword(email) {
        return await this.post(`login/RecoveryPassword`, email);
    }

    async changePassword(request) {
        return await this.post(`persona/UpdatePassword`, request);
    }
    async addAddress(address) {
        return await this.post(`DireccionPersona/AgregarDireccionPersona`, address);
    }
    async listAddress(id) {
        return await this.get(`DireccionPersona/DireccionesAsociadas?id=${id}`);
    }
    async deleteAddress(id) {
        return await this.post(`direccionPersona/EliminarDireccionPersona?id=${id}`);
    }
    async sendComment(comment) {
        return await this.post(`Tienda/InsertarMensajesTienda`, comment);
    }
    async getOrders(id) {
        return await this.get(`/orden/${id}`);
    }
    async addOrder(request) {
        debugger;
        return await this.post(`orden/CrearOrden`, request);
    }
    async getIdentificationType() {
        return await this.get("Domain/ObtenerTiposDocCuenta");
    }
    async psePayment(request) {
        return await this.post(`pago/PagarConPse`, request);
    }
    async cashPayment(idOrden) {
        return await this.post(`pago/PagoEnEfectivo?IdOrden=${idOrden}`);
    }
    async creditCardPayment(request) {
        return await this.post(`pago/PagarConTarjeta`, request);
    }


}
