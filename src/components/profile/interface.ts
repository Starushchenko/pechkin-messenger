export interface IProfile {
  id?: number
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  phone?: string;
  avatar?: string | null;
}

export default IProfile;
