export interface ProfileAvatarProps {
  userId: string;
  first_name: string | null;
  avatar: string | null;
  onUpdate: () => void;
}
