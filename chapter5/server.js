import express from 'express';

const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle POST request for email validation
app.post('/email', (req, res) => {
    const submittedEmail = req.body.email;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(submittedEmail)) {
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    hx-post="/email"
                    value="${submittedEmail}"
                >
                <div class="alert alert-success" role="alert">
                    That email is valid
                </div>
            </div>
        `);
    } else {
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control is-invalid"
                    name="email"
                    hx-post="/email"
                >
                <div class="alert alert-danger" role="alert">
                    Invalid email address. Please try again.
                </div>
            </div>
        `);
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
