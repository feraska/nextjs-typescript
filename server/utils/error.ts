/**
 * @param status error status
 * @param message error message
 * @returns error object
 * 
 */
export const createError = (status:number, message:string)=>{
    const err = {
        status,
        message
    }
    return err
  } 