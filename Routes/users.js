const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// FUNÇÕES AUXILIARES
const createUserToken = (userId) => {
    return jwt.sign({ id:userId }, config.jwt_pass , { expiresIn: config.jwt_expires_in });
}

router.get('/', async (req, res) => {
    try{
        const users = await Users.find({});
        return res.send(users);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuários.'});
    }

})

router.post('/create', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).send({ error: 'Dados insuficientes.' });
    
    try {
        const user = await Users.create(req.body);
        user.password = undefined;
        return res.status(201).send({ user, token: createUserToken(user.id)});
        
    } catch (error) {
        //console.log(error);
        return res.status(500).send({ error: 'Erro ao buscar usuário.' })
    }

});

router.post('/auth', async (req, res) => {
    const {email, password } = req.body;

    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes. '});

    try {
        const user = await Users.findOne({ email }).select('+password');

        if (!user) return res.status(400).send ({ error: 'Usuário não registrado.' });

        const pass_ok = await bcrypt.compare(password, user.password);

        if (!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar o usuário.' });

        user.password = undefined;
        return res.send({ user, token: createUserToken(user.id) });
    
    } catch (error) {
        if(err) return res.status(500).send({ error: 'Erro ao buscar usuário.' });
    } 
});


module.exports = router;


/*
200 - ok
201 - created
201 - accepted

400 - bad request
401 - unauthorization - autorização - caráter temporário, token inválido
403 - forbidden - autorização - caráter permanente, autorização.
404 - not found - endpoint não encontrado

500 - Internal server error
501 - Not Implemented - a API não tem esta funcionalidade
503 - Service Unavailable - API executa a operação porém está indisponível. (manutenção)



*/