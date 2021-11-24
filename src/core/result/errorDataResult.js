import Result from "./result.js";

export default class ErrorDataResult extends Result{
    constructor(data,message){
        super(false,message)
        this.data = data
    }
}