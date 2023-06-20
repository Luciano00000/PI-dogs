import { useSelector } from "react-redux";
import Card from "../Card/card";
import styles from "./cardsContainer.module.css";

const CardsContainer = ({ currentPage, dogsPerPage, dogsLoaded, loading }) => {
    const dogs = useSelector(state => state.dogs); // Obtener el estado global, propiedad dogs

    const indexOfLastDog = currentPage * dogsPerPage; // Cálculo del índice del último perro de la página actual multiplicando el número de la página actual por la cantidad de perros
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; // Cálculo del índice del primer perro
    const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog); // Obtener los perros de la página que corresponde

  return (
    <div className={styles.container}>
      {!loading && dogsLoaded &&
        currentDogs.map(dog => (
          <Card
            key={dog.id}
            id={dog.id}
            image={dog.image}
            name={dog.name}
            temperaments={dog.temperaments}
            weight={dog.weight}
            height={dog.height}
            createdInDb={dog.createdInDb}
            temperament={dog.temperament}
          />
        ))
      }
    </div>
  );
};

export default CardsContainer;