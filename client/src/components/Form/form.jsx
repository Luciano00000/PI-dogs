import { useState, useEffect } from "react";
import axios from 'axios';
import style from "./form.module.css";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
    temperaments: [],
    image: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
    temperaments: "",
    image: "",
  });

  const [temperamentList, setTemperamentList] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/temperaments")
      .then(res => {
        setTemperamentList(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "temperaments") {
      const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
      setForm({ ...form, [name]: selectedOptions });
    } else {
      setForm({ ...form, [name]: value });
    }

    checkFormValidity();
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value)) {
          return "Hay un error en el nombre";
        }
        if (value === "") {
          return "Campo obligatorio";
        }
        break;
      case "minHeight":
        if (value === "") {
          return "Campo obligatorio";
        }
        if (!/^\d+$/.test(value)) {
          return "Debe ser un número";
        }
        break;
      case "maxHeight":
        if (value === "") {
          return "Campo obligatorio";
        }
        if (!/^\d+$/.test(value)) {
          return "Debe ser un número";
        }
        if (Number(value) < Number(form.minHeight)) {
          return "Debe ser mayor o igual que la altura mínima";
        }
        break;
      case "minWeight":
        if (value === "") {
          return "Campo obligatorio";
        }
        if (!/^\d+$/.test(value)) {
          return "Debe ser un número";
        }
        break;
      case "maxWeight":
        if (value === "") {
          return "Campo obligatorio";
        }
        if (!/^\d+$/.test(value)) {
          return "Debe ser un número";
        }
        if (Number(value) < Number(form.minWeight)) {
          return "Debe ser mayor o igual que el peso mínimo";
        }
        break;
      case "temperaments":
        if (value.length === 0) {
          return "Debe seleccionar al menos un temperamento";
        }
        break;
      default:
        break;
    }

    return "";
  };

  const checkFormValidity = () => {
    const isFormValid = Object.values(errors).every(error => error === "");
    const isFormEmpty = Object.values(form).some(value => value === "");
    setIsButtonDisabled(!isFormValid || isFormEmpty);
  };

  const blurHandler = (event) => {
    const { name, value } = event.target;
    const errorMessage = validateField(name, value);
    setErrors({ ...errors, [name]: errorMessage });
    checkFormValidity();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const isFormValid = Object.values(errors).every(error => error === "");
    if (!isFormValid) {
      alert("Debe completar todos los campos correctamente antes de crear el perro.");
      return;
    }

    const height = `${form.minHeight}-${form.maxHeight}`;
    const weight = `${form.minWeight}-${form.maxWeight}`;

    const newForm = {
      ...form,
      height: height,
      weight: weight
    };

    axios
      .get("http://localhost:3001/dogs")
      .then(res => {
        const existingDogs = res.data;
        const isDuplicate = existingDogs.some(
          dog => dog.name.toLowerCase() === newForm.name.toLowerCase()
        );

        if (isDuplicate) {
          alert("El perro ya existe. No se puede crear otro con el mismo nombre.");
        } else {
          axios
            .post("http://localhost:3001/dogs", newForm)
            .then(res => {
              console.log(res.data);
              setForm({
                name: "",
                minHeight: "",
                maxHeight: "",
                minWeight: "",
                maxWeight: "",
                life_span: "",
                temperaments: [],
                image: "",
              });
              setIsFormSubmitted(true);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <form onSubmit={submitHandler} className={`form-container ${style.form}`}>
      <div className="form-field">
        <label htmlFor="name">Nombre: </label>
        <input type="text" id="name" value={form.name} onChange={changeHandler} onBlur={blurHandler} name="name" className="form-input" />
        {errors.name && <span>{errors.name}</span>}
        <small className={style["small-text"]}>Escribe el nombre del perro.</small>
      </div>

      <div className={style.inlineFields}>
        <label htmlFor="minHeight">Altura : </label>
        <input type="text" id="minHeight" value={form.minHeight} onChange={changeHandler} onBlur={blurHandler} name="minHeight" className={style.formInput} />
        {errors.minHeight && <span>{errors.minHeight}</span>}
        <input type="text" value={form.maxHeight} onChange={changeHandler} onBlur={blurHandler} name="maxHeight" className={style.formInput} />
        {errors.maxHeight && <span>{errors.maxHeight}</span>}
        <small className={style["small-text"]}>Escribe el rango de altura en centímetros (mínimo - máximo).</small>
      </div>

      <div className={style.inlineFields}>
        <label htmlFor="minWeight">Peso: </label>
        <input type="text" id="minWeight" value={form.minWeight} onChange={changeHandler} onBlur={blurHandler} name="minWeight" className={style.formInput} />
        {errors.minWeight && <span>{errors.minWeight}</span>}
        <input type="text" value={form.maxWeight} onChange={changeHandler} onBlur={blurHandler} name="maxWeight" className={style.formInput} />
        {errors.maxWeight && <span>{errors.maxWeight}</span>}
        <small className={style["small-text"]}>Escribe el rango de peso en kilogramos (mínimo - máximo).</small>
      </div>

      <div>
        <label htmlFor="life_span">Años de vida: </label>
        <input type="text" id="life_span" value={form.life_span} onChange={changeHandler} onBlur={blurHandler} name="life_span" className="form-input" placeholder="valores divididos por (-)" />
        <small className={style["small-text"]}>Escribe el rango de años de vida (mínimo - máximo). Por ejemplo, "10-15".</small>
      </div>

      <div className="form-field">
        <label htmlFor="temperaments">Temperamentos: </label>
        <select multiple id="temperaments" value={form.temperaments} onChange={changeHandler} onBlur={blurHandler} name="temperaments" className="form-input">
          {temperamentList.map(temperament => (
            <option key={temperament.id} value={temperament.id}>{temperament.name}</option>
          ))}
        </select>
        {errors.temperaments && <span>{errors.temperaments}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="image">Imagen: </label>
        <input type="text" id="image" value={form.image} onChange={changeHandler} onBlur={blurHandler} name="image" className="form-input" />
        <small className={style["small-text"]}>Pega aquí la URL de una imagen del perro.</small>
      </div>

      <button type="submit" disabled={isButtonDisabled} className="form-button">Crear</button>

      {isFormSubmitted && <p>¡El perro ha sido creado exitosamente!</p>}
    </form>
  );
};

export default Form
