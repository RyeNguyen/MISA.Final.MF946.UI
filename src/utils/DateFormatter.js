export default class DateFormatter {
    /**
     * Phương thức định dạng ngày tháng để render lên table
     * @param str
     * @returns {string}
     * Author: NQMinh (28/08/2021)
     * Modified: NQMinh (02/09/2021)
     */
    static format = (str) => {
        if (!str) return '';
        if (str.length === 0) return '';
        const date = new Date(str);
        return `${this.dateNum(date.getDate())}/${this.dateNum(date.getMonth() + 1)}/${this.dateNum(date.getFullYear())}`;
    }

    /**
     * Phương thức định dạng cụ thể ngày và tháng
     * @param num
     * @returns {string|*}
     * Author: NQMinh(28/08/2021)
     * Modified: NQMinh (02/09/2021)
     */
    static dateNum = (num) => {
        return num < 10 ? '0' + num : num;
    };
}