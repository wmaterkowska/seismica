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
};

interface iEventObject {
  metadata: string[],
  wave: number[]
};



export function parseEventsData(data: string): iCatalogObject {

  const eventsDataObject: iCatalogObject = {
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
  };

  let eventsStrings: string[] = data.split('\n');

  let eventsArray: string[][] = []; //array with events - every event is an array of data
  for (let i = 0; i < eventsStrings.length; i++) {
    if (eventsStrings[i].match(/^#/) === null && eventsStrings[i] !== '' && eventsStrings[i].match(/^EventID/) === null) {
      let eventArray = eventsStrings[i].split('|');
      eventsArray.push(eventArray);
    }
  };

  eventsArray.forEach((eventArray) => {
    eventsDataObject.ids.push(Number.parseInt(eventArray[0]));
    eventsDataObject.times.push(eventArray[1]);
    eventsDataObject.latitudes.push(Number.parseFloat(eventArray[2]));
    eventsDataObject.longitudes.push(Number.parseFloat(eventArray[3]));
    eventsDataObject.depths.push(Number.parseFloat(eventArray[4]));
    eventsDataObject.authors.push(eventArray[5]);
    eventsDataObject.catalogs.push(eventArray[6]);
    eventsDataObject.contributors.push(eventArray[7]);
    eventsDataObject.contributorsId.push(eventArray[8]);
    eventsDataObject.magTypes.push(eventArray[9]);
    eventsDataObject.magnitudes.push(Number.parseFloat(eventArray[10]));
    eventsDataObject.magAuthors.push(eventArray[11]);
    eventsDataObject.locations.push(eventArray[12]);
  });

  return eventsDataObject;
};



export function parseEventData(data: string) {

  const eventDataObject: iEventObject = {
    metadata: [],
    wave: [],
  };

  let eventDataArray = data.split("\n");

  let metadata = [];
  let samples = [];
  for (let i = 0; i < eventDataArray.length; i++) {
    if (eventDataArray[i].match(/^#/) === null && eventDataArray[i].match(/^Sample/) === null) {
      samples.push(parseInt(eventDataArray[i]));
    } else {
      metadata.push(eventDataArray[i].slice(2));
    }
  }

  eventDataObject.metadata = metadata;
  eventDataObject.wave = samples;

  return eventDataObject;
}

