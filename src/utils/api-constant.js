
const baseUrl = `http://tu.uat.levincitest.com/api`;

export const Login = `${baseUrl}/merchant/login`;
export const GetCustomerByCode = `${baseUrl}/user/getbycode?customer_code=`;
export const PostCollectPoint = `${baseUrl}/merchant/pos`;
export const GetCustomerByPhone = `${baseUrl}/user/getbyphone?customer_phone=`;
export const GetVouncherByCustomerId = `${baseUrl}/reward/getvoucher?customer_id=`
export const GetVouncherDetail = `${baseUrl}/reward/getvoucherdetail?voucher_code=`;
export const PostOrderListCustomer = `${baseUrl}/order/getinfo`;
export const PostCreateCustomer = `${baseUrl}/merchant/createcustomer`;
export const PostAddAddressCustomer = `${baseUrl}/user/addaddress`;
export const PostUseVouncher = `${baseUrl}/reward/usecoupon`;
export const PostSubmitOrder = `${baseUrl}/merchant/pos`;

export const GetDistrictByCity = `${baseUrl}/location/getdisctrict` //?city = 2
export const GetWardsByProvince = `${baseUrl}/location/getwardbyprovince`; //?district_id=1&province_id=1
export const GetStreetByWards = `${baseUrl}/location/getstreetsbyward` //?ward_id=26974
export const GetAreaByStreet = `${baseUrl}/location/getareasbystreet` //?street_id=244
