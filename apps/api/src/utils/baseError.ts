import { CustomError } from "./customError";

export class BaseError extends CustomError{
    constructor(public message:string,public statusCode:number){
        super(message)
    }
    serialize(): { message: string; } {
        return {message:this.message}
    }
}