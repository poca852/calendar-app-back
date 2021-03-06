const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const { generarJWT } = require("../helpers");
const Usuario = require("../models/usuario");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if(!usuario){
      return res.status(404).json({
	ok: false,
	msg: "El usuario no existe"
      })
    }
    // comparamos las passwords
    const validPass = bcryptjs.compareSync(password, usuario.password);
    // validPass es el encargado de verificar el password, si da false, entonces respondemos con un 400  indicando que verifique los datos
    if (!validPass) {
      return res.status(400).json({
        ok: false,
        msg: "Revisa tus datos",
      });
    }

    // generamos el token con el id que me genero el mongo y el nombre del usuario
    const token = await generarJWT(usuario.id, usuario.name);

    // si todo sale bien entonces mandamos la respuesta
    res.status(201).json({
      ok: true,
      name: usuario.name,
      id: usuario.id,
      token,
    });
  } catch (error) {
    // En este punto puede ser un error de servidor, o de tipeo
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const renew = async (req = request, res = response) => {
  const { name, uid } = req;

  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    name,
    uid,
    token
  });
};

module.exports = {
  login,
  renew,
};

