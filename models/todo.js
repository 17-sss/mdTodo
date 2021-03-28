const todoModel = (sequelize, DataTypes) => (
    sequelize.define('todo', {
        subject: {
            type: DataTypes.STRING(50),
            allowNull: false,            
        },
        content: {
            type: DataTypes.STRING(10000),
            allowNull: false,
        },
        /*
        img: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },        
        */
    },{
        timestamps: true,
        paranoid: true,
    })
);


module.exports = todoModel;