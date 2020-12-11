from convert_for_web.parser import args_parser
from convert_for_web.converter import Converter


if __name__ == '__main__':

    args = args_parser()
    if args:
        converter = Converter(args.path, args.extensions)
        converter.start()
    else:
        print('No args exit')
