const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: { type: DataTypes.STRING(120), allowNull: false },
      email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      senha: { type: DataTypes.STRING(120), allowNull: false },
      dataNascimento: { type: DataTypes.DATEONLY, allowNull: true},
      rg: { type: DataTypes.STRING(20), allowNull: true },
      cpf: { type: DataTypes.STRING(20), allowNull: true, unique: true },
      nomeMae: { type: DataTypes.STRING(120), allowNull: false },
      role: { type: DataTypes.STRING(20), allowNull: false }
    },
    {
      tableName: "usuarios",
      timestamps: true,
    }
  );

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Endereco, { foreignKey: "idUsuario", as: "enderecos" });
    Usuario.hasMany(models.Contato, { foreignKey: "idUsuario", as: "contatos" });
  };

  return Usuario;
};
