import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Delete,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateNoteDto } from 'src/dtos/notes/createNote.dto';
import { UpdateNoteDto } from 'src/dtos/notes/updateNote.dto';
import { DeleteNoteDto } from 'src/dtos/notes/deleteNote.dto';
import { CreateNoteResponse } from 'src/responses/notes/createNote.response';
import { FindAllNotesResponse } from 'src/responses/notes/findAllNotes.response';
import { UpdateNoteResponse } from 'src/responses/notes/updateNote.response';

import { NotesService } from 'src/services/notes/notes.service';
import { FindOneNoteResponse } from 'src/responses/notes/findOneNote.response';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {
    this.notesService = notesService;
  }

  @Get('/')
  healthCheck(): string {
    return 'ok';
  }

  @Post('create')
  @UseGuards(AuthGuard)
  async createOne(
    @Body() body: CreateNoteDto,
    @Req() req,
  ): Promise<CreateNoteResponse> {
    try {
      const userId = req.user.sub;
      return await this.notesService.createOne(body, userId);
    } catch (error) {
      console.error('Error creating the note:', error);
      throw new HttpException(
        'Error creating the note',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('listByCategory/:id')
  @UseGuards(AuthGuard)
  async findByCategory(
    @Param('id') id: string,
  ): Promise<FindAllNotesResponse[]> {
    try {
      return await this.notesService.findByCategory(id);
    } catch (error) {
      throw new HttpException('Error note not found', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('listAll')
  @UseGuards(AuthGuard)
  async findAll(@Req() req): Promise<FindAllNotesResponse[]> {
    const userId = req.user.sub;
    return await this.notesService.findAll(userId);
  }

  @Get('listActive')
  @UseGuards(AuthGuard)
  async findActive(@Req() req): Promise<FindAllNotesResponse[]> {
    const userId = req.user.sub;
    return await this.notesService.findActive(userId);
  }

  @Get('listArchived')
  @UseGuards(AuthGuard)
  async findArchived(@Req() req): Promise<FindAllNotesResponse[]> {
    const userId = req.user.sub;
    return await this.notesService.findArchived(userId);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  async removeOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req,
  ): Promise<DeleteNoteDto> {
    try {
      const userId = req.user.sub;
      return await this.notesService.removeOne(id, userId);
    } catch (error) {
      throw new HttpException(
        'Error deleting the note',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update/:id')
  @UseGuards(AuthGuard)
  async updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() note: Partial<UpdateNoteDto>,
    @Req() req,
  ): Promise<UpdateNoteResponse> {
    try {
      const userId = req.user.sub;
      return await this.notesService.updateOne(id, note, userId);
    } catch (error) {
      throw new HttpException(
        'Error updating the note',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('note/:id')
  @UseGuards(AuthGuard)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req,
  ): Promise<FindOneNoteResponse> {
    try {
      const userId: string = req.user.sub;
      return await this.notesService.findOne(id, userId);
    } catch (error) {
      throw new HttpException('Error note not found', HttpStatus.BAD_REQUEST);
    }
  }
}
