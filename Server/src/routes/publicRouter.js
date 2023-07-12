const { Router } = require("express");

const {
  registerUserHandler,
  loginUserHandler,
  getAllPropertiesHandler,
  getPropertyByIdHandler,
  getPropertiesByTitleHandler,
} = require("../handlers/publicHandlers");

const publicRouter = Router();

/**************** RUTAS PUBLICAS SIN AUTENTICARSE ****************/

//Registro de usuario
publicRouter.post("/register", registerUserHandler);
//Login del usuario
publicRouter.post("/login", loginUserHandler);
//Obtener todas las propiedades
publicRouter.get("/properties", getAllPropertiesHandler);
//Obtener el detalle de la propiedad
publicRouter.get("/property/detail/:id", getPropertyByIdHandler);
//ruta buscar por searchbar
publicRouter.get("/properties/title", getPropertiesByTitleHandler);

module.exports = publicRouter;
