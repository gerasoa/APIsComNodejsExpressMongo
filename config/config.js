const env = process.env.NODE_ENV || 'dev';

const config = () => {

    switch(env){
        case 'dev':
        return {
            db_string: 'mongodb+srv://usuario_admin:123mudar@clusterapi-zejlq.mongodb.net/test?retryWrites=true&w=majority',
            jwt_pass: 'batatafrita2019',
            jwt_expires_in: '7d'
        }

        case 'hml':
        return {
            db_string: 'mongodb+srv://usuario_admin:123mudar@clusterapi-zejlq.mongodb.net/test?retryWrites=true&w=majority',
            jwt_pass: 'batatafrita2019',
            jwt_expires_in: '7d'
        }

        case 'prod':
        return {
            db_string: 'mongodb+srv://usuario_admin:123mudar@clusterapi-zejlq.mongodb.net/test?retryWrites=true&w=majority',
            jwt_pass: 'batatafrita2019',
            jwt_expires_in: '7d'
        }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);


module.exports = config();