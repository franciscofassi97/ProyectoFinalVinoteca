import * as actionTypes from "../constants/comentariosConstats";

export const getComentariosIdProductoReducer = (
  state = { comentarios: [] },
  action
) => {
  switch (action.type) {
    case actionTypes.GET_COMENTARIOS_REQUEST:
      return {
        loading: true,
        comentarios: [],
      };
    case actionTypes.GET_COMENTARIOS_SUCCESS:
      return {
        loading: false,
        comentarios: action.payload,
      };
    case actionTypes.GET_COMENTARIOS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const crearComentarioReducer = (state = { comentario: {} }, action) => {
  switch (action.type) {
    case actionTypes.COMENTARIO_CREAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.COMENTARIO_CREAR_SUCCESS:
      return {
        loading: false,
        success: true,
        comentario: action.payload,
      };
    case actionTypes.COMENTARIO_CREAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.COMENTARIO_CREAR_RESET:
      return {};
    default:
      return state;
  }
};

export const comentarioActualizarReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.COMENTARIO_ACTUALIZAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.COMENTARIO_ACTUALIZAR_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.COMENTARIO_ACTUALIZAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.COMENTARIO_ACTUALIZAR_RESET:
      return {};
    default:
      return state;
  }
};
//comentarioById
export const comentarioByIdReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case actionTypes.GET_ONECOMENTARIO_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_ONECOMENTARIO_SUCCESS:
      return {
        loading: false,
        comentario: action.payload,
      };
    case actionTypes.GET_ONECOMENTARIO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case actionTypes.GET_ONECOMENTARIO_RESET:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

export const getComentariosReducer = (state = { comentarios: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_TODOS_COMENTARIOS_REQUEST:
      return {
        loading: true,
        comentarios: [],
      };
    case actionTypes.GET_TODOS_COMENTARIOS_SUCCESS:
      return {
        loading: false,
        comentarios: action.payload,
      };
    case actionTypes.COMENTARIO_ELIMINAR_SUCCESS:
      return {
        loading: false,
        success: true,
        comentarios: action.payload.comentarios.filter(
          (comentario) => comentario._id !== action.payload.comentarioId
        ),
      };
    case actionTypes.GET_TODOS_COMENTARIOS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const eliminarComentarioReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.COMENTARIO_ELIMINAR_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.COMENTARIO_ELIMINAR_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.COMENTARIO_ELIMINAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.COMENTARIO_ELIMINAR_RESET:
      return {};
    default:
      return state;
  }
};
