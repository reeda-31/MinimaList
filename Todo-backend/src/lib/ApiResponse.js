class ApiResponse{
    constructor(statuscode,data,msg="Success")
    {
        this.statuscode=statuscode,
        this.data=data,
        this.message=msg,
        this.success=statuscode<400
    }
}

export {ApiResponse}