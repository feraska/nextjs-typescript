export const createError = (status:number, message:string)=>{
    const err = {
        status,
        message
    }
    return err
  } 