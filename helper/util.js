sendResponse = function(result,error){
    if(error)
        return { status:false,message:'Oops something went wrong',data:{} }
    else
        return { status:true,message:'',data:result }

}

module.exports = sendResponse