import { ApiBase } from "../base/api-base";

export class BannerService extends ApiBase {
    async getVigentes() {
        return await this.get("Banner/ObtenerVigentes");
      }
}