import express from 'express'
import db from '../database/connect.js'
import { storyValidator } from '../middleware/validate.js'
import { auth , adminAuth } from '../middleware/auth.js'

const Router = express.Router()

//Admino užsakymų sąrašas
Router.get('/', adminAuth , async (req, res) => {
    try {
        const story = await db.Story.findAll({
            include: [
                {
                     model : db.Users,
                     attributes: ['first_name', 'last_name']
                }
            ]
        })
        res.json(story)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

//Vartotojo užsakymai
Router.get('/user/', auth,  async (req, res) => {
   
    const user_id = req.session.user.id

    try {
        const story = await db.Story.findAll({
            where: { userId: user_id },
            include: [
                {
                    model: db.Stories ,
                    attributes: ['story', 'photo', 'status', 'sum']
                },
                db.Users
                
            ], 
            group: ['id']
                
        })
        res.json(story)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.post('/new', auth, storyValidator, async (req, res) => {
    try {
        req.body.userId = req.session.user.id
        await db.Story.create(req.body)
        res.send('Užsakymas sėkmingai sukurtas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.get('/single/:id', adminAuth, async (req, res) => {
    try {

        const story = await db.Story.findByPk(req.params.id, {
            // attributes:['name', 'duration', 'price', 'saloonId']
        })
        res.json(story)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.put('/edit/:id', adminAuth, storyValidator, async (req, res) => {
    try {
        const order = await db.Story.findByPk(req.params.id)
        await order.update(req.body)
        res.send('Užsakymas sėkmingai atnaujintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.delete('/delete/:id', adminAuth,  async (req, res) => {
    try {
        const order = await db.Story.findByPk(req.params.id)
        await order.destroy()
        res.send('Užsakymas sėkmingai ištrintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

export default Router