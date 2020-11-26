sendResponse = function(result,error){
    if(error)
        return { status:false,message:'Oops something went wrong',data:{},error }
    else
        return { status:true,message:'',data:result[0] }

}

module.exports = sendResponse