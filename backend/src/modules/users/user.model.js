import { DataTypes } from 'sequelize';

export const initUserModel = sequelize => {
  return sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      avatarUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      socketId: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastSeenAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'users',
      timestamps: false,
    }
  );
};
