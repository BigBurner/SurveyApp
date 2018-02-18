export class UserSurveys {
        _id: string;
    constructor(public projId, public userId: string, public survId: string) {
        this._id = "UserSurveys:"+userId+":"+projId+":"+survId;
        this.projId = projId
        this.userId = userId
        this.survId = survId
    }
}

export class UserSurveyAnswers {
    _id: string;
    constructor(public userSrId: string, public surqId: string, public suraId: string) {
        this._id = "UserSurveyAnswers:"+userSrId+":"+surqId
        this.userSrId = userSrId
        this.surqId = surqId
        this.suraId = suraId
    }
}