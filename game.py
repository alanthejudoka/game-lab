import random
import time
import json

ROWS       = 6
COLUMNS    = 7

PIECE_NONE = ' '
PIECE_ONE  = 'x'
PIECE_TWO  = 'o'

PIECE_COLOR_MAP = {
    PIECE_NONE : 'NONE',
    PIECE_ONE  : 'YELLOW',
    PIECE_TWO  : 'RED',
}

DIRECTIONS = (
    (-1, -1), (-1, 0), (-1, 1),
    ( 0, -1),          ( 0, 1),
    ( 1, -1), ( 1, 0), ( 1, 1),
)



# Board Functions

def create_board(rows=ROWS, columns=COLUMNS):
    ''' Creates empty Connect 4 board '''
    board = []

    for row in range(rows):
        board_row = []
        for column in range(columns):
            board_row.append(PIECE_NONE)
        board.append(board_row)

    return board

def print_board(board):
    ''' Prints Connect 4 board '''
    res = []
    for row in board:
        print('|' + '|'.join(row) + '|')

def drop_piece(board, column, piece):
    ''' Attempts to drop specified piece into the board at the
    specified column. If this succeeds, return True, otherwise return False.
    '''

    for row in reversed(board):
        if row[column] == PIECE_NONE:
            row[column] = piece
            return True

    return False

def find_winner(board, length=4):
    ''' Return if the board has a winner '''

