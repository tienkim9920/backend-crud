class BaseResponse {
    constructor(data, status, message) {
        this.data = data;
        this.status = status;
        this.message = message;
    }

    json() {
        return {
            data: this.data,
            status: this.status,
            message: this.message,
        }
    }
}

module.exports = BaseResponse;