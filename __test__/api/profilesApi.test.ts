import {prismaMock} from "../../pages/api/prismaServiceMockConfig";
import dayjs, {Dayjs} from "dayjs";
import ProfileService from "../../pages/api/services/ProfileService";
import ApiErrors from "../../pages/api/utils/ApiErrors";

it('READ - should get all profiles', async () => {
    const createdAt: Dayjs = dayjs();

    const profilesMock = [{
        id: 1,
        title: 'Profile1',
        createdAt: createdAt.toDate(),
    }, {
        id: 2,
        title: 'Profile2',
        createdAt: createdAt.add(1, 'hour').toDate(),
    }]

    prismaMock.profile.findMany.mockResolvedValue(profilesMock)

    await expect(ProfileService.Instance().getAllProfiles())
        .resolves
        .toEqual(profilesMock)
})

it('CREATE - should create profile', async () => {
    const createdAt: Date = dayjs().toDate();

    const profileMock = {
        id: 1,
        title: 'Profile1',
        createdAt: createdAt,
    }

    prismaMock.profile.create.mockResolvedValue(profileMock)

    await expect(ProfileService.Instance().createProfile({title: 'Profile1'}))
        .resolves
        .toEqual(profileMock)
})

it('CREATE - should throw error when title is missing', async () => {
    const createdAt: Date = dayjs().toDate();

    const profileMock = {
        id: 1,
        title: 'Profile1',
        createdAt: createdAt,
    }

    prismaMock.profile.create.mockResolvedValue(profileMock)

    await expect(ProfileService.Instance().createProfile({}))
        .rejects
        .toThrowError(ApiErrors.MISSING_ATTRIBUTE('title'))
})

it('CREATE - should throw error when title is not a string', async () => {
    const createdAt: Date = dayjs().toDate();

    const profileMock = {
        id: 1,
        title: 'Profile1',
        createdAt: createdAt,
    }

    prismaMock.profile.create.mockResolvedValue(profileMock)

    await expect(ProfileService.Instance().createProfile({title: 3}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('title', typeof 3));

    await expect(ProfileService.Instance().createProfile({title: true}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('title', typeof true));

    await expect(ProfileService.Instance().createProfile({title: {}}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('title', typeof {}));

    await expect(ProfileService.Instance().createProfile({title: []}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('title', typeof []));
})

it('UPDATE - should update profile title', async () => {
    const createdAt: Date = dayjs().toDate();

    const profilesBeforeUpdateMock = [{
        id: 1,
        title: 'Profile1',
        createdAt: createdAt,
    }];

    const updatedProfile = {
        id: 1,
        title: 'Profile2',
        createdAt: createdAt,
    };

    const profilesAfterUpdateMock = [{
        id: 1,
        title: 'Profile2',
        createdAt: createdAt,
    }];

    prismaMock.profile.findMany.mockResolvedValue(profilesBeforeUpdateMock);
    prismaMock.profile.update.mockResolvedValue(updatedProfile);

    await expect(ProfileService.Instance().getAllProfiles())
        .resolves
        .toEqual(profilesBeforeUpdateMock)

    await expect(ProfileService.Instance().updateProfile({id: 1, title: 'Profile2'}))
        .resolves
        .toEqual(updatedProfile)

    prismaMock.profile.findMany.mockResolvedValue(profilesAfterUpdateMock)

    await expect(ProfileService.Instance().getAllProfiles())
        .resolves
        .toEqual(profilesAfterUpdateMock)
})

it('UPDATE - should throw error if id is missing', async () => {
    const updatedProfile = {
        id: 1,
        title: 'Profile1',
        createdAt: dayjs().toDate(),
    }

    prismaMock.profile.update.mockResolvedValue(updatedProfile)

    await expect(ProfileService.Instance().updateProfile({}))
        .rejects
        .toThrowError(ApiErrors.MISSING_ATTRIBUTE('id'));

    await expect(ProfileService.Instance().updateProfile({title: 'Profile2'}))
        .rejects
        .toThrowError(ApiErrors.MISSING_ATTRIBUTE('id'));
})

it('UPDATE - should throw error if title is missing', async () => {
    const updatedProfile = {
        id: 1,
        title: 'Profile1',
        createdAt: dayjs().toDate(),
    }

    prismaMock.profile.update.mockResolvedValue(updatedProfile)

    await expect(ProfileService.Instance().updateProfile({}))
        .rejects
        .toThrowError(ApiErrors.MISSING_ATTRIBUTE('id'));

    await expect(ProfileService.Instance().updateProfile({id: 1}))
        .rejects
        .toThrowError(ApiErrors.MISSING_ATTRIBUTE('title'));
})

it('UPDATE - should throw error if title is not a string', async () => {
    const updatedProfile = {
        id: 1,
        title: 'Profile1',
        createdAt: dayjs().toDate(),
    }

    prismaMock.profile.update.mockResolvedValue(updatedProfile)

    await expect(ProfileService.Instance().updateProfile({id: 1, title: true}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('title', typeof true));

    await expect(ProfileService.Instance().updateProfile({id: 1, title: 1}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('title', typeof 1));

    await expect(ProfileService.Instance().updateProfile({id: 1, title: {}}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('title', typeof {}));

    await expect(ProfileService.Instance().updateProfile({id: 1, title: []}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('title', typeof []));
})

it('UPDATE - should throw error if id is not a number', async () => {
    const updatedProfile = {
        id: 1,
        title: 'Profile1',
        createdAt: dayjs().toDate(),
    }

    prismaMock.profile.update.mockResolvedValue(updatedProfile)

    await expect(ProfileService.Instance().updateProfile({id: '1', title: 'Profile2'}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('id', typeof '1'));

    await expect(ProfileService.Instance().updateProfile({id: true, title: 'Profile2'}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('id', typeof true));

    await expect(ProfileService.Instance().updateProfile({id: {}, title: 'Profile2'}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('id', typeof {}));

    await expect(ProfileService.Instance().updateProfile({id: [], title: 'Profile2'}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('id', typeof []));
})

it('DELETE - should delete profile', async () => {
    const createdAt: Date = dayjs().toDate();

    const profilesBeforeDeleteMock = [
        {
            id: 1,
            title: 'Profile1',
            createdAt: createdAt,
        },
        {
            id: 2,
            title: 'Profile2',
            createdAt: createdAt,
        }
    ];

    const deletedProfile = {
        id: 1,
        title: 'Profile1',
        createdAt: createdAt,
    }

    const profilesAfterDeleteMock = [{
        id: 1,
        title: 'Profile1',
        createdAt: createdAt,
    }]

    prismaMock.profile.findMany.mockResolvedValue(profilesBeforeDeleteMock);
    prismaMock.profile.delete.mockResolvedValue(deletedProfile);

    await expect(ProfileService.Instance().getAllProfiles())
        .resolves
        .toEqual(profilesBeforeDeleteMock)

    await expect(ProfileService.Instance().deleteProfile({id: 2}))
        .resolves
        .toEqual(deletedProfile)

    prismaMock.profile.findMany.mockResolvedValue(profilesAfterDeleteMock)

    await expect(ProfileService.Instance().getAllProfiles())
        .resolves
        .toEqual(profilesAfterDeleteMock)
})

it('DELETE - should throw error if id is missing', async () => {
    const deletedProfile = {
        id: 1,
        title: 'Profile1',
        createdAt: dayjs().toDate(),
    }

    prismaMock.profile.delete.mockResolvedValue(deletedProfile)

    await expect(ProfileService.Instance().deleteProfile({}))
        .rejects
        .toThrowError(ApiErrors.MISSING_ATTRIBUTE('id'));
})

it('DELETE - should throw error if id is not a number', async () => {
    const deletedProfile = {
        id: 1,
        title: 'Profile1',
        createdAt: dayjs().toDate(),
    }

    prismaMock.profile.delete.mockResolvedValue(deletedProfile)

    await expect(ProfileService.Instance().deleteProfile({id: '1'}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('id', typeof '1'));

    await expect(ProfileService.Instance().deleteProfile({id: true}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('id', typeof true));

    await expect(ProfileService.Instance().deleteProfile({id: {}}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('id', typeof {}));

    await expect(ProfileService.Instance().deleteProfile({id: []}))
        .rejects
        .toThrowError(ApiErrors.TYPE_ERROR('id', typeof []));
})