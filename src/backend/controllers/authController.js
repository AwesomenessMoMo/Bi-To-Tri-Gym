const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }

    db.query("SELECT id FROM users WHERE LOWER(email) = ?", [email.toLowerCase()], (err, result) => {
        if (err) {
            console.error("Register database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length > 0) {
            return res.status(409).json({ message: "Email already exists" });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error("Password hash error:", err);
                return res.status(500).json({ message: "Registration failed" });
            }

            db.query(
                "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')",
                [name, email, hash],
                (err, result) => {
                    if (err) {
                        console.error("User insert error:", err);
                        return res.status(500).json({ message: "Registration failed" });
                    }

                    const token = jwt.sign({ id: result.insertId }, "SECRET123", { expiresIn: "1d" });

                    res.json({
                        user: {
                            id: result.insertId,
                            name: name,
                            email: email,
                            role: 'user'
                        },
                        token
                    });
                }
            );
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    db.query("SELECT * FROM users WHERE LOWER(email) = ?", [email.toLowerCase()], (err, result) => {
        if (err) {
            console.error("Login database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Wrong credentials" });
        }

        const user = result[0];

        const isBcryptHash = user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$'));

        if (isBcryptHash) {
            bcrypt.compare(password, user.password, (err, match) => {
                if (err || !match) {
                    return res.status(401).json({ message: "Wrong credentials" });
                }

                const token = jwt.sign({ id: user.id }, "SECRET123", { expiresIn: "1d" });

                res.json({
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role || 'user'
                    },
                    token
                });
            });
        } else {
            if (user.password !== password) {
                return res.status(401).json({ message: "Wrong credentials" });
            }

            const token = jwt.sign({ id: user.id }, "SECRET123", { expiresIn: "1d" });

            res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role || 'user'
                },
                token
            });
        }
    });
};
