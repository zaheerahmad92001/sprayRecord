
export function Validate (input) {
    //validate name
    //const Regx = /^[a-zA-Z0-9 ]+$/;
    //const re = /^[0-9]+$/  

    const Regx =  /^([\S]+)([a-zA-Z\s\.]+)*$/
     return Regx.test(input); 
};
export function ValidateDecimalNumber (input){
    const Regx =  /^\d+(\.\d{0,9})?$/
    return Regx.test(input)
};
export function ValidateNumber (input){
    const Regx =/^[0-9]+$/
    return Regx.test(input)
}
export function ValidateEmail (email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
export function ValidateBatchNo (input){
    
}
export function convertDateToString(date) {
    date = date.getFullYear() + '-' + (("0" + (date.getMonth() + 1)).slice(-2)) + '-' + ("0"+date.getDate()).slice(-2)
    return date;
}