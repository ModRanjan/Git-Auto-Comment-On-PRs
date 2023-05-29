export function pageTitle(newTitle) {
  return (document.title = newTitle);
}

export function getSessionStorage(key) {
  return JSON.parse(window.sessionStorage.getItem(key));
}

export function setSessionStorage(key, value) {
  // * STORE walletData INTO SESSION
  return window.sessionStorage.setItem(key, JSON.stringify(value));
}

export function setLocalStorage(key, value) {
  // * STORE INTO LOCALSTORAGE SESSION
  return window.localStorage.setItem(key, JSON.stringify(value));
}

export function getPastDate(days) {
  const today = new Date();
  const pastDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
  return [today, pastDate];
}

export function getPastDates(days) {
  const pastDates = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - i);

    pastDates.push(pastDate.toString().slice(0, 3));
  }

  return pastDates;
}

export function timeDifference(time) {
  const currentTime = new Date().getTime();
  let timestampDifference = new Date(time - currentTime);
  let year = timestampDifference.getUTCFullYear() - 1970;
  let month = timestampDifference.getUTCMonth();
  let day = timestampDifference.getUTCDate() - 1;
  let hour = timestampDifference.getUTCHours();
  const diff = {
    remainingYear: function () {
      return year > 0 ? year + ' year ' : '';
    },
    remainingMonth: function () {
      return month > 0 ? month + ' month ' : '';
    },
    remainingDays: function () {
      return day > 0 ? day + ' day ' + hour + ' hr' : '';
    },
    remainingHour: function () {
      if (year <= 0 && month <= 0) {
        return hour > 0
          ? hour + ' hr'
          : Math.ceil(timestampDifference / 1000 / 60) + ' min';
      }
    },
  };
  let timeDifference =
    diff.remainingYear() +
    '' +
    diff.remainingMonth() +
    '' +
    diff.remainingDays();
  timeDifference =
    timeDifference.length > 0 ? timeDifference : diff.remainingHour();
  return timeDifference;
}
