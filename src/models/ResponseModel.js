export default class ResponseModel {
    static initData() {
        return {
            MsgSuccessLoad: 'Tải dữ liệu thành công.',
            MsgSuccessNewCode: 'Sinh mã mới tự động thành công.',
            MsgSuccessGetEmployee: 'Lấy dữ liệu nhân viên thành công',
            MsgSuccessSaveEmployee: 'Cất dữ liệu nhân viên thành công',
            MsgSuccessDeleteEmployee: 'Xóa dữ liệu nhân viên thành công',
            MsgSuccessExport: 'Xuất khẩu dữ liệu thành công.',
            MsgErrorServer: 'Lỗi server, vui lòng liên hệ MISA.',
            MsgErrorNewCode: 'Sinh mã mới tự động thất bại, vui lòng nhập mã mới.',
            MsgErrorRequired: ' không được để trống.',
            MsgErrorDuplicated: ' đã tồn tại trong hệ thống.'
        }
    }
}