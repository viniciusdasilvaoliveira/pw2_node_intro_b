const Ideia = require('../models/Ideia')
const User = require('../models/User')

const { op } = require('sequelize')

module.exports = class IdeiaController {
    static async dashboard(req, res){
        const userid = req.session.userid

        const user = await User.findOne({
            wherw: {
                id: userId
            },
            include: Ideia,
            plain: true,
        })

        const ideias = user.Ideia.map((result) => result.dataValues)

        let emptyIdeias = true

        if(ideias.length > 0){
            emptyIdeias = false
        }

        console.log(ideias)
        console.log(emptyIdeias)

        res.render('ideias/dashboard', {ideias, emptyIdeias})
    }

    static createIdeia(req, res){
        const ideia ={
            title: req.body.title,
            UserId: req.session.userId
        }

        Ideia.create(ideia)
        .then(() => {
            req.flash('message', 'Pensamento criado com sucesso')
            req.session.save(() => {
                res.redirect('/ideias/dashboard')
            })
            .catch((error) => console.log(error))
        })
    }

    static showIdeias(req, res){
        console.log(req.query)

        let search=''

        if(req.query.search){
            search = req.query.search
        }

        let order = 'DESC'

        if(req.query.order == 'old'){
            order= 'ASC'
        }else{
            order = 'DESC'
        }

        Ideia.findAll({
            include: User,
            where: {
                title: {[op.like]: `%${search}%`}
            },
            order: [['createAt', order]]
        })
        .then((data) => {
            let ideiaQty = data.length

            if(ideiaQty === 0){
                ideiaQty = false
            }

            const ideias = data.map((result) => result.get({plain: true}))

            res.render('ideias/home', {ideias, ideiasQty, search})
        })
        .catch((error) => console.error(error))
    }

    static removeIdeia(req, res){
        const id = req.body.id

        Ideia.destroy({where: {id: id}})
        .then(() => {
            req.flash('message', 'Pensamento removido com sucesso')
            req.session.save(() => {
                res.redirect('/ideias/dashboard')
            })
        })
        .catch((error) => console.error(error))
    }

    static updateIdeia(req, res){
        const id = req.params.id

        Ideia.findAll({where: {id: id}, raw: true})
        .then((ideia) => {
            res.render('ideias/edit', {ideia})
        })
        .catch((error) => console.error(error))
    }

    static updateIdeiaPost(req, res){
        const id = req.body.id

        const ideia = {
            title: req.body.title,
            description: req.description
        }

        Ideia.update(ideia, {where: {id: id}})
        .then(() => {
            req.flash('message', 'Pensamento editado com sucesso!')
            req.session.save(() => {
                res.redirect('/ideias/dashboard')
            })
        })
        .catch((error) => console.error(error))
    }
}