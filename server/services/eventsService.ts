import { parseEventsData } from '../utility/parser';
const eventsHttp = 'http://service.iris.edu/fdsnws/event/1/query'

export const getEarthquakesData = async (sdate: string, edate: string, minM: string, maxM: string) => {
  return await fetchEventsDataFromApi(sdate, edate, minM, maxM);
}


async function fetchEventsDataFromApi(sdate: string, edate: string, minM: string, maxM: string) {

  const http = `${eventsHttp}?starttime=${sdate}&endtime=${edate}&minmagnitude=${minM}&maxmagnitude=${maxM}&format=geocsv`;

  // let http = 'http://service.iris.edu/fdsnws/event/1/query?starttime=2011-01-08T00:00:00&endtime=2011-01-09T00:00:00&catalog=NEIC%20PDE&format=geocsv'

  const eventsData = await fetch(http, {
    method: 'get',
    headers: {
      'content-type': 'text/csv'
    }
  });

  const eventsDataString = await eventsData.text();

  const dataObject = parseEventsData(eventsDataString);

  // console.log(data);
  return dataObject;
}