import moment from "moment";
import Web3 from "web3";
const BigNumber = require("bignumber.js");

const { utils } = Web3;

export const formatTokenNumber = (num: number, fraction?: number) => {
  const _fraction =
    fraction !== undefined
      ? getPriceFractionFormat(num, fraction)
      : getPriceFractionFormat(num, 2);

  return (Number(num) || 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: _fraction > 18 ? 18 : _fraction,
  });
};

export const clipAddressText = (
  address: string,
  first?: number,
  last?: number
) => {
  if (!address) {
    return "";
  }
  return `${address.slice(0, first || 18)}...${
    last === 0 ? "" : address.slice(-(last || 8))
  }`;
};

export const getErrorMessageFromResponse = (err) => {
  return (
    (err && err.data && err.data.message) ||
    (err && err.message) ||
    "Something wrong, please try again later"
  );
};

export const diffDuration = (now, time) => {
  var leftTime = time - now;
  if (leftTime < 0) {
    return "00:00:00";
  }
  const _duration = moment.duration(leftTime, "seconds");

  const hour =
    _duration.hours() < 10 ? `0${_duration.hours()}` : _duration.hours();
  const min =
    _duration.minutes() < 10 ? `0${_duration.minutes()}` : _duration.minutes();
  const sec =
    _duration.seconds() < 10 ? `0${_duration.seconds()}` : _duration.seconds();
  if (Math.floor(_duration.asDays()) > 0) {
    return (
      Math.floor(_duration.asDays()) + " days " + hour + ":" + min + ":" + sec
    );
  } else {
    return hour + ":" + min + ":" + sec;
  }
};

export const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getValueAsEther = (valueAsWei, decimals) => {
  let num = new BigNumber(valueAsWei);
  let denom = new BigNumber(10).pow(decimals);
  let ans = num.dividedBy(denom).toNumber();
  return ans;
};

export const getValueAsWei = (valueAsEther, decimals) => {
  let num = valueAsEther * +`1e${decimals}`;
  return new BigNumber(num).toString(10);
};

export const getVolumeScore = (volume) => {
  if (volume > 1000000) {
    return {
      isPassedCheck: 2,
      safePoint: 9,
      text: `High\n$${formatTokenNumber(volume, 0)}`,
    };
  }

  if (volume > 100000) {
    return {
      isPassedCheck: 1,
      safePoint: 5,
      text: `Medium\n$${formatTokenNumber(volume, 0)}`,
    };
  }

  return {
    isPassedCheck: 0,
    safePoint: 1,
    text: `Low\n$${formatTokenNumber(volume, 0)}`,
  };
};

export const getPriceFractionFormat = (price, deicmals?: number) => {
  let fractional =
    Math.floor(1 / price).toString().length + (deicmals ? deicmals - 1 : 3);
  return fractional;
};

export const simpleFormatTokenNumber = (num: number, fraction?: number) => {
  const _fraction =
    fraction !== undefined
      ? getPriceFractionFormat(num, fraction)
      : getPriceFractionFormat(num, 2);

  return (Number(num) || 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: _fraction > 18 ? 18 : _fraction,
  });
};
