import os
import threading
from os import path
from convert_for_web.file_logger import response_logger


MIN_FILE_SIZE = 10000
CONVERT_FORMATS = ['webp', 'avif']


class FileWorker:

    def __init__(self, file_path, filename):
        self.done_file_formats = []
        self.path = file_path
        self.filename = filename
        self.file_size = path.getsize(path.join(file_path, filename))

    def is_for_convert(self):
        if self.file_size < MIN_FILE_SIZE:
            response_logger.debug(f'{self.filename} small for convert, skipping...')
            return False
        if path.exists(path.join(path.abspath(self.path), f'.{self.filename}.ban')):
            response_logger.debug(f'{self.filename} banned, skipping...')
            return False
        return True

    def convert(self):
        for file_format in CONVERT_FORMATS:
            if path.exists(path.join(self.path, f'{self.filename}.{file_format}')):
                response_logger.debug(f'{self.filename}.{file_format} File already converted, skipping..')
                self.done_file_formats.append(file_format)
                continue
            full_file_path = path.join(path.abspath(self.path), self.filename)
            file_convert_command = f'convert {full_file_path} {full_file_path}.{file_format}'
            res = os.system(file_convert_command)
            if res != 0:
                response_logger.error(f'Error while converting {path.join(self.path, self.filename)} to {file_format}')
            else:
                new_file_size = path.getsize(f'{full_file_path}.{file_format}')
                self.done_file_formats.append(file_format)
                response_logger.info(f'File {path.join(self.path, self.filename)} converted to {file_format}: '
                                     f'{(self.file_size - new_file_size)/1000}KB '
                                     f'{round(new_file_size / self.file_size *100, 0) }%')

    def test_result(self):
        file_sizes = [self.file_size]
        full_file_path = path.join(path.abspath(self.path), self.filename)
        for file_format in self.done_file_formats:
            try:
                file_sizes.append(path.getsize(f'{full_file_path}.{file_format}'))
            except FileNotFoundError:
                response_logger.error(f'Error while testing {path.join(self.path, self.filename)}.{file_format}')
        if min(file_sizes) == self.file_size:
            self.remove_converted_files()

    def remove_converted_files(self):
        for file_format in self.done_file_formats:
            os.remove(f'{path.join(path.abspath(self.path), self.filename)}.{file_format}')
            response_logger.info(f'Removed converted files for {path.join(self.path, self.filename)}')
        ban_file = path.abspath(path.join(self.path, f'.{self.filename}.ban'))
        with open(ban_file, 'w'):
            response_logger.info(f'Ban {path.join(self.path, self.filename)}')


class Converter:
    def __init__(self, dir_path, extensions):
        self.path = dir_path
        self.extensions = extensions

    def start(self):
        dir_walker = os.walk(self.path)
        for dir_name, _, files_name in dir_walker:
            for filename in files_name:
                file_worker = FileWorker(dir_name, filename)
                if filename.split('.')[-1] not in self.extensions or not file_worker.is_for_convert():
                    continue
                file_worker.convert()
                if len(file_worker.done_file_formats):
                    file_worker.test_result()
