interface iDataObject {
  ids: number[],
  times: string[],
  latitudes: number[],
  longitudes: number[],
  depths: number[],
  authors: string[],
  catalogs: string[],
  contributors: string[],
  contributorsId: string[],
  magTypes: string[],
  magnitudes: number[],
  magAuthors: string[],
  locations: string[],
}

export function parseEventsData(data: string): iDataObject {

  const dataObject: iDataObject = {
    ids: [],
    times: [],
    latitudes: [],
    longitudes: [],
    depths: [],
    authors: [],
    catalogs: [],
    contributors: [],
    contributorsId: [],
    magTypes: [],
    magnitudes: [],
    magAuthors: [],
    locations: [],
  }

  console.log(data);


  let rows: string[] = data.split('\n');

  let eventsArray: string[][] = [];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].match(/^#/) === null && rows[i] !== '') { //TODO add rows[i].match(/^EventID/) === null
      let eventArray = rows[i].split('|');
      // console.log(eventArray, '++++++++++++++++++++++++');
      eventsArray.push(eventArray);
    }
  }

  eventsArray.forEach((eventArray) => {
    dataObject.ids.push(Number.parseInt(eventArray[0]));
    dataObject.times.push(eventArray[1]);
    dataObject.latitudes.push(Number.parseFloat(eventArray[2]));
    dataObject.longitudes.push(Number.parseFloat(eventArray[3]));
    dataObject.depths.push(Number.parseFloat(eventArray[4]));
    dataObject.authors.push(eventArray[5]);
    dataObject.catalogs.push(eventArray[6]);
    dataObject.contributors.push(eventArray[7]);
    dataObject.contributorsId.push(eventArray[8]);
    dataObject.magTypes.push(eventArray[9]);
    dataObject.magnitudes.push(Number.parseFloat(eventArray[10]));
    dataObject.magAuthors.push(eventArray[11]);
    dataObject.locations.push(eventArray[12]);
  });

  console.log(dataObject, '==========================================')

  return dataObject;
}