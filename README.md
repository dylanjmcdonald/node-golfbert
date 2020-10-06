# node-golfbert
Node wrapper for the Golfbert API.

Please reference https://golfbert.com/api/docs for additional parameters to pass in as options to certain methods.

## Installing

`npm i node-golfbert`

## Usage

### Instantiate Client

```javascript
const golfbert = new Golfbert({
  apiKey: 'GOLFBERT_API_KEY',
  accessKey: 'GOLFBERT_ACCESS_KEY',
  secretKey: 'GOLFBERT_SECRET_KEY'
});
```

### Sample

```javascript
golfbert
  .getCourses()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

### Available Methods

#### Ping / API Status

```javascript
golfbert.ping()
```

#### Courses

```javascript
golfbert.getCourses(options)
golfbert.getCourseById(id)
golfbert.getCourseHolesById(id)
golfbert.getCourseScorecardById(id)
golfbert.getCourseTeeboxesById(id)
```

### Holes

```javascript
golfbert.getHoles(options)
golfbert.getHoleById(id)
golfbert.getHolePolygonsById(id)
golfbert.getHoleTeeboxesById(id)
```

### Teeboxes

```javascript
golfbert.getTeeboxColors()
golfbert.getTeeboxTypes()
```
