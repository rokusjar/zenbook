import type {NextApiRequest, NextApiResponse} from 'next'
import PrismaService from "./PrismaService";
import ProfileService from "./services/ProfileService";
import HttpRequestType from "./model/HttpRequestType";

export type Data = {
    data: any;
}

export type Error = {
    message: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | Error>
) {

    async function main() {
        switch (req.method) {
            case HttpRequestType.GET:
                const allProfiles = await PrismaService.profile.findMany()
                res.status(200).json({data: allProfiles})
                break;
            case HttpRequestType.POST:
                const newProfile = await ProfileService.Instance().createProfile(req.body);
                res.status(200).json({data: newProfile})
                break;
            case HttpRequestType.PUT:
                const updatedProfile = await ProfileService.Instance().updateProfile(req.body);
                res.status(200).json({data: updatedProfile});
                break;
            case HttpRequestType.DELETE:
                const deletedProfile = await ProfileService.Instance().deleteProfile(req.body);
                res.status(200).json({data: deletedProfile});
                break;
            default:
                res.status(405).json({message: `Unsupported request type: ${req.method} on /profiles encountered.`});
        }
    }

    main()
        .catch((e) => {
            res.status(500).json({message: `Internal server error: ${e}`});
        })
        .finally(async () => {
            await PrismaService.$disconnect()
        })
}
