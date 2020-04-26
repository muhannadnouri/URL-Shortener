const URL = require('./url.model.js')

const baseURL = process.env.BASE_URL ?? 'http://localhost:3000'

const createShortLink = async (req, res) => {
    let { originalUrl, uniqueName } = req.body
    console.log(originalUrl, uniqueName)

    try {
        let nameExists = await URL.findOne({ uniqueName })
        console.log(nameExists)

        if (nameExists) {
            return res.status(403).json({
                error: 'Unique name already exists, choose another',
                ok : false
            })
        }
        else {
            const shortUrl = baseURL + '/' + uniqueName
            const url = new URL({
                originalUrl,
                shortUrl,
                uniqueName
            })

            const saved = await url.save()

            return res.json({
                message : 'success',
                ok : true,
                shortUrl
            })
        }
    } catch (error) {
        return res.status(500).json({ok : false, error : 'Server error'})
    }
}

const openShortLink = async (req, res) => {

    const { uniqueName } = req.params;

    try {
        let url = await URL.findOne({ uniqueName });
        
        if (url) {
            return res.redirect(url.originalUrl)
        } else {
            return res.status(404).json({ error : 'not found' })
        }  
    } catch (error) {
        console.log(error);
        res.status(500).json({ error : 'server error' });
    } 
}

module.exports = {
    createShortLink,
    openShortLink
}