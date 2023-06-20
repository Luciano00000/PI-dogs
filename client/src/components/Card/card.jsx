import { useHistory } from "react-router-dom";
import styles from "./card.module.css";

const Card = (props) => {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/dogs/detail/${id}`);
  };

  const {
    id,
    createdInDb,
    image,
    name,
    weight,
    temperaments,
    temperament
  } = props;

  return (
    <div className={styles.card} onClick={() => handleClick(id)}>
      <div>
        <img className={styles.cardImage} src={image?.url} alt={name} />
        <h3>{name}</h3>
        <p>Peso: {weight?.metric ? `${weight.metric} kg` : 'N/A'}</p>
        {temperaments && temperaments.length > 0 && (
          <p className={styles.temperament}>
            Temperamento: {temperaments.map((temperament) => temperament.name).join(', ')}
          </p>
        )}
        {!createdInDb && (
          <p className={styles.temperament}>Temperamento: {temperament}</p>
        )}
      </div>
    </div>
  );
};

export default Card;