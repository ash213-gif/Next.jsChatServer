exports.Validnaame = (name) => {
    const Validname = /^[A-Za-z\s]{2,30}$/;
   return  Validname.test(name)

}

exports.Validemaaail = (email) => {
    const validemail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return  validemail.test(email)

}

exports.Validpaaassword = (password) => {
    const validpasword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
   return  validpasword.test(password)

}