const User = require("../models/User");
const Bcrypt = require("bcryptjs");
const AuthErrorMessage = "Invalid Authorization"

async function getAllUsers(req,res){
    UserIsAdmin(res.locals.user,res)
    const users = await User.find()
    res.send(users)
}

async function getUserByName(req,res){
    UserIsAdmin(res.locals.user,res)
	const user = await User.findOne({ username: req.params.username }).exec();
    if (!user) {
        return res.status(400).send({ message: "Impossible to find this user" });
    }
	res.send(user)
}

async function createUser(req, res) {
    UserIsAdmin(res.locals.user,res)
    try {
        var user = new User({
            name: req.body.name,
            firstName: req.body.firstName,
            username: req.body.username,
            password: Bcrypt.hashSync(req.body.password, 10),
            isActive: req.body.isActive,
            isAdmin: req.body.isAdmin
        })
       await user.save();
    } catch (error) {
        return res.status(400).send({ message: error }); 
    }
    return res.send(user); 
}

async function authentificate(req, res, next){

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(403).json({ message: AuthErrorMessage });
    }
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':')

    let user = await User.findOne({ username: username }).exec();
    if (!user){
        return res.status(403).json({ message: AuthErrorMessage });
    }
    if (!Bcrypt.compareSync(password, user.password)){
       return res.status(403).json({ message: AuthErrorMessage });
    }
    res.locals.user = user
   next();
}

async function UserIsAdmin(user,res){
    if (!user.isAdmin){
        return res.status(403).send({ message: AuthErrorMessage });
    }
    return;
}

module.exports.getUserByName = getUserByName;
module.exports.getAllUsers = getAllUsers;
module.exports.createUser = createUser;
module.exports.authentificate = authentificate;
module.exports.UserIsAdmin = UserIsAdmin;