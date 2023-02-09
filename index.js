require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const nodemailer = require("nodemailer");
const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY2);


const connection = require("./db");

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const sendEmail = require("./utils/sendEmail");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/sendgrid/sendmail", async (req, res) => {
    try {
        await sendGridMail.send({
            to: "ssheik.colan@gmail.com",
            from: 'prasanna.colan@gmail.com', // give valid email
            subject: 'We have got your order, you will receive it soon',
            text: "Hey anil sarum, we have received your order 2118. We will ship it soon",
        });
        res.status(200).send({ message: "Email sent" });
    } catch (error) {
        const message = `Error sending order confirmation email or orderNr: 2118`;
        console.log(message);
        console.log(error);
        if (error.response) {
            console.log(error.response.body)
        }
        res.status(500).send({ message: "Email not send!", error });
    }
});

app.get("/nodemailer/sendmail", async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },
        });
        console.log("createTransport done")
        try {
            await transporter.sendMail({
                from: process.env.USER,
                to: "devplay@yopmail.com",
                subject: 'We have got your order, you will receive it soon',
                text: "Hey anil sarum, we have received your order 2118. We will ship it soon",
            });
            res.status(200).send({ message: "Email sent" });
            console.log("email sent successfully");
        }
        catch (error) {
            console.log("email not sent!");
            console.log("error: ", error);
            res.status(500).send({ message: "Email not send!", error });
        }
    } catch (err) {
        console.log("createTransport Err!");
        console.log("err: ", err);
        res.status(500).send({ message: "Email not send!", error: err });
    }
});


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
