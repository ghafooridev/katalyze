/* eslint-disable */
// @ts-nocheck

import { useEffect } from 'react';

const useHotjar = (hjid, hjsv) => {
  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure we're in the browser

    (function (h, o, t, j, a, r) {
      if (h && o && t && j && a && r) {
        h.hj = h.hj
          || function () {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
        h._hjSettings = { hjid, hjsv };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script');
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      }
    }(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv='));
  }, [hjid, hjsv]);
};

export default useHotjar;
