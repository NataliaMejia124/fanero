import { ApiBase } from "../base/api-base";

export class ProductService extends ApiBase {
  //Obtener los catalogos
  async getCatalogs() {
    return await this.get("/tienda/ObtenerCatalogos");
  }

  async getProduct(id) {
    return await this.get("/producto/GetProductsByIdCatalog?id=" + id);
  }

  /**
   * Busca productos por palabra clave
   * @param keyWord Palabra clave 
   * @param storeId id de la tienda (opcional)
   * @returns Listado de productos
   */
  async getByKeyWord(keyWord, storeId = 0) {
    return await this.get(`producto/GetByKeyWord?keyWord=${keyWord}&idTinda=${storeId}`);
  }


  /**
   * Obtienen un listado de productos de una tienda
   * @param  id id de la tienda
   * @returns Listado de productos
   */
  async getProductsByStore(id) {
    return await this.get(`/tienda/ProductosPorTienda?IdTienda=${id}`);
  }

  /**
   * Obtienen un listado de productos basado en el id de la tienda y un listado de filtros
   * @param  filters filtros
   * @example { "keyWord": "producto", "idTienda": 2, "opciones": [ { "nombre": "Marca","valor": "Montagas" }] }
   * @returns Listado de productos
   */
  async GetBySpecificFiltersStore(filters) {
    return await this.post(`producto/GetBySpecificFiltersStore?idTienda=${filters.idTienda}`, filters);
  }

  /**
   * Obtienen un listado de productos por palabra clave
   * @param  keyWord produto buscado 
   * @returns Listado de productos
   */
  async getProductsByKeyWord(keyWord) {
    return await this.get(`/producto/GetfiltersByKeyWord?keyWord=${keyWord}`);
  }

  /**
   * Obtiene productos por catalogo o categoria
   * @param id catalogo o categoria
   * @returns Listado de productos
   */
  async getProductsByIdCatalog(id) {
    return await this.get(`/producto/GetProductsByIdCatalog?id=${id}`);
  }

}
