export default interface User {
  id: string;
  name: string;
  email: string;
  enabled: boolean;
  provider: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
