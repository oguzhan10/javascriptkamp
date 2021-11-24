import Result from "./result.js";

export default class SuccessDataResult extends Result{
    constructor(data,message){
        super(true,message)
        this.data=data
    }
}