const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringToArray = require('../utils/parseStringToArray');

module.exports = {

    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs)
    }, 

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = response.data
            //name = login --> se o NAME NÃO EXISTIR TROQUE PARA LOGIN 

            console.log(name, avatar_url, bio)

            let techsArray = parseStringToArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude] //NO MONGOOSE É LONGITUDE PRIMEIRO ;
            }

                dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            })
        }else{
            return res.json({status: "usuario ja existe"})
        }

        return res.json(dev)
    },

    async update(req, res){
        const dev = await Dev.findById(req.params.id)


        const { newName = dev.name, newBio = dev.bio } = req.body;

        await Dev.updateOne({
            name: newName,
            bio: newBio,
        })


        return res.json({message: "updated:)"})
    },

    async destroy(req, res){
        const dev = await Dev.findById(req.params.id)

        if(!dev) {
            return res.json({message: "usuario n existe"})
        }

        await Dev.deleteOne(dev);

        return res.json({deleted: true})
    }
}