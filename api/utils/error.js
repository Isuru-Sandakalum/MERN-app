export const errorHandler = (statusCode, message)=>{
const error = new Error()
error.ststusCode = statusCode
error.message = message
return error;
};

//custome funtion for handle errors