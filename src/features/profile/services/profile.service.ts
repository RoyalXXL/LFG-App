export interface ProfilePreview {
  username: string;
  bio: string;
  favoriteGames: string[];
}

export class ProfileService {
  summarize(profile: ProfilePreview) {
    return `${profile.username} • ${profile.favoriteGames.length} favorite games`;
  }
}