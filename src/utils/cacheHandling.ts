
export const TIMEOUT = {
    MENU: 1,
    OUTLET: 1,
    AGE_GATE: 86400,
    DIFFERENT_CITY_MODAL: 86400
}

export function isCacheTimeExpired(lastUpdated: string | null | undefined, cacheType: string, isPreview = false) {
    if(lastUpdated && !isPreview) {
      let cacheTime = 0;
      switch(cacheType) {
        case "menu":
          cacheTime = parseInt(process.env.REACT_APP_MENU_CACHE_TIME || "1");
          break;
        case "outlet":
          cacheTime = parseInt(process.env.REACT_APP_OUTLET_CACHE_TIME || "1");
          break;
        case "ageGate":
          cacheTime = TIMEOUT.AGE_GATE || 1;
          break;
        case "differentCityModal":
          cacheTime = TIMEOUT.DIFFERENT_CITY_MODAL || 1;
          break;
      }
      const lastUpdatedDate = new Date(lastUpdated);
      const willUpdateDate = new Date(new Date(lastUpdated).setSeconds(lastUpdatedDate.getSeconds() + cacheTime));
      // if(isAfter(new Date(), willUpdateDate)) {
      //   return true;
      // }
      return false;
    }
    return true;
}