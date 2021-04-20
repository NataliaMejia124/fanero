import { ApiBase } from "../base/api-base";

export class StoreService extends ApiBase {

    /**
     * Obtiene una lista de tiendas activas
     * @returns {Store[]} stores - List of active stores 
     */
    async getActive() {
        return await this.get("Tienda/ObtenerTiendasActivas");
    }

     /**
     * Busca productos por el id de la tienda
     * @returns {Store[]} products
     */
     async getProductosTienda (id) {
        return await this.get("Tienda/ProductosPorTienda?IdTienda="+id);
    }

    /**
     * detalle del producto por id del producto
     * @param id id del producto
     * @returns product
     */
    async getDetailProducts (id) {
        return await this.get("producto/DetailProduct?id="+id);
    }

    /**
     * comentarios que usuarios hicieron de un producto
     * @param id id del producto
     * @returns comentarios
     */
    async getCommentProduct (id) {
        return await this.get("producto/GetProductReview?IdProducto="+id);
    }

    /**
     * catalogo de la tienda por id de la tienda
     * @param id id de la tienda
     * @returns catalog
     */
    async  getStoreCatalog (id) {
        return await this.get("tienda/ObtenerCatalogos?IdTienda="+id);
    }

    /**
     * Busca los filtros que una tienda puede aplicar a sus productos
     * @param id id de la tienda
     * @returns lista de filtros
     */
     async getStoreFilters (id) {
        return await this.get("/Producto/GetFiltersByStore?IdTienda="+id);
    }

    /**
     * agregar un producto a favoritos
     * @param IdPersona id persona
     * @param idProducto
     * @returns succes
     */
    async addFav (IdPersona, idProducto) {
        return await this.post(`Persona/AgregarProductoFavorito?IdPersona=${IdPersona}&IdProducto=${idProducto}`);
    }
    /**
     * Lista productos favoritos
     * @param IdPersona id persona
     * @returns lista favoritos
     */
    async  getFavList (IdPersona) {
        return await this.get("Persona/GetFavoriteProducts?IdPersona="+IdPersona);
    }
    /**
     * Borra un producto de favoritos
     * @param IdPersona id persona
     * @param IdProducto 
     * @returns 
     */
    async  deleteFav (IdPersona, IdProducto) {
        return await this.post(`Persona/EliminarProductoFavorito?IdPersona=${IdPersona}&IdProducto=${IdProducto}`);
    }
    /**
     * Consulta establecimiento 
     * @param IdTienda id tienda
     * @returns estado true/false
     */
    async  getSite (IdTienda) {
        return await this.get("tienda/ObtenerConsumoSitio?idTienda="+IdTienda);
    }
    /**
     * Consulta lista de bancos por id de tienda 
     * @param idTienda id tienda
     * @returns lista de bancos para pagar por PSE
     */
     async  getBank (idTienda) {
        return await this.get("Pago/ObtenerBancosPse?idTienda="+idTienda);
    }

}
    


    