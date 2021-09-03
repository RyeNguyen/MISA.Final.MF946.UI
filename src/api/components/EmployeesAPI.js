import BaseAPI from "@/api/base/BaseAPI.js";
import BaseAPIConfig from "@/api/base/BaseAPIConfig";

class EmployeesAPI extends BaseAPI {
    constructor() {
        super();
        this.controller = "v1/Employees";
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
     * Hàm xuất khẩu dữ liệu ra file excel
     * @param filter
     * @param pageIndex
     * @param pageSize
     * @returns {Promise<AxiosResponse<any>>}
     * Author: NQMinh (03/09/2021)
     */
    export(filter, pageIndex, pageSize) {
        return BaseAPIConfig.get(`${this.controller}/export?employeeFilter=${filter}&pageIndex=${pageIndex}&pageSize=${pageSize}`, {
            responseType: "blob",
        });
    }
}

export default new EmployeesAPI();