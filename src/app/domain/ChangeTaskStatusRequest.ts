export class ChangeTaskStatusRequest {
    constructor(public taskId: string, public status: string) { }
}