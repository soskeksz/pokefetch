import React, { useEffect, useState } from "react";

function Location(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/location/${props.locationId}/`
      );
      const json = await response.json();
      setData(json);
    //   console.log(json);
    }

    fetchData();
  }, [props.locationId]);

  if (!data) {
    return <div></div>;
  }

  return (
    <div className="Location">
        
    <button onClick={() => props.onClick(data.areas.length >= 1 ? props.locationId : null)}>
      {data.name}
    </button>
  
        
     
    </div>
  );
}

export default Location;
