import bcrypt from 'bcrypt';

export const verifyPass = async (password:string, hash:string) => {
    const data = await bcrypt.compare(password, hash);
    return data;
};

