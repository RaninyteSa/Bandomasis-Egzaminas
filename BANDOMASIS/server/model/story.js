import { DataTypes } from 'sequelize'

const Story = (sequelize) => {
    const Schema = {
        story: {
            type: DataTypes.STRING, 
            allowNull: false 
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
    
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        sum: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }

    return sequelize.define('Story', Schema)
}

export default Story