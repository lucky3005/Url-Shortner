const shortid = require("shortid");
const UrlModel = require("../models/url_model");

async function homeGetRouteController(req, res) {
   return res.render("home");  
}

async function urlPostRouteHandler(req, res) {
    const { RedirectUrl } = req.body;
    const short = shortid.generate();

    // Validate RedirectUrl format (simple validation)
    if (!RedirectUrl || !RedirectUrl.startsWith("http")) {
        return res.status(400).json({ error: "Invalid URL format" });
    }

    try {
        const data = await UrlModel.create({
            ShortId: short,
            RedirectUrl: RedirectUrl,
        });

        // Return the shortened URL
        return res.json({ shortUrl: "http://localhost:8000/" + short });

    } catch (error) {
        return res.status(500).json({ error: "Error: " + error.message });
    } 
}

async function urlGetRouteHandler(req, res) {
    const id = req.params.id;
    const url = await UrlModel.findOne({ ShortId: id });

    if (url) {
        return res.redirect(url.RedirectUrl);
    } else {
        return res.status(404).send("Url not found");
    }    
}

module.exports = { urlPostRouteHandler, urlGetRouteHandler, homeGetRouteController };
