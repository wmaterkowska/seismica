import { parseEventData } from '../utility/parser';
const eventHttp = 'http://service.iris.edu/fdsnws/dataselect/1/query?' //API for retriving the seismogram

export const getEarthquakeData = async (date: string) => {
  return await fetchEventDataFromApi(date);
}

async function fetchEventDataFromApi(date: string) {

  const NET = 'IU';
  const STA = 'LCO';
  const CHANNEL = 'BHZ';

  const sdate = new Date(Date.parse(date) - 600000).toISOString().slice(0, -1);
  const edate = new Date(Date.parse(date) + 1000000).toISOString().slice(0, -1);

  const http = `${eventHttp}net=${NET}&sta=${STA}&loc=00&cha=${CHANNEL}&start=${sdate}&end=${edate}&format=geocsv.slist.inline`;

  const eventData = await fetch(http, {
    method: 'get',
    headers: {
      'content-type': 'text/csv'
    }
  });

  const eventDataString = await eventData.text();

  const dataObject = parseEventData(eventDataString);

  return dataObject;
}