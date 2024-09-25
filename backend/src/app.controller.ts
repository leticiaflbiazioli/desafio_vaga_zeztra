import {
  Controller,
  Get,
  HttpCode,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService, IListResponse } from './app.service';
import { getExecutionTime } from './utils/getExecutionTime';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'text/plain' })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    try {
      const parseStartTime = Date.now();
      const parsedData = this.appService.parseData(file.buffer.toString());
      getExecutionTime(parseStartTime, 'processamento do arquivo');

      const processStartTime = Date.now();
      this.appService.processData(parsedData);
      getExecutionTime(processStartTime, 'inserção de dados no banco');

      getExecutionTime(parseStartTime, 'manipulação total de dados');
      return;
    } catch (error) {
      console.error('Failure to handle sent data', error);
    }
  }

  @Get('list')
  async listData(
    @Query('page') page: string,
    @Query('itemsPerPage') itemsPerPage: string,
    @Query('filter') filter: string,
  ): Promise<IListResponse> {
    const { data, pagination } = await this.appService.listData({
      page: Number(page),
      itemsPerPage: Number(itemsPerPage),
      filter,
    });
    return {
      data,
      pagination,
    };
  }
}
