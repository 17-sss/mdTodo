const userModel = (sequelize, DataTypes) => (
    sequelize.define('user', {
        userid: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        userpwd: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },        
    },{
        timestamps: true,
        paranoid: true,
    })
);


module.exports = userModel;