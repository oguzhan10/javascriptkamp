import ErrorResult from "../core/result/errorResult.js"
import SuccessResult from "../core/result/successResult.js"
import { users } from "../data/users.js"
import ErrorDataResult from "../core/result/errorDataResult.js"
export default class CustomerService {
    constructor(loggerService) {
        this.type = "customer"        
        this.customers = []
        this.requiredFields = ["id", "firstName", "lastName", "age", "city", "creditCardNumber"]
        this.loggerService = loggerService
    }

    load() {
        for (const user of users) {
            if(user.type === this.type && this.checkCustomerValidityForErrors(user,this.requiredFields).success){
                    this.customers.push(user)
            }
        }
    }

    add(user) {
        if(user.type === this.type && this.checkCustomerValidityForErrors(user).success) {
            this.customers.push(user)
        }else{
            return new ErrorDataResult(user,"This user can not be added. Wrong user type")
        }
        this.loggerService.log(user)
    }

    listCustomers() {
        return this.customers
    }

    getCustomerById(id) {
        return this.customers.find(u=>u.id ===id)
    }

    getCustomersSorted(){
        return this.sortCustomers();
    }

    sortCustomers(){
        return this.customers.sort((customer1,customer2)=>{
            if(customer1.firstName>customer2.firstName){
                return 1;
            }else if(customer1.firstName===customer2.firstName){
                return 0;
            }else{
                return -1
            }
        })
    }

    checkCustomerValidityForErrors(user,requiredFields) {
        for (const field of requiredFields) {
            if (!user[field]) {
                return new ErrorResult(`Validation problem. ${field} is required`)
            }
            else{
                return new SuccessResult()
            }
        }
        if (Number.isNaN(Number.parseInt(+user.age))) {
            return new ErrorResult(`Validation problem. ${user.age} is not a number`)
        }else{
            return new SuccessResult()
        }
    }

}