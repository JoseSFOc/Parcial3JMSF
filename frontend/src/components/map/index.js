import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useFetch } from "../../custom-hooks/useFetch";

const url = "https://parcial3-jmsf.herokuapp.com/locations/";

const createLocation = async (location) => {
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(location),
    redirect: "follow",
  });
};

const updateLocation = async (location) => {
  await fetch(url + location._id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(location),
    redirect: "follow",
  });
};

const deleteLocation = (id) => {
  fetch(url + id, {
    method: "DELETE",
  });
};

const Map = () => {
  const [center, setCenter] = useState([36.721261, -4.4212655]);
  const [location, setLocation] = useState({
    title: "",
    coordinates: { lat: "", lon: "" },
  });
  const [locations, setLocations] = useState([]);
  const { products } = useFetch(url);

  useEffect(() => {
    setLocations(products);
  }, [products]);

  const editLocation = (editLoc) => {
    setLocation(editLoc);
  };

  const removeLocation = (removeLoc) => {
    const newLocations = locations.filter((loc) => loc._id !== removeLoc._id);
    deleteLocation(removeLoc._id);
    setLocations(newLocations);
    setCenter([36.721261, -4.4212655]);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "lat" || name === "lon") {
      setLocation({
        ...location,
        coordinates: { ...location.coordinates, [name]: value },
      });
    } else {
      setLocation({ ...location, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(e);

    if (
      location.title &&
      location.coordinates.lat &&
      location.coordinates.lon
    ) {
      if (location._id) {
        const newLocations = [
          ...locations.filter((loc) => loc._id !== location._id),
          location,
        ];
        updateLocation(location);
        setLocations(newLocations);
        setLocation({ title: "", coordinates: { lat: "", lon: "" } });
      } else {
        createLocation(location);
        const response = await fetch(url);
        const newLocations = await response.json();
        setLocations(newLocations);
        setLocation({ title: "", coordinates: { lat: "", lon: "" } });
      }
    }
  };

  const selectLocation = (loc) => {
    setCenter([loc.coordinates.lat, loc.coordinates.lon]);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Locations</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => {
                return (
                  <tr>
                    <td onClick={() => selectLocation(loc)}>{loc.title}</td>
                    <td onClick={() => selectLocation(loc)}>
                      {loc.coordinates.lat}
                    </td>
                    <td onClick={() => selectLocation(loc)}>
                      {loc.coordinates.lon}
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => editLocation(loc)}
                      >
                        Edit
                      </Button>
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
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={location.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="lat">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="number"
                  name="lat"
                  value={location.coordinates.lat}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="lon">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  name="lon"
                  value={location.coordinates.lon}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>

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
                <Marker
                  key={loc._id}
                  position={[loc.coordinates.lat, loc.coordinates.lon]}
                >
                  <Popup>{loc.title}</Popup>
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
