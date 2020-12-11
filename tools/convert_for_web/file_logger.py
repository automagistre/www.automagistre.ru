import logging
from os import path


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filemode='w',
    filename=path.join(path.dirname(path.abspath(__file__)), 'converter.log')
)

response_logger = logging.getLogger('response')
