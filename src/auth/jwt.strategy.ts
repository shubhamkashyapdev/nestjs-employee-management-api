import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreException: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
            logging: true,
        })
    }

    async validate(payload: any) { //payload = decoded JWT
        return { userId: payload.sub, username: payload.username }
    }
}