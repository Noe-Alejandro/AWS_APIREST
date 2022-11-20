const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {
    const data = {
        "name": "Noe",
        "website": "noe.com"
    };
    res.send(data);
});

module.exports = router;