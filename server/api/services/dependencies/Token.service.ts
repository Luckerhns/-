import { sign, verify } from "jsonwebtoken";
import Token from "../../models/Token";

class TokenService {
    generateTokens(payload) {
        const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "24h",
        });

        const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "24h",
        });

        return {
            accessToken, 
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = verify(token, process.env.JWT_ACCESS_SECRET);
            return userData
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = verify(token, process.env.JWT_REFRESH_SECRET)
            return userData 
        } catch (error) {
            return null
        }
    }

    async saveToken(id, refreshToken) {
        const tokenData = await Token.findOne({where: {id}})

        if(tokenData) {
            tokenData.update({refreshToken: refreshToken})
            return tokenData
        }
        
        const token = await Token.create({id: id, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        try {
            
            const tokenData = await Token.destroy({where: {refreshToken}})
            return tokenData
        } catch (error) {
            return null   
        }
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({where: {refreshToken}})
        return tokenData
    }
}

export default new TokenService()