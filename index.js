require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

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
            to: "devplay@yopmail.com",
            from: 'xyz@gmail.com', // give valid email
            subject: 'We have got your order, you will receive it soon',
            text: `Hey "anil sarum", we have received your order "2118". We will ship it soon`,
        });
        res.status(200).send({ message: "Order confirmation email sent successfully for orderNr: 2118" });
    } catch (error) {
        const message = `Error sending order confirmation email or orderNr: 2118`;
        console.log(message);
        console.log(error);
        if (error.response) {
            console.log(error.response.body)
        }
        res.status(500).send({ message: message });
    }
});


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
