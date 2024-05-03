
 function IsValidPassword(password){
    const passworPattern=/[A-Z]/   

    const hasUppercase = passworPattern.test(password);
    return password.length >=8 && hasUppercase
}

export default IsValidPassword