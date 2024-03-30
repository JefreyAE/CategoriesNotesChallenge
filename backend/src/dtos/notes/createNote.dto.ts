import { CategoryEntity } from '../../models/category/category.entity';

export class CreateNoteDto {
  title: string;
  is_active: boolean;
  content: string;
  user_id?: string;
  category?: CategoryEntity;
}
