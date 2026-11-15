export type IsotopeDTO = {
    id: number;
    name: string;
    description: string | null;
    imageUrl: string | null;
    videoUrl: string | null;
    halfLife: string | null;
    isAlpha: boolean | null;

    likeCount: number;
    isLiked: boolean;
    isAuthor: boolean;
}

export type CreateDraftDTO = {
    name: string;
    video?: File;
    image?: File
}
