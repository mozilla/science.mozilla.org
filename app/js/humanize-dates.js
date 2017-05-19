import Moment from "moment-timezone";

export default {
  calculateDate(timeStart, timeEnd, timeZone=`UTC`) {
    let start = new Moment(timeStart).tz(timeZone);
    let end = new Moment(timeEnd).tz(timeZone);

    if (start.isSame(end, `day`)) {
      return start.format(`MMM DD, YYYY`);
    } else if( start.isSame(end, `month`)) {
      return `${start.format(`MMM D`)}-${end.format(`D, YYYY`)}`;
    } else if( start.isSame(end, `year`)) {
      return `${start.format(`MMM D`)}-${end.format(`MMM D, YYYY`)}`;
    } else {
      return `${start.format(`MMM D, YYYY`)}-${end.format(`MMM D, YYYY`)}`;
    }
  },
  calculateTime(timeStart, timeEnd, timeZone) {
    let start = new Moment(timeStart).tz(timeZone);
    let end = new Moment(timeEnd).tz(timeZone);

    if(!timeStart || !timeEnd) { return; }
    if(start.isSame(end, `day`)) {
      if(start.format(`a`) === end.format(`a`)) {
        return this.stripZeroMins(`${start.format(`MMM D, h:mm`)}-${end.format(`h:mma z`)}`);
      } else {
        return this.stripZeroMins(`${start.format(`MMM D, h:mma`)}-${end.format(`h:mma z`)}`);
      }
    } else {
      return this.calculateDate(timeStart, timeEnd, timeZone);
    }
  },
  stripZeroMins(timeString) {
    return timeString.replace(/:00/g, ``);
  }
};
