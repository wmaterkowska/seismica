const data = `#dataset: GeoCSV 2.0
#delimiter: |
#field_unit: unitless | ISO_8601 | degrees_north | degrees_east | kilometers | unitless | unitless | unitless | unitless | unitless | unitless | unitless | unitless
#field_type: integer | datetime | float | float | float | string | string | string | string | string | float | string | string
EventID|Time|Latitude|Longitude|Depth|Author|Catalog|Contributor|ContributorID|MagType|Magnitude|MagAuthor|EventLocationName
8209652|2011-01-08T23:32:29Z|46.307|7.61|4.7|CSEM|NEIC PDE|ZUR|quakeml:earthquake.usgs.gov/archive/product/origin/usp000hssd/us/1415324603942/product.xml|ml|3.0|CSEM|SWITZERLAND
8209653|2011-01-08T23:25:36Z|27.08|143.417|10.0|US|NEIC PDE|US|quakeml:earthquake.usgs.gov/archive/product/origin/usp000hssc/us/1415324603938/product.xml|mb|4.3|US|BONIN ISLANDS, JAPAN REGION
8209654|2011-01-08T22:30:46Z|47.744|146.861|421.7|US|NEIC PDE|US|quakeml:earthquake.usgs.gov/archive/product/origin/usp000hssb/us/1415324603926/product.xml|mb|4.4|US|NORTHWEST OF KURIL ISLANDS
8209655|2011-01-08T22:24:13Z|-16.807|-176.392|10.0|US|NEIC PDE|US|quakeml:earthquake.usgs.gov/archive/product/origin/usp000hssa/us/1415324603924/product.xml|mb|4.3|US|FIJI ISLANDS REGION`

const dataObject = {
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

const output = {
  ids: [8209652,]
}

Object.keys(dataObject).forEach((key) => {
  // Object.values, Object.entries
})