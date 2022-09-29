import express from 'express'
import Sequelize from 'sequelize'
import db from '../database/connect.js'
import upload from '../middleware/multer.js'
import { userValidator } from '../middleware/validate.js'
import { adminAuth } from '../middleware/auth.js'

const Router = express.Router()

Router.get('/', async (req, res) => {
    try {
        const options = {
            include: [
                {
                    model: db.Stories,
                    attributes: ['story']
                },
             
            ],
          

        }

        if(req.query.Stories)
            options.where = {
                StoriesId: req.query.Stories
            }

        const workers = await db.Workers.findAll(options)
        res.json(workers)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.get('/single/:id',adminAuth, async (req, res) => {
    try {

        const user = await db.Users.findByPk(req.params.id, {
            attributes:['first_name', 'last_name', 'photo', 'StoriesId']
        })
        res.json(user)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.post('/new', adminAuth, upload.single('photo'), userValidator, async (req, res) => {
    try {
        if(req.file)
            req.body.photo = '/uploads/' + req.file.filename

        await db.users.create(req.body)
        res.send('Darbuotojas sėkmingai išsaugotas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.put('/edit/:id',adminAuth, upload.single('photo'), userValidator, async (req, res) => {
    try {
        if(req.file)
            req.body.photo = '/uploads/' + req.file.filename

        const user = await db.Users.findByPk(req.params.id)
        await user.update(req.body)
        res.send('Darbuotojas sėkmingai atnaujintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.delete('/delete/:id', adminAuth, async (req, res) => {
    try {
        const user = await db.Workers.findByPk(req.params.id)
        await worker.destroy()
        res.send('Darbuotojas sėkmingai ištrintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

export default Router