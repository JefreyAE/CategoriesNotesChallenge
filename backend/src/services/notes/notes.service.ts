import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/models/category/category.entity';
import { NoteEntity } from 'src/models/note/note.entity';
import { UserEntity } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private noteRepository: Repository<NoteEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) { }

  async findAll(userId: any): Promise<NoteEntity[]> {
    try {
      const notes = await this.noteRepository
        .createQueryBuilder('note')
        .leftJoinAndSelect('note.category', 'category')
        .where('note.user.id = :userId', { userId })
        .getMany();

      return notes;
    } catch (error) {
      throw error;
    }
  }

  async findActive(userId: any): Promise<NoteEntity[]> {
    try {
      const notes = await this.noteRepository
        .createQueryBuilder('note')
        .leftJoinAndSelect('note.category', 'category')
        .where('note.user.id = :userId', { userId })
        .andWhere('note.is_active = :is_active', { is_active: true })
        .getMany();

      return notes;
    } catch (error) {
      throw error;
    }
  }

  async findArchived(userId: any): Promise<NoteEntity[]> {
    try {
      const notes = await this.noteRepository
        .createQueryBuilder('note')
        .leftJoinAndSelect('note.category', 'category')
        .where('note.user.id = :userId', { userId })
        .andWhere('note.is_active = :is_active', { is_active: false })
        .getMany();

      return notes;
    } catch (error) {
      throw error;
    }
  }

  async createOne(note: Partial<any>, userId: any): Promise<NoteEntity> {
    const { category_id, ...noteData } = note;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (category_id) {
      const category = await this.categoryRepository.findOne({
        where: { id: category_id },
      });

      if (category) {
        const newNote = this.noteRepository.create({
          ...noteData,
          category,
          user,
        });
        return await this.noteRepository.save(newNote);
      }
    }
    const newNote = this.noteRepository.create({
      ...noteData,
      user,
    });
    return await this.noteRepository.save(newNote);
  }

  async removeOne(id: any, userId: any): Promise<any> {
    try {
      return await this.noteRepository.delete({ id, user: { id: userId } });
    } catch (error) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateOne(
    id: string,
    note: Partial<any>,
    userId: any,
  ): Promise<NoteEntity> {
    try {
      const noteFound = await this.noteRepository.findOneOrFail({
        where: { id, user: { id: userId } },
      });
      const category_id = note.category_id;
      if (category_id) {
        const category = await this.categoryRepository.findOne({
          where: { id: category_id },
        });

        noteFound.category = category;
      }
      const updatedNote = await this.noteRepository.save({
        ...noteFound,
        ...note,
      });
      return updatedNote;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string, userId: string): Promise<NoteEntity> {
    try {
      const note = await this.noteRepository
        .createQueryBuilder('note')
        .leftJoinAndSelect('note.category', 'category')
        .where('note.id = :id', { id })
        .andWhere('note.user.id = :userId', { userId })
        .getOne();
      if (!note) throw new Error('Note not found');
      return note;
    } catch (error) {
      throw error;
    }
  }

  async findByCategory(category_id: string): Promise<NoteEntity[]> {
    try {
      const notes = await this.noteRepository
        .createQueryBuilder('note')
        .leftJoinAndSelect('note.category', 'category')
        .where('category.id = :category_id', { category_id })
        .getMany();
      if (!notes) throw new Error('Note not found');
      return notes;
    } catch (error) {
      throw error;
    }
  }
}
