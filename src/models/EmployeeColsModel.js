export default class EmployeeColsModel {
    static initData() {
        return [
            {
                ColId: 1,
                ColField: 'EmployeeCode',
                ColName: 'Mã nhân viên',
                ColFixed: true,
                ColWidth: 143
            },
            {
                ColId: 2,
                ColField: 'FullName',
                ColName: 'Tên nhân viên',
                ColFixed: true,
                ColWidth: 250
            },
            {
                ColId: 3,
                ColField: 'Gender',
                ColName: 'Giới tính',
                ColFixed: false,
                ColWidth: 105
            },
            {
                ColId: 4,
                ColField: 'DateOfBirth',
                ColName: 'Ngày sinh',
                ColFixed: false,
                ColWidth: 150
            },
            {
                ColId: 5,
                ColField: 'IdentityNumber',
                ColName: 'Số CMND',
                ColFixed: false,
                ColWidth: 200
            },
            {
                ColId: 6,
                ColField: 'IdentityDate',
                ColName: 'Ngày cấp',
                ColFixed: false,
                ColWidth: 150
            },
            {
                ColId: 7,
                ColField: 'IdentityPlace',
                ColName: 'Nơi cấp',
                ColFixed: false,
                ColWidth: 150
            },
            {
                ColId: 8,
                ColField: 'PositionName',
                ColName: 'Chức danh',
                ColFixed: false,
                ColWidth: 250
            },
            {
                ColId: 9,
                ColField: 'DepartmentCode',
                ColName: 'Mã đơn vị',
                ColFixed: false,
                ColWidth: 150
            },
            {
                ColId: 10,
                ColField: 'DepartmentName',
                ColName: 'Tên đơn vị',
                ColFixed: false,
                ColWidth: 250
            },
            {
                ColId: 11,
                ColField: 'BankAccount',
                ColName: 'Số tài khoản',
                ColFixed: false,
                ColWidth: 150
            },
            {
                ColId: 12,
                ColField: 'BankName',
                ColName: 'Tên ngân hàng',
                ColFixed: false,
                ColWidth: 250
            },
            {
                ColId: 13,
                ColField: 'BankBranch',
                ColName: 'Chi nhánh TK ngân hàng',
                ColFixed: false,
                ColWidth: 250
            },
            {
                ColId: 14,
                ColField: 'Address',
                ColName: 'Địa chỉ',
                ColFixed: false,
                ColWidth: 200
            },
            {
                ColId: 15,
                ColField: 'MobilePhoneNumber',
                ColName: 'ĐT di động',
                ColFixed: false,
                ColWidth: 150
            },
            {
                ColId: 16,
                ColField: 'TelephoneNumber',
                ColName: 'ĐT cố định',
                ColFixed: false,
                ColWidth: 150
            },
            {
                ColId: 17,
                ColField: 'Email',
                ColName: 'Email',
                ColFixed: false,
                ColWidth: 200
            },
            {
                ColId: 18,
                ColField: 'CreatedDate',
                ColName: 'Ngày tạo',
                ColFixed: false,
                ColWidth: 150
            },
            {
                ColId: 19,
                ColField: 'CreatedBy',
                ColName: 'Người tạo',
                ColFixed: false,
                ColWidth: 150
            },
            {
                ColId: 20,
                ColField: 'ModifiedDate',
                ColName: 'Ngày sửa',
                ColFixed: false,
                ColWidth: 150
            },
            {
                ColId: 21,
                ColField: 'ModifiedBy',
                ColName: 'Người sửa',
                ColFixed: false,
                ColWidth: 150
            }
        ]
    }
}