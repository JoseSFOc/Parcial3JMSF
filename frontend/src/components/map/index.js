import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = () => {
  const [center, setCenter] = useState([36.721261, -4.4212655]);
  const [location, setLocation] = useState({ lat: "", lon: "", text: "" });
  const [locations, setLocations] = useState([]);

  useEffect(() => {}, [center]);

  const removeLocation = (removeLoc) => {
    const newLocations = locations.filter(
      (loc) =>
        loc.lat !== removeLoc.lat &&
        loc.lon !== removeLoc.lon &&
        loc.text !== removeLoc.text
    );
    setLocations(newLocations);
    setCenter([36.721261, -4.4212655]);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLocation({ ...location, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);

    if (location.lat && location.lon && location.text) {
      setLocations([...locations, location]);
      setLocation({ lat: "", lon: "", text: "" });
    }
  };

  const selectLocation = (loc) => {
    setCenter([loc.lat, loc.lon]);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Locations</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Lat</th>
                <th>Lon</th>
                <th>Text</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => {
                return (
                  <tr onClick={() => selectLocation(loc)}>
                    <td>{loc.lat}</td>
                    <td>{loc.lon}</td>
                    <td>{loc.text}</td>
                    <td>
                      <Button variant="primary">Edit</Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => removeLocation(loc)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="lat">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="number"
                  name="lat"
                  value={location.lat}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="lon">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  name="lon"
                  value={location.lon}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="text">
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                name="text"
                value={location.text}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              style={{ marginBottom: "2rem" }}
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Col>
        <Col>
          <h1>Map</h1>
          <MapContainer
            key={center}
            center={center}
            zoom={13}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc) => {
              return (
                <Marker position={[loc.lat, loc.lon]}>
                  <Popup>{loc.text}</Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default Map;
