export default class ToastModel {
  constructor(text = null) {
    this.show = text !== null;
    this.text = text;
  }
}
