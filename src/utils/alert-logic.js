export const checkForHighLoad = (loadSummary) => {
  let time = 0;
  let list = loadSummary.filter((d) => d !== null);
  for(let i = list.length - 1; i >=0; i--) {
    if(list[i].value < 1.0) {
      break;
    } else if(list[i].value > 1.0) {
      time++;
    }
  }
  return time === 12;
}

export const checkForRecovery = (loadSummary) => {
  let time = 0;
  let list = loadSummary.filter(d => d !== null);
  for (let i = list.length - 1; i >= 0; i--) {
    if (list[i].value > 1.0) {
      break;
    } else if (list[i].value < 1.0) {
      time++;
    }
  }
  return time === 12;
}