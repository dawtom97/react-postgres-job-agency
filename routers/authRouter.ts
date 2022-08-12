import express, { Request, Response } from 'express';
import db from '../db/index';
import bcrypt from 'bcrypt';


const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const userLogin = await db.query("SELECT * from users where username=$1", [username]);

    if (userLogin.rowCount > 0) {
        const isSamePass = await bcrypt.compare(password, userLogin.rows[0].passhash);
        if (isSamePass) {
            //login
            req.session.user = {
                username,
                id: userLogin.rows[0].id
            }
            res.json({
                loggedIn: true,
                username
            })
        }
        else {
            res.json({
                loggedIn: false,
                status: "Wrong username or password"
            })
        }
    }
    else {
        console.log("Not good")
        res.json({
            loggedIn: false,
            status: "Wrong username or password"
        })
    }

})


router.post('/signup', async (req: Request, res: Response) => {
    console.log(req.body, "CO JEST")
    try {
        const { username, password, email, firstname, lastname } = req.body;
        const userExist = await db.query('SELECT username from users WHERE username = $1', [username]);
      
        if (userExist.rowCount === 0) {
            //register
            const hashedPass = await bcrypt.hash(password, 10);
            const newUserQuery = await db.query('INSERT INTO users(username,passhash,email,firstname,lastname) VALUES ($1,$2,$3,$4,$5) returning username', [username, hashedPass, email, firstname, lastname]);
            req.session.user = {
                username,
                id: newUserQuery.rows[0].id
            }
            res.json({
                loggedIn: true,
                status: "success",
                username
            })
        }
        else {
            res.json({
                loggedIn: false,
                status: "taken"
            })
        }
    } catch (err) {
      console.log(err)
    }

})

export default router;
