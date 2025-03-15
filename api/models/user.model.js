const mongoose = require("mongoose"); //IMPORTACIÓN DE LA LIBRERÍA DE MONGOOSE (ENLAZA CON LA BASE DE DATOS).
const bcrypt = require("bcryptjs"); //IMPORTACIÓN DE LA LIBRERÍA BCRYPTJS PARA LAS CONTRASEÑAS.

//PATRONES PARA LAS RONDAS DE HASH, EL MAIL Y LA CONTRASEÑA:
const SALT_WORK_FACTOR = 10; 
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{6,}$/;

// LA LISTA DE LOS MAILS DE LOS ADMINISTRADORES LA GUARDAMOS EN UNA VARIABLE DE ENTORNO POR SEGURIDAD.
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase());

// const validStudies = ["primaria", "secundaria", "licenciatura", "diplomatura", "grado", "postgrado", "doctorado", "autodidacta"];

//ESQUEMA DEL USUARIO (PARÁMETROS DE LA FICHA: NOMBRE, APELLIDOS, MAIL, ETC.):
const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "User name is required/El nombre de usuario es obligatorio"],
            unique: true, //ASÍ NO PERMITIMOS QUE SE REPITAN NOMBRES DE USUARIO Y SE EVITAN CONFUSIONES.
            trim: true, //ELIMINA LOS ESPACIOS EN BLANCO AL PRINCIPIO Y AL FINAL.
            maxLength: [10, "User name characters must be lower than 10/El nombre de usuario debe ser inferior a 10 caracteres"],
            minLength: [5, "User name characters must be higher than 5/El nombre de usuario debe tener más de 5 caracteres"],
        },

        firstName: {
            type: String,
            required: [true, "First name is required/El nombre es obligatorio"],
            trim: true, //ELIMINA LOS ESPACIOS EN BLANCO AL PRINCIPIO Y AL FINAL.
        },

        lastName: {
            type: String,
            required: [true, "Last name is required/El apellido (al menos uno) es obligatorio"],
            trim: true, //ELIMINA LOS ESPACIOS EN BLANCO AL PRINCIPIO Y AL FINAL.
        },

        email: {
            type: String,
            required: [true, "Email is required/La dirección de correo es obligatoria"],
            unique: true, //ES NECESARIO QUE CADA CORREO SEA ÚNICO (UN USUARIO PODRÍA CREARSE UN SEGUNDO PERFIL CON OTRO CORREO).
            trim: true,
            lowercase: true, //ASÍ NOS ASEGURAMOS DE QUE EL CORREO ESTÉ ESCRITO EN MINÚSCULA.
            match: [EMAIL_PATTERN, "Invalid user email pattern/Patrón de correo de usuario no válido"], 
        },

        password: {
            type: String,
            required: [true, "User password is required/La contraseña de usuario es obligatoria"],
            match: [PASSWORD_PATTERN, "Invalid user password pattern/Contraseña de usuario no válida"],
            maxLength: [10, "User password must have a maximum of 10 characters./La contraseña de usuario debe tener un máximo de 10 caracteres"],
            minLength: [6, "User password must have, at least, 6 characters/La contraseña de usuario debe tener, al menos, 6 caracteres"],
        },

        studies: {
            type: String,
            //REVISAR (¿TIPOS DE ESTUDIOS?)
            required: false
        },
    },
    {
        timestamps: true, //PERMITE EL "CREATEDAT" Y "UPDATEDAT".
    }
);

// PARA ELIMINAR CAMPOS QUE MONGOOSE GENERA POR DEFECTO Y DATOS SENSIBLES (PASSWORD):
userSchema.set("toJSON", {
    transform: function (doc, ret) {         
        delete ret.__v;
        delete ret._id;
        delete ret.password;
        delete ret.activateToken;
        ret.id = doc.id; //CREA EL CAMPO ID SIN LA BARRA BAJA.
        return ret;
    },
});

//COMPARACIÓN DE LA CONTRASEÑA PARA COMPROBAR QUE ES LA AUTÉNTICA.
userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
};

// HOOK "PRE-SAVE" PARA COMPROBAR EL EMAIL Y ASIGNAR EL ROL "ADMIN" SI ES NECESARIO.
userSchema.pre("save", function (next) {
    if (ADMIN_EMAILS.includes(this.email)) {
        // Aquí se podría asignar alguna lógica especial para administradores, si fuera necesario.
    }
    // "HASSEO" DE LA CONTRASEÑA.
    if (this.isModified("password")) {
        bcrypt
            .hash(this.password, SALT_WORK_FACTOR)
            .then((hash) => {
                this.password = hash; 
                next();
            })
            .catch((error) => next(error));
    } else {
        next(); 
    }
});

//CREACIÓN DEL MODEL "USER" SEGÚN EL ESQUEMA ANTES ESPECIFICADO (REVISAR).
const User = mongoose.model("User", userSchema);

//EXPORTACIÓN DEL MODELO.
module.exports = User;

