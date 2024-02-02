export interface User
{
  userId: string;
  firstName: string | null;
  lastName: string | null;
  emailAddress: string;
  password: string;
  addedDate: Date | null;
  lastUpdatedDate: Date | null;
}
