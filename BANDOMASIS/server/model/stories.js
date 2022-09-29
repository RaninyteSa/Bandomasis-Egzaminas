import { DataTypes } from 'sequelize'

const Stories = (sequelize) => {
    const Schema = {
        story: {
            type: DataTypes.STRING, 
            allowNull: false 
        },

        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
    
        sum: {
            type: DataTypes.NUMBER, 
            allowNull: false
        }
    }

    return sequelize.define('Stories', Schema)
}

export default Stories