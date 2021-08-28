import BaseAPIConfig from "../base/BaseAPIConfig.js";

export default class BaseAPI {
    constructor() {
        this.controller = null;
    }

    /**
     * Hàm lấy tất cả dữ liệu
     * createdBy: NQMinh(28/08/2021)
     */
    getAll() {
        return BaseAPIConfig.get(`${this.controller}`);
    }

    /**
     * Hàm lấy dữ liệu bằng id
     * @param id
     * @returns {Promise<AxiosResponse<any>>}
     * Author: NQMinh(28/08/2021)
     */
    getById(id) {
        return BaseAPIConfig.get(`${this.controller}/${id}`);
    }

    /**
     * Hàm sinh mã mới
     * @returns {Promise<AxiosResponse<any>>}
     * Author: NQMinh (28/08/2021)
     */
    getNewCode() {
        return BaseAPIConfig.get(`${this.controller}/newCode`);
    }

    /**
     * Hàm thêm mới dữ liệu
     * @param body
     * @returns {Promise<AxiosResponse<any>>}
     * Author: NQMinh(28/08/2021)
     */
    add(body) {
        return BaseAPIConfig.post(`${this.controller}`, body);
    }

    /**
     * Hàm lấy dữ liệu phân trang
     * createdBy: NQMinh(28/08/2021)
     * @param filter
     * @param pageIndex
     * @param pageSize
     */
    paging(filter, pageIndex, pageSize) {
        return BaseAPIConfig.get(`${this.controller}/paging?employeeFilter=${filter}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
    }

    /**
     * Hàm cập nhật dữ liệu
     * @param {*} id
     * @param {*} body
     * createdBy: NQMinh(28/08/2021)
     */
    update(id, body) {
        return BaseAPIConfig.patch(`${this.controller}/${id}`, body);
    }

    /**
     * Hàm xóa/xóa nhiều thông tin
     * @returns {Promise<AxiosResponse<any>>}
     * createdBy: NQMinh(28/08/2021)
     * @param ids
     */
    delete(ids) {
        return BaseAPIConfig.post(`${this.controller}/delete`, ids);
    }
}