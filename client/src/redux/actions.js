import axios from "axios"

export const GET_DOGS = "GET_DOGS"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const GET_DOG_ID = "GET_DOG_ID"
export const GET_DOG_NAME = "GET_DOG_NAME"
export const CREATE_DOG = "CREATE_DOG"
export const ORDER_ALFABETIC = "ORDER_ALFABETIC"
export const ORDER_WEIGHT = "ORDER_WEIGHT"
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN"
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT" 
export const CLEANDETAIL = "CLEANDETAIL" 
export const RESET_FILTERS = "RESET_FILTERS"



export const getDogs = () => {
    return async function (dispatch)  {
        const response = await axios.get("http://localhost:3001/dogs")
        const dogs = response.data

        dispatch({type: GET_DOGS, payload: dogs})

        dispatch(getTemperaments())
    }
}


export const getTemperaments = () => {
    return async function (dispatch)  {
        const response = await axios.get("http://localhost:3001/temperaments")
        const temperaments = response.data

        dispatch({type: GET_TEMPERAMENTS, payload: temperaments})
    }

}


export const getDogId = (id) => {
    return async function (dispatch) {
        const IdDog = await axios.get(`http://localhost:3001/dogs/${id}`)
        const dog = IdDog.data

        dispatch({type: GET_DOG_ID, payload: dog})
    }

}


export const getDogName = (name) => {
    return async function (dispatch) {
        const json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
        const dogName = json.data
        if (dogName) {
            return dispatch({type: GET_DOG_NAME, payload: dogName})
            
        }else {
            return alert("No se encontro el perro")
        }
    }
}


export const createDog = (payload) => {
    return async function (dispatch) {
        const create = await axios.post("http://localhost:3001/dogs", payload)
        
        dispatch({type: CREATE_DOG})
    return create.data
    }
}


export const orderAlfabetic = (payload) => {
    return async function(dispatch) {
        dispatch({ type: ORDER_ALFABETIC, payload })
    }
};


export const orderWeight = (payload) => {
    return async function(dispatch) {
        dispatch({  type: ORDER_WEIGHT, payload })
    }
}


export const filterByOrigin = (origin) => (dispatch, getState) => {
    dispatch({
      type: FILTER_BY_ORIGIN,
      payload: origin,
    });
  
    const state = getState();
    const selectedTemperament = state.temperamentFilter;
  
    if (selectedTemperament) {
      dispatch(filterByTemperament(selectedTemperament));
    }
  };
  
  
  export const filterByTemperament = (payload) => {
      return {
          type: FILTER_BY_TEMPERAMENT,
          payload: payload,
      }
  }

  
  export const cleanDetail = () => {
      return function(dispatch){
          dispatch({ type: CLEANDETAIL })
      }   
  };
  
  
  export const resetFilters = () => {
      return {
        type: "RESET_FILTERS",
      };
    };
