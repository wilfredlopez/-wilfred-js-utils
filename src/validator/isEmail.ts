/**
   *  Verify if its a valid email address. works with domain names up to 11 digits long. 
   * @note the largest domain name i could find was .accountants
   * @param email email to validate
   * @param domainLimit limit the domain to certain characters long. Defaults to 11. 
   * 
```const email = 'test@email.info'```
   * @example 
   *  Validator.isEmail('notAnEmail') //false;
   *  Validator.isEmail(email) //true;
   * 
   *  //using custom domainLimit
   *  Validator.isEmail(email,3) //false because domain limit is 3 and .info has 4 digits;
   * 
   * 
   */
export function isEmail(email: any, domainLimit = 11) {
    //Edge cases
    if (typeof email === "symbol") return false
    if (String(email)[String(email).length - 1] === ".") return false

    const regex = new RegExp(
        "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2," + domainLimit +
        "})+$",
    )
    // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(email)) {
    if (regex.test(email)) {
        return true
    }
    return false
}