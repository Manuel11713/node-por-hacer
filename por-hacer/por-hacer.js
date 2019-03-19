const fs = require('fs');

let listadotareas = [];

const guardarDB = () => {
    let data = JSON.stringify(listadotareas);

    fs.writeFile('db/DataBase.json', data, error => {
        if (!error) console.log('archivo guardado')
    });
}

const cargarDB = () => {
    try {
        listadotareas = require('../db/DataBase.json');
    } catch {
        listadotareas = [];
    }
}


const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadotareas.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();

    return listadotareas;
}

const actualizar = (descripcion, completado) => {

    cargarDB();
    let index = listadotareas.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadotareas[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}
const borrar = (descripcion) => {
    cargarDB();

    let nuevolistado = listadotareas.filter(tarea => tarea.descripcion !== descripcion);

    if (nuevolistado.length === listadotareas.length) {

        return false;
    } else {
        listadotareas = nuevolistado;
        guardarDB();
        return true;
    }

}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}