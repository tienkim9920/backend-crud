class BaseResponse {
    constructor(data, status, message) {
        this.data = data;
        this.status = status;
        this.message = message;
    }

    json() {
        return {
            data: this.data || null,
            status: this.status || null,
            message: this.message || null,
        }
    }
}

module.exports = BaseResponse;