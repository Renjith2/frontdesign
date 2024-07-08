const {axiosInstance}=require(".")
export const registerUser = async (payload)=>{
    try {
        console.log("first")
        const response= await axiosInstance.post('/api/user/register',payload)
        console.log(response.data)
        console.log("Second")
        return response.data
    } catch (error) {
        return error
    }
}


export const loginUser = async (payload)=>{
    try {
        console.log("first")
        const response= await axiosInstance.post('/api/user/login',payload)
        console.log(response.data)
        console.log("Second")
        return response.data
    } catch (error) {
        return error
    }
}