interface iCatalogObject {
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

export function parseEventsData(data: string): iCatalogObject {

  const dataObject: iCatalogObject = {
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


  let rows: string[] = data.split('\n');

  let eventsArray: string[][] = []; //array with events - every event is array of data
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].match(/^#/) === null && rows[i] !== '' && rows[i].match(/^EventID/) === null) {
      let eventArray = rows[i].split('|');
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

  return dataObject;
}


export function parseEventData(data: string) {

  let dataArray = data.split("\n");

  let samples = [];
  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].match(/^#/) === null && dataArray[i].match(/^Sample/) === null) {
      samples.push(parseInt(dataArray[i]))
    }
  }
  return samples;

}

