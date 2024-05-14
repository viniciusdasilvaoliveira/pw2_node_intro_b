const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class UserController{
    static login(req, res){
        res.render('auth/login')
    }
    
    static register(req, res) {
        res.render('auth/register')
    }
    static async registerPost(req, res){
        const {name, email, password, comfirmpassword} = req.body

        if(password != comfirmpassword){
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')
            return 
        }

        const checkIfUserExist = await User.findOne({where: {email: email}})

        if(checkIfUserExist){
            req.flash('message', 'O e-mail já esta cadastrado!')
            res.render('auth/login')
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassaword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassaword
        }

        User.create(user)
        .then((user) => {
            req.session.userid = user.id
            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
            .catch((err) => console.error(err))
        })
    }
}
