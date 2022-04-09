import PrismaService from '../PrismaService';
import dayjs from 'dayjs';
import ProfileDto from '../dto/ProfileDto';
import Validators from '../utils/Validators';
import ApiErrors from '../utils/ApiErrors';

export default class ProfileService {

    private static instance: ProfileService | null = null;

    private constructor() {
        // This is a singleton class
    }

    public static Instance(): ProfileService {
        if (ProfileService.instance === null) {
            ProfileService.instance = new ProfileService();
        }
        return ProfileService.instance;
    }

    public async getAllProfiles(): Promise<Array<ProfileDto>> {
        const allProfiles = await PrismaService.profile.findMany();
        return allProfiles as ProfileDto[];
    }

    public async createProfile(data: any): Promise<ProfileDto> {
        Validators.hasAttribute(data, 'title', ApiErrors.MISSING_ATTRIBUTE('title'));
        Validators.isString(data.title, ApiErrors.TYPE_ERROR('title', typeof data.title));

        const newProfile = await PrismaService.profile.create({
            data: {
                createdAt: dayjs().toDate(),
                title: data.title,
            }
        })

        return {...newProfile} as ProfileDto
    }

    public async updateProfile(data: any): Promise<ProfileDto> {
        Validators.hasAttribute(data, 'id', ApiErrors.MISSING_ATTRIBUTE('id'));
        Validators.hasAttribute(data, 'title', ApiErrors.MISSING_ATTRIBUTE('title'));
        Validators.isString(data.title, ApiErrors.TYPE_ERROR('title', typeof data.title));
        Validators.isNumber(data.id, ApiErrors.TYPE_ERROR('id', typeof data.id));

        const updatedProfile = await PrismaService.profile.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
            },
        })

        return {...updatedProfile} as ProfileDto;
    }

    public async deleteProfile(data: any): Promise<ProfileDto> {
        Validators.hasAttribute(data, 'id', ApiErrors.MISSING_ATTRIBUTE('id'));
        Validators.isNumber(data.id, ApiErrors.TYPE_ERROR('id', typeof data.id));

        const deletedProfile = await PrismaService.profile.delete({
            where: {
                id: data.id,
            },
        })

        return {...deletedProfile} as ProfileDto;
    }
}