import moment from "moment";

class order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    // return this.date.toLocaleDateString("en-EN", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    //   hour: "2-digit",
    //   min: "2-digit"
    // });
    return moment(this.date).format("MMMM Do YYYY, hh:mm");
  }
}

export default order;
