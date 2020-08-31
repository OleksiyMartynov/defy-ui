import moment from "moment";

export default class Formatter {
  static kFormatter(num) {
    return Math.abs(num) > 999
      ? `${Math.sign(num) * (Math.abs(num) / 1000).toFixed(1)}k`
      : Math.sign(num) * Math.abs(num);
  }

  static getBaseUrl(url) {
    const pathArray = url.split("/");
    const protocol = pathArray[0];
    const host = pathArray[2];
    return `${protocol}//${host}`;
  }

  static addCommas(intNum) {
    return `${intNum}`.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }

  static countDownFormat(endTime) {
    const currentTime = moment().unix();
    const diffTime = Math.max(endTime - currentTime, 0);
    const duration = moment.duration(diffTime * 1000, "milliseconds");
    return `${this.zeroPad(duration.hours())}:${this.zeroPad(
      duration.minutes()
    )}:${this.zeroPad(duration.seconds())}`;
  }

  static zeroPad(n) {
    return n < 10 ? `0${n}` : n;
  }

  static isValidLink(text) {
    const expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    return text.match(regex);
  }

  static isTweetLink(text) {
    if (!this.isValidLink(text)) {
      return false;
    }
    const parser = document.createElement("a");
    parser.href = text;
    const parts = parser.pathname.split("/");
    if (parser.hostname === "twitter.com" && parts?.[2] === "status") {
      return parts[3];
    }
    return false;
  }

  static getLinkHostName(text) {
    const parser = document.createElement("a");
    parser.href = text;
    return `${parser.protocol}//${parser.host}`;
  }

  static convertUnicode(input) {
    return input.replace(/\\u(\w\w\w\w)/g, (a, b) => {
      const charcode = parseInt(b, 16);
      return String.fromCharCode(charcode);
    });
  }
}
