function IsValidEmail(email){
    const EmailPattern=/^[a-zA-Z0-9]+[@][a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
    return EmailPattern.test(email)
}

export default IsValidEmail