#!/usr/bin/env python3

import datetime

# 1
def merge( name:str, age:int ):
    age = str( datetime.date.today().year - age )
    print( name, age )


# 2
def shortname( firstname:str, lastname:str ):
    Fname = firstname.capitalize()
    Lname = lastname.capitalize()
    print(f"{ Fname[0:1] }. { Lname }")
    print(f"{ Fname } { Lname[0:1] }.")
    print(f"{ Fname[0:1] }. { Lname[0:1] }.")


#3
def calculator( x:int, y:int, z:int ):
    cal = ( x ** y ) + ( y ** z ) - ( z / x )
    print( "%.2f" % cal )

# 4
def pathfinder( route1, dist1_1, dist1_2, route2, dist2_1, dist2_2, route3, dist3_1, dist3_2 ):
    city = [
        { 'c': route1,'m': dist1_1 + dist1_2 },
        { 'c': route2, 'm': dist2_1 + dist2_2 },
        { 'c': route3, 'm': dist3_1 + dist3_2 }
    ]
    for obj in sorted(city, key=lambda x: x['m'])[:2]:
        print( obj['c'], obj['m'] )

# 5
def betweenthem( n:int, m:int ):
    if 0 < n < 99 and 0 < m < 99:
        bet = list( range( n + 1 if n < m else m + 1, m if n < m else n ) )
        val = " ".join( map( str, bet ) )
        print( len(bet), val )

# 6
def triangle(n: int):
    if n % 2 == 0:
        for i in range(1, n + 1):
            print('*' * i)
    else:
        for i in range(n, 0, -1):
            print('*' * i)

# 7
def searcher(input_pattern):
    count = 0
    with open('problem7.txt', 'r') as file:
        for line in file:
            line = line.strip()
            if input_pattern in line:
                count += 1
    print( count )

# 8
def wishlist(index):
    result = []
    with open('problem8.txt', 'r') as file:
        for line in file:
            line = line.strip()
            result.append(line)
    if index < len(result):
        print( result[index] )
    else:
        print( None )

# 9
class Person:
    
    def __init__( self, name:str, yearofbirth:int ):
        self.name = name
        self.age = datetime.date.today().year - yearofbirth
    def getAge( self ):
        print( self.age )
