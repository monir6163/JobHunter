/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
async function adsDataFetch() {
  const res = await fetch('https://jobhunter.btebresultsbd.com/all/ads');
  const data = await res.json();
  return data;
}

export default adsDataFetch;
