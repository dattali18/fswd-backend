const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
}

// Example usage
hashPassword('1234');