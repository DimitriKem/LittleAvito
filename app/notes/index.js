const { Router } = require('express');

const controller = require('./controller');

const router = Router();

router.param('id', controller.findOne);

router.get('/', controller.showIndex);


router.route('/create')
    .get(controller.showCreate)
    .post( controller.create);

    
router.get('/:id', controller.showView);

router.route('/:id/update')
    .get(controller.showUpdate)
    .post( controller.update);

router.route('/:id/delete')
    .get(controller.showDelete)
    .post( controller.delete);    

module.exports = router;