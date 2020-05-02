export default {
  filters: {
    dateTime(value) {
      let date = new Date(value);
      return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    },
  },
};
