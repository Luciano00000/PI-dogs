import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogId, cleanDetail } from "../../redux/actions";
import style from "./detail.module.css";

const Detail = (props) => {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.dog);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = props.match.params.id;
    setLoading(true);
    dispatch(getDogId(id))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));

    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, props.match.params.id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!dog) {
    return <div>No se encontró el perro.</div>;
  }

  const createdInDb = dog.createdInDb;

  const minWeightKg = Number(dog.weight.metric?.split(" - ")[0]);
  const maxWeightKg = Number(dog.weight.metric?.split(" - ")[1]);

  const minHeightCm = Number(dog.height.metric?.split(" - ")[0]);
  const maxHeightCm = Number(dog.height.metric?.split(" - ")[1]);

  const lifeSpan = dog.life_span?.replace("years", "años");

  const imageURL = `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`;

  return (
    <div>
      <h1>Nombre: {dog.name}</h1>
      <img className={style.image} src={createdInDb ? dog.image : imageURL} alt="Dog" />
      {createdInDb ? (
        <>
          {dog.temperaments && dog.temperaments.length > 0 && (
            <h3>Temperamentos: {dog.temperaments.map((temperament) => temperament.name).join(", ")}</h3>
          )}
          <h3>Esperanza de vida: {dog.life_span} años</h3>
          <h3>Peso: {dog.weight} kg</h3>
          <h3>Altura: {dog.height} cm</h3>
        </>
      ) : (
        <>
          {dog.temperament && <h3>Temperamentos: {dog.temperament}</h3>}
          <h3>Esperanza de vida: {lifeSpan}</h3>
          <h3>Peso: {minWeightKg} - {maxWeightKg} kg</h3>
          <h3>Altura: {minHeightCm} - {maxHeightCm} cm</h3>
        </>
      )}
      <h4>ID: {dog.id}</h4>
    </div>
  );
};

export default Detail;