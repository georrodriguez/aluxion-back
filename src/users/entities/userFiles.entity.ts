import { User } from './user.entity';
import { File } from '../../files/entities/file.entity';

export class UserFiles {
  user: User;
  Files: File[];
}
