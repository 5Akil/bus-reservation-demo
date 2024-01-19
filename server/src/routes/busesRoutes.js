const express = require('express')
const busController = require('../controller/busController')

const router = express.Router()

router.get('/', busController.getBus)
router.get('/:id/seats', busController.getSeats)
router.post('/:id/reserve_seat', busController.reserveSeats)


module.exports = router;
