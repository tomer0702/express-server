import{ Router } from 'express';
import userControler from './controller';
import validationHandler from '../../libs/validationHandler';
 import config from './Validation';
import authmiddleware from '../../libs/routes/authmiddleware';
console.log(authmiddleware);
const userRouter = Router();
userRouter.route('/')
.get(authmiddleware('getUser', 'read'), validationHandler ( config.get ) , userControler.get)
.post(authmiddleware('getUser', 'write'), validationHandler ( config.create) , userControler.create)
.put(authmiddleware('getUser', ' write'), validationHandler ( config.update) ,  userControler.update)
userRouter.route('/:id').delete(authmiddleware('getUser', 'delete'), validationHandler ( config.delete) , userControler.delete);
/**
 * @swagger
 *
 *  definitions:
 *      me:
 *        type: object
 *        properties:
 *          message:
 *              type: string
 *              example: Me
 *          status:
 *              type: string
 *              example: OK
 *          data:
 *              iss: Online JWT Builder
 *              iat: 1605048360
 *              exp: 1636584360
 *              name: skldjf
 *              email: skldjf@successive.tech
 *              role: trainee
 *      Login:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *              example: trainee@successive.tech
 *          password:
 *              type: string
 *              example: training@123
 *      Token:
 *           type: object
 *           properties:
 *               status:
 *                   example: Ok
 *               message:
 *                   example: Success
 *               data:
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5laGEuZ29lbEBzdWNjZXNzaXZlLnRlY2giLCJpZCI6IjVlNGEzNmJjNjQ4MjRiMWY4MGI3MzBjZCIsImlhdCI6MTU4MjU0OTIyN30.cFV6YYlfmhJ1yL3GyIIgb-PjMTpDNVICd5KGi1ENpVI
 */


/**
 * @swagger
 *
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     description: Login Credentials!
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User email and password
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *             $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *              $ref: '#/definitions/Token'
 *       422:
 *         description: invalid email or password
 *         schema:
 *          oneOf:
 *          properties:
 *              status:
 *                  example: "200"
 *              message:
 *                  example: Password does not match
 *              err:
 *                  example: Password is incorrect
 */

userRouter.route('/login')
    .post(validationHandler(config.login), userControler.login);
/**
 * @swagger
 *
 * /api/user/me:
 *   get:
 *     tags:
 *       - User
 *     description: Current user Details.
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: skip
 *         description: Number of elements to skip
 *         in: query
 *         required: false
 *         type: number
 *       - name: limit
 *         description: number of elements to show
 *         in: query
 *         required: false
 *         type: number
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *             $ref: '#/definitions/me'
 */

userRouter.route('/me')
    .get(authmiddleware('getUser', 'read'), userControler.me);
    
export default userRouter;
