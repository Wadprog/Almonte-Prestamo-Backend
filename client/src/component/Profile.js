import React, { useState } from "react";
import ClientDetails from "./ClientDetails";

const Profile = ({ client }) => {
  const [data, setData] = useState({ ...client });

  const handleChange = (e) => {
    console.log(e.target.value)
   setData({...data, [e.target.name]:e.target.value})
  };
  const { name,apellido } = data;
  return (
    <form>
      <ClientDetails name={"Nombre"} value={name} editable={false} />
      <ClientDetails
        name={"apellido"}
        value={apellido}
        editable={false}
        handleChange={handleChange}
      />
      <ClientDetails name="Cedula" value={client.cedula} editable={false} />
      <ClientDetails
        name={"Telefono"}
        value={client.telefono}
        editable={false}
        handleChange={handleChange}
      />
      <ClientDetails
        name={"Dirreccion "}
        value={client.dirreccion}
        editable={false}
        handleChange={handleChange}
      />
      <ClientDetails
        name={"Referencia"}
        value={client.DirReferencia}
        editable={false}
        handleChange={handleChange}
      />
      <ClientDetails
        name={"Ciudad"}
        value={client.ciudad}
        editable={false}
        handleChange={handleChange}
      />
      
    </form>
  );
};
export default Profile;
