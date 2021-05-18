const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')
const { Model } = require('./models/model')
const jwt = require('jsonwebtoken')
const router = new express.Router()

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, 'diploma')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send('Authentication failed')
    }
}

router.get('/', function (req, res) {
    res.render('index')
})

router.post('/users/register', async (req, res) => {
    const user = new User(req.body)
    try {
        //const token = await user.generateAuthToken()
        await user.save()
        res.status(200).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.login, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (e) {
        console.log(e)
        res.status(400).send('Unable to login')
    }
})

router.post('/users/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/remove', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.delete()
        res.send(200)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/model/add', auth, async (req,res) => {
    try {
        console.log('/model/add')
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        const model = new Model({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            json: JSON.stringify(req.body.model)
        })

        req.user.models.push(model)
        await req.user.save()
        res.send(JSON.stringify(req.user.models))
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.delete('/model/:id', auth, async (req,res) => {
    try {
        console.log('/model/delete: ' + req.params.id)
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        const user = req.user
        user.models.pull({_id: req.params.id})
        user.save()
        res.send(user)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router