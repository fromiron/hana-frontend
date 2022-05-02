export function validateEmail(email: string) {
    if (email.length > 6 && email.includes('@') && email.includes('.')) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
    return false;
}

//小文字、大文字、数字、7文字以上
export function validatePassword(password: string) {
    const number = /\d/g;
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    return password.length > 6 && number.test(password) && lowerCase.test(password) && upperCase.test(password);
}