import { writable } from 'svelte/store';

export const postStore = writable([]);

const getReadTime = (s) => {
    s = s.replace(/(^\s*)|(\s*$)/gi, "");
    s = s.replace(/[ ]{2,}/gi, " ");
    s = s.replace(/\n /, "\n");
    let words = s.split(" ").filter(function (str) {
      return str != "";
    }).length;
    return Math.ceil(words / 200);
  };

  const getDate = (date) => {
    date = date.toDate().toString();
    date = date.split(" ");
    return `${date[2]} ${date[1]} ${date[3]}`;
  };

export const common = writable({
    getReadTime: getReadTime,
    getDate: getDate
});
