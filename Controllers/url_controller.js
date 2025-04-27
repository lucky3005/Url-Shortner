const shortid = require("shortid");
const UrlModel = require("../Models/url_model");

async function homeGetRouteController(req, res) {
   return res.render("home", { shortUrl: null, error: null });  
}

async function urlPostRouteHandler(req, res) {
    const { RedirectUrl } = req.body;
    const short = shortid.generate();

    // Validate RedirectUrl format (simple validation)
    if (!RedirectUrl || !RedirectUrl.startsWith("http")) {
        return res.render("home", { shortUrl: null, error: "Invalid URL format. Please enter a valid URL starting with http or https." });
    }

    try {
        const data = await UrlModel.create({
            ShortId: short,
            RedirectUrl: RedirectUrl,
        });

        // Dynamically get base URL (protocol + host)
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        // Render the page again with the short URL
        return res.render("home", { shortUrl: `${baseUrl}/${short}`, error: null });

    } catch (error) {
        return res.render("home", { shortUrl: null, error: "Something went wrong. Please try again." });
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
