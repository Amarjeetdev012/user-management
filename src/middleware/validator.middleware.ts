import bcrypt from 'bcrypt';


export const verifyPass = async (password: string, hash: string): Promise<boolean> => {
    const data = await bcrypt.compare(password, hash);
    return data;
};
