import argparse


def args_parser():
    parser = argparse.ArgumentParser(description='Converter script')
    parser.add_argument('-p', action="store", default='./', dest="path", help='Directory for found files')
    parser.add_argument('-e', action="store", default='[jpg, png, jpeg]', nargs='+', dest="extensions", help='File extensions to convert')
    return parser.parse_args()

