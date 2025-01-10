let users = [];

exports.getUsers = (req, res) => {
    res.json(users);
};

exports.createUser = (req, res) => {
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        username: req.body.username,
        password: req.body.password
    };
    users.push(newUser);
    res.json(newUser);
};

