function convertToObject(content) {
    const [keys, ...apps] = content.trim().split('\n');
    const keysList = keys.split(';').map((key) => (key.startsWith('downloads') ? key.split('_').at(-1) : key.split('_')[0]));
    const appsList = apps.reduce((acc, messenger) => {
      const data = messenger.split(';');
      acc.push(data.reduce((acc2, value, i) => {
        acc2[keysList[i]] = parseFloat(value, 10) || value;
        return acc2;
      }, {}));
      return acc;
    }, []);
    return appsList;
  }
  
  const getTopMessenger = (data) => data.reduce((
    top,
    {
      name, developer, playmarket, appstore,
    },
  ) => (top.at(-1) < playmarket + appstore ? [name, developer, playmarket + appstore] : top), ['', '', 0]);
  
  const getMaxInIndia = (data) => data.reduce((mx, { India }) => Math.max(mx, India), 0);
  
  const getMinInIndia = (data) => data.reduce((mn, { India }) => Math.min(mn, India), Infinity);
  
  const compare = (a, b) => {
    if (a[0] > b[0]) {
      return -1;
    } if (a[0] === b[0]) {
      return 0;
    }
    return 1;
  };
  
  const getAustralia = (data) => {
    const temp = data.map(({ name, Australia }) => [Australia, name]).sort(compare);
    return temp.slice(0, 3).map(([, name]) => name).sort();
  };
  
  const getAvgTop = (data) => {
    const temp = data.map(({
      name, Russia, Australia, India, England,
    }) => [Russia + Australia + India + England, name]).sort(compare).reverse();
    return temp.map(([, name]) => name);
  };
  
  const compareTask5 = (a, b) => (a[1] > b[1] ? -1 : a[1 === b[1] ? 0 : 1])
  
  const getDeveloper = (data) => {
      const temp = data.map(({ developer }) => developer);
      const obj = temp.reduce((objDev, dev) => {
          objDev[dev] = (objDev[dev] || 0) + 1;
          return objDev;
      }, {});
      return Object.entries(obj).sort(compareTask5).at(0)
  }
// task 1
const tableParsing = (content) => {
    const data = convertToObject(content);
    const [name, developer] = getTopMessenger(data);
    console.log(`General top messenger: ${name}, Owner: ${developer}`);
    const [mxInd, mnInd] = [getMaxInIndia(data), getMinInIndia(data)];
    console.log(`Download count: Max count: ${mxInd}, Min count: ${mnInd}`);
    const getTopAustralia = getAustralia(data);
    console.log(`Top-3 Australia: ${getTopAustralia.join(', ')}`);
    const getAvgg = getAvgTop(data);
    console.log(`Top downloads: ${getAvgg.join(', ')}`);
    const [name1] = getDeveloper(data);
    console.log(`Top owner: ${name1}`);
};

// task 2
const candidateAssessment = (/* content */) => {

};

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
