import { useState, useEffect, useCallback } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState({});

  const getLocation = useCallback(async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    } else {
      setLocation({
        lat: 36.7213028,
        lon: -4.4216366,
      });
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return location;
};
