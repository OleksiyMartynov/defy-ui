import ApiError from "./ApiError";

class DataModel {
  constructor(data, loading = false, error = false) {
    this.data = data;
    this.loading = loading;
    this.error = error;
  }

  static error(code, message) {
    return new DataModel(false, false, new ApiError(message, code));
  }
}
export default DataModel;
