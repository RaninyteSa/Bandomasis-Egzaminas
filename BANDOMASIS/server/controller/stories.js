import express from 'express'
import db from '../database/connect.js'
import { storiesValidator } from '../middleware/validate.js'
import { adminAuth } from '../middleware/auth.js'

const Router = express.Router()

Router.get('/', async (req, res) => {

    const options = {}

    if(req.query.sort === '1') {
        options.story = [

        ['story','photo', 'sum']
    ]
}

    if(req.query.sort === '2') {
        options.story = [

        ['story','photo', 'sum']
    ]
}
    try {
        const stories = await db.Stories.findAll(options)
        res.json(stories)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.get('/single/:id', adminAuth, async (req, res) => {
    try {

        const stories = await db.Stories.findByPk(req.params.id, {
            attributes:['story','photo', 'sum']
        })
        res.json(stories)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.post('/new', adminAuth, storiesValidator, async (req, res) => {
    try {
        await db.Stories.create(req.body)
        res.send('Salonas sėkmingai sukurtas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.put('/edit/:id', adminAuth, storiesValidator, async (req, res) => {
    try {
        const stories = await db.Stories.findByPk(req.params.id)
        await stories.update(req.body)
        res.send('Salonas sėkmingai atnaujintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.delete('/delete/:id', adminAuth, async (req, res) => {
    try {
        const stories = await db.Stories.findByPk(req.params.id)
        await stories.destroy()
        res.send('Salonas sėkmingai ištrintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

export default Router