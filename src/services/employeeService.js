import ErrorResult from "../core/result/errorResult.js"
import SuccessResult from "../core/result/successResult.js"
import { users } from "../data/users.js"
import ErrorDataResult from "../core/result/errorDataResult.js"

export default class EmployeeService {
    constructor(loggerService) {
        this.type = "employee"        
        this.employees = []
        this.requiredFields = ["id", "firstName", "lastName", "age", "city", "salary"]
        this.loggerService = loggerService
    }

    load() {
        for (const user of users) {
            if(user.type === this.type && this.checkEmployeeValidityForErrors(user,this.requiredFields).success){
                    this.employees.push(user)
            }
        }
    }

    add(user) {
        if(user.type === this.type && this.checkEmployeeValidityForErrors(user).success) {
            this.employees.push(user)
        }else{
            return new ErrorDataResult(user,"This user can not be added. Wrong user type")
        }
        
        this.loggerService.log(user)
    }

    listEmployees() {
        return this.employees
    }

    getEmployeeById(id) {
        return this.employees.find(u=>u.id ===id)
    }

    getEmployeesSorted(){
        return this.sortEmployees();
    }

    //privateMethods starts
    sortEmployees(){
        return this.employees.sort((employee1,employee2)=>{
            if(employee1.firstName>employee2.firstName){
                return 1;
            }else if(employee1.firstName===employee2.firstName){
                return 0;
            }else{
                return -1
            }
        })
    }

    checkEmployeeValidityForErrors(user,requiredFields) {
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
    //privateMethods ends

}