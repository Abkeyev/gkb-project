import React, { useEffect } from 'react';

export const arrayToString = (arr: any, field: any) => {
    var res: string = "";
    arr.map((i: any) => {
            res += `${i[field]},`
        })

    return res.substring(0, res.length - 1);
}

export const downloadBlob = (blob: any, name = 'file.txt') => {
  if (
    window.navigator && 
    window.navigator.msSaveOrOpenBlob
  ) return window.navigator.msSaveOrOpenBlob(blob);

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = data;
  link.download = name;

  // this is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', { 
      bubbles: true, 
      cancelable: true, 
      view: window 
    })
  );

  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(data);
    link.remove();
  }, 100);
}

export const getFormattedPhone = (p: string) => `+${p.substring(0, 1)} (${p.substring(1, 4)}) ${p.substring(4, 7)} - ${p.substring(7, 9)} - ${p.substring(9, 11)}`;

export const getFormattedPhoneWithoutPlus = (p: string) => 
  p ? p.length  == 12 ? `${p.substring(0, 2)} (${p.substring(2, 5)}) ${p.substring(5, 8)} - ${p.substring(8, 10)} - ${p.substring(10, 12)}`
  : `+${p.substring(0, 1)} (${p.substring(1, 4)}) ${p.substring(4, 7)} - ${p.substring(7, 9)} - ${p.substring(9, 11)}` : 'не указан';

export const OnClickOutside = (ref: any, handler: any) => {
    useEffect(
      () => {
        const listener = (event: any) => {
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      [ref, handler]
    );
  }

export const addCommas = (nStr: any) => {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ' ' + '$2');
  }
  return x1 + x2;
}

export const secondsToDhms = (seconds: any) => {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  
  var dDisplay = d > 0 ? d + ' д. ' : "";
  var hDisplay = h > 0 ? h + ' ч. ' : "";
  var mDisplay = m > 0 ? m + ' м. ' : "";
  return {
    diff: dDisplay + hDisplay + mDisplay,
    critical: d >= 2
  }
}

export const calculateTheDistance = (la1: any, lo1: any, la2: any, lo2: any) => {
  let radius = 6372795;

  let lat1 = la1 * Math.PI / 180;
  let lat2 = la2 * Math.PI / 180;
  let long1 = lo1 * Math.PI / 180;
  let long2 = lo2 * Math.PI / 180;
   
  let cl1 = Math.cos(lat1);
  let cl2 = Math.cos(lat2);
  let sl1 = Math.sin(lat1);
  let sl2 = Math.sin(lat2);

  let delta = long2 - long1;

  let cdelta = Math.cos(delta);
  let sdelta = Math.sin(delta);
   
  let y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
  let x = sl1 * sl2 + cl1 * cl2 * cdelta;
   
  let ad = Math.atan2(y, x);
  let dist = ad * radius;
   
  return dist;
}