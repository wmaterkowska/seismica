
exports.getEarthquakesData = async () => {
  return await fetchEventsDataFromApi();
}


async function fetchEventsDataFromApi() {
  let eventsData = await fetch('http://service.iris.edu/fdsnws/event/1/query?starttime=2011-01-08T00:00:00&endtime=2011-01-09T00:00:00&catalog=NEIC%20PDE&format=geocsv', {
    method: 'get',
    headers: {
      'content-type': 'text/csv'
    }
  });

  return eventsData;
}