const homePage = (req, res) => {
    res.render('home');
};

const aboutPage = (req, res) => {
    res.render('about');
};

const contactPage = (req, res) => {
    res.render('contact');
};

module.exports = { homePage, aboutPage, contactPage };