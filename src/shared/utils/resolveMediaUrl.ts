const BASE_MEDIA_URL = '/s3/isotopes'

export const resolveMediaUrl = (path: string) => {
    return `${BASE_MEDIA_URL}/${path}`;
}
