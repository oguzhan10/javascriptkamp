import ErrorResult from "../core/result/errorResult.js"
import {
    users
} from "../data/users.js"

export default class UserService {
    constructor(loggerService) {
        this.userList = [];
        this.loggerService = loggerService
    }

    load() {
        for (const user of users) {            
            this.userList.push(user)           
        }
    }

    add(user) {
        this.userList.push(user)
        this.loggerService.log(user)
    }


}