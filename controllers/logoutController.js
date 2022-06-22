// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data}
// }

// const fsPromises = require('fs').promises
// const path = require('path')
const User = require('../model/User');

const handleLogout = async (req, res) => {
    //On client also delete accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no content
    const refreshToken = cookies.jwt;
    //is refresh token in db?
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser){ 
        res.clearCookie('jwt', { httpOnly: true, sameSite: true, secure: true})
        return res.sendStatus(204);} 
    
    //delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    res.clearCookie('jwt', {httpOnly: true, sameSite: true, secure: true})// secure:true on production https
    res.status(204);
       
}

module.exports = {handleLogout};